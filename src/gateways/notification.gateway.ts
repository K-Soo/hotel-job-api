import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import * as cookie from 'cookie';
import { AuthService } from '../authentication/auth/auth.service';
import { ResponseStatus } from '../common/constants/responseStatus';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../modules/notifications/entities/notification.entity';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';

@WebSocketGateway({
  namespace: 'notification',
  cors: {
    origin: ['http://localhost:3000', 'https://dev.hotel-job-connect.com', 'https://www.hotel-job-connect.com'],
    credentials: true,
  },
})
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, string>();

  private readonly logger = new Logger(NotificationGateway.name);

  constructor(
    @InjectRepository(Notification) private readonly notificationRepo: Repository<Notification>,
    private readonly authService: AuthService,
  ) {}

  afterInit() {
    this.server.on('connection', () => {
      this.logger.log(`websocket server connected`);
    });
  }

  handleConnection(client: Socket) {
    const cookies = client.handshake.headers.cookie ? cookie.parse(client.handshake.headers.cookie) : {};
    const refreshToken = cookies['refresh_token'];

    if (!refreshToken) {
      this.logger.error(`Socket: ${client.id} is not authenticated`);

      client.disconnect();
      return;
    }

    try {
      const verifyToken = this.authService.refreshTokenVerify(refreshToken);

      const userId = verifyToken.sub;

      this.userSockets.set(userId, client.id);

      this.logger.log(`Connected: User ${userId} (socket: ${client.id})`);

      this.logger.debug('현재 소켓 유저 목록', ...this.userSockets.entries());

      // 읽지 않은 알림 여부 보내기
      this.checkUnreadNotifications(userId);
    } catch (error) {
      console.error('Socket: invalid token', error.message);

      client.disconnect();
      return;
    }
  }

  handleDisconnect(client: Socket) {
    const userId = this.getUserIdBySocketId(client.id);

    if (userId) {
      this.userSockets.delete(userId);
      console.log(`Disconnected: User ${userId} (socket: ${client.id})`);
    }
  }

  /*
   * 특정 유저에게 알림 전송
   */
  sendNotificationToUser(userId: string, message: any) {
    const socketId = this.userSockets.get(userId);

    if (socketId) {
      this.server.to(socketId).emit('newNotification', message);
      this.logger.log(`인앱 알림(소켓) 전송 아이디: ${userId}`);

      // 읽지 않은 알림 여부 전송
      this.checkUnreadNotifications(userId);
    } else {
      this.logger.error(`User ${userId} is not connected`);
    }
  }

  /*
   * 읽지 않은 알림 여부 상태 전송
   */
  private async checkUnreadNotifications(userId: string, client?: Socket) {
    // 알림을 읽음 처리한 직후엔 강제로 ALL_READ 상태를 전송
    if (client) {
      client.emit('unreadStatus', { status: ResponseStatus.ALL_READ });
    }

    const socketId = this.userSockets.get(userId);

    const hasUnread = await this.notificationRepo
      .createQueryBuilder('notification')
      .where('user_ids @> :userId::jsonb', { userId: JSON.stringify([userId]) }) // 해당 사용자에게 온 알림만 확인
      .andWhere('NOT (read_by_user_ids @> :userId::jsonb)', { userId: JSON.stringify([userId]) }) // 읽지 않은 경우만
      .select('1')
      .limit(1)
      .getRawOne();

    const status = hasUnread ? ResponseStatus.UNREAD_EXIST : ResponseStatus.ALL_READ;

    if (socketId) {
      this.server.to(socketId).emit('unreadStatus', { status });
      console.log(`읽지 않은 알림 여부 상태 전송 아이디: ${userId}`);
    }
  }

  /*
   * 모든 알림 읽음 처리
   */
  @SubscribeMessage('markNotificationsAsRead')
  private async markNotificationsAsRead(@ConnectedSocket() client: Socket) {
    // const userId = this.getUserIdBySocketId(client.id);
    const userId = [...this.userSockets.entries()].find(([_, value]) => value === client.id)?.[0];
    if (!userId) {
      this.logger.error('Invalid user');
      return;
    }

    await this.notificationRepo
      .createQueryBuilder()
      .update(Notification)
      .set({ readByUserIds: () => `read_by_user_ids || '${JSON.stringify([userId])}'::jsonb` })
      .where('user_ids @> :userId::jsonb', { userId: JSON.stringify([userId]) }) // userIds 배열에 포함된 경우만
      .andWhere('NOT (read_by_user_ids @> :userId::jsonb)', { userId: JSON.stringify([userId]) }) // 아직 읽지 않은 경우만
      .execute();

    this.checkUnreadNotifications(userId, client);
  }

  private getUserIdBySocketId(socketId: string): string | undefined {
    return [...this.userSockets.entries()].find(([_, id]) => id === socketId)?.[0];
  }
}
