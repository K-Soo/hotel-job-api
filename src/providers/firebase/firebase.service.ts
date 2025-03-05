import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export class FirebaseService {
  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App) {}

  /**
   *  푸시 알림 전송
   */
  async sendPushNotification(payload: MulticastMessage) {
    try {
      const response = await this.firebaseAdmin.messaging().sendEachForMulticast(payload);
      console.log(`📤 푸시 알림 전송 완료: ${response.successCount}개 성공`);

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fire store에서 사용자 데이터 조회
   */
  async getUserData(userId: string) {
    const db = this.firebaseAdmin.firestore();
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      throw new Error(`사용자 ${userId}를 찾을 수 없습니다.`);
    }

    return userDoc.data();
  }
}
