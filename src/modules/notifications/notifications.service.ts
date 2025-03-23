import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { PushService } from './push/push.service';
import { Notification } from './entities/notification.entity';
import { SendNotificationDto } from './dto/send-notification.dto';
import { NotificationType } from '../../common/constants/notification';
import { NotificationGateway } from '../../gateways/notification.gateway';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { NotificationQueryDto } from './dto/notification-query.dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { formatPagination } from '../../common/helpers/pagination.helper';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification) private readonly notificationRepo: Repository<Notification>,
    private readonly notificationGateway: NotificationGateway,
    private readonly pushService: PushService,
  ) {}

  /**
   * @description 알림 발송
   */
  async sendNotification(sendNotificationDto: SendNotificationDto) {
    const notification = this.notificationRepo.create({
      userIds: sendNotificationDto.userIds,
      category: sendNotificationDto.category,
      title: sendNotificationDto.title,
      message: sendNotificationDto.message,
      notificationType: sendNotificationDto.notificationType,
      link: sendNotificationDto.link,
    });

    await this.notificationRepo.save(notification);

    // 웹소켓을 통해 특정 유저에게 인앱 알림 전송
    sendNotificationDto.userIds.forEach((userId) => {
      this.notificationGateway.sendNotificationToUser(userId, {
        category: sendNotificationDto.category,
        title: sendNotificationDto.title,
        message: sendNotificationDto.message,
        notificationType: sendNotificationDto.notificationType,
        link: sendNotificationDto.link,
      });
    });

    // FCM 푸시 알림 전송
    if (sendNotificationDto.notificationType.includes(NotificationType.PUSH)) {
      const payload = {
        userIds: sendNotificationDto.userIds,
        title: sendNotificationDto.title,
        body: sendNotificationDto.message,
        link: sendNotificationDto.link,
      };

      await this.pushService.sendPushNotification(payload);
    }

    return { success: ResponseStatus.SUCCESS };
  }

  /**
   * 알림 리스트
   */
  async notificationList(userId: string, filters: NotificationQueryDto) {
    const { page, limit } = filters;

    const optionPagination: IPaginationOptions = { page, limit };

    const queryBuilder = this.notificationRepo
      .createQueryBuilder('notification')
      .where('notification.userIds @> :userId::jsonb', { userId: JSON.stringify([userId]) })
      .orderBy('notification.createdAt', 'DESC');

    const paginatedResult = await paginate<Notification>(queryBuilder, optionPagination);

    return formatPagination({
      ...paginatedResult,
    });
  }
}
