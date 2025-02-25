import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

export const FirebaseProvider = {
  provide: 'FIREBASE_ADMIN',
  useFactory: (configService: ConfigService) => {
    const projectId = configService.get('PROJECT_ID');
    const privateKey = configService.get('PRIVATE_KEY');
    const clientEmail = configService.get('CLIENT_EMAIL');

    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        privateKey: privateKey?.replace(/\\n/g, '\n'),
        clientEmail,
      }),
    });
  },
  inject: [ConfigService],
};
