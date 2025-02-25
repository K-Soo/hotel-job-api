import { Injectable } from '@nestjs/common';
import { SaveFcmTokenDto } from './dto/save-fcm-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Repository } from 'typeorm';
import { Push } from './entities/push.entity';
import { RequestUser } from '../../../authentication/auth/interfaces/jwt-payload.interface';
import { UserAgent } from './interfaces/user-agent.interface';
import { FirebaseService } from '../../../providers/firebase/firebase.service';
import { MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';
import { ResponseStatus } from '../../../common/constants/responseStatus';
import { SendPushToUserDto } from './dto/send-push-to-user.dto';

@Injectable()
export class PushService {
  constructor(
    @InjectRepository(Push)
    private readonly pushRepo: Repository<Push>,
    private readonly firebaseService: FirebaseService,
  ) {}

  /**
   * 푸시 알림 전송
   */
  async sendPushNotification(sendPushToUserDto: SendPushToUserDto) {
    const tokens = await this.getUserPushTokens(sendPushToUserDto.userIds);

    if (tokens.length === 0) {
      console.log('활성화된 푸시 토큰이 없음');
      return;
    }

    const registrationTokens = tokens.map((t) => t.token);

    const payload: MulticastMessage = {
      notification: { title: sendPushToUserDto.title, body: sendPushToUserDto.body },
      tokens: registrationTokens,
      webpush: {
        fcmOptions: {
          link: sendPushToUserDto.link ?? undefined,
        },
      },
    };

    const response = await this.firebaseService.sendPushNotification(payload);

    const invalidTokens: string[] = [];

    response.responses.forEach((res, idx) => {
      if (!res.success) {
        if (
          res.error?.code === 'messaging/invalid-registration-token' ||
          res.error?.code === 'messaging/registration-token-not-registered'
        ) {
          invalidTokens.push(registrationTokens[idx]);
        }
      }
    });

    if (invalidTokens.length > 0) {
      await this.removeInvalidTokens(invalidTokens);
      console.log(`${invalidTokens.length}개의 잘못된 FCM 토큰 삭제 완료`);
    }

    return { status: ResponseStatus.SUCCESS };
  }

  async saveFcmToken(saveFcmTokenDto: SaveFcmTokenDto, userAgent: UserAgent, user: RequestUser) {
    const existingToken = await this.pushRepo.findOne({ where: { token: saveFcmTokenDto.token } });

    if (existingToken) {
      // 기존 토큰이 다른 사용자에게 등록된 경우 -> 사용자 변경
      if (existingToken.userId !== user.sub) {
        await this.pushRepo.update(existingToken.id, {
          userId: user.sub,
          device: userAgent.device,
          os: userAgent.os,
          updatedAt: new Date(),
        });

        return { success: ResponseStatus.SUCCESS, message: 'FCM 토큰이 새로운 사용자로 업데이트되었습니다.' };
      }

      // 기존 사용자와 동일하면 `updatedAt`만 갱신
      await this.pushRepo.update(existingToken.id, { updatedAt: new Date() });
      return { success: ResponseStatus.SUCCESS, message: 'FCM 토큰이 갱신되었습니다.' };
    }

    // 새로운 사용자 ID로 푸시 토큰 저장
    const newFcmToken = this.pushRepo.create({
      userId: user.sub,
      token: saveFcmTokenDto.token,
      device: userAgent.device,
      os: userAgent.os,
    });

    await this.pushRepo.save(newFcmToken);

    return { success: ResponseStatus.SUCCESS };
  }

  /**
   * 오래된 FCM 토큰 삭제 (2개월 이상 미사용)
   */
  async removeInactiveTokens() {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const inactiveTokens = await this.pushRepo.find({
      where: { updatedAt: LessThan(twoMonthsAgo) },
    });

    if (inactiveTokens.length > 0) {
      await this.pushRepo.delete({ updatedAt: LessThan(twoMonthsAgo) });
      console.log(`${inactiveTokens.length}개의 오래된 푸시 토큰 삭제 완료`);
    }
  }

  /**
   *  FCM 전송 후 잘못된 토큰 삭제
   */
  async removeInvalidTokens(invalidTokens: string[]) {
    if (invalidTokens.length > 0) {
      await this.pushRepo.delete({ token: In(invalidTokens) });
      console.log(`🚫 ${invalidTokens.length}개의 잘못된 FCM 토큰 삭제 완료`);
    }
  }

  /**
   * 특정 사용자의 모든 활성화된 푸시 토큰 조회
   */
  async getUserPushTokens(userIds: string[] | string) {
    const userIdArray = Array.isArray(userIds) ? userIds : [userIds];

    return await this.pushRepo.find({
      where: { userId: In(userIdArray), isActivePermission: true },
    });
  }
}
