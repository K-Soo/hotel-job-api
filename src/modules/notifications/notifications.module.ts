import { Global, Module } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { NotificationController } from './notifications.controller';
import { PushModule } from './push/push.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationGateway } from '../../gateways/notification.gateway';
import { AuthModule } from '../../authentication/auth/auth.module';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Notification]), PushModule, AuthModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
  exports: [NotificationService],
})
export class NotificationsModule {}
