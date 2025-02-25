import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { PushController } from './push.controller';
import { Push } from './entities/push.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseModule } from '../../../providers/firebase/firebase.module';

@Module({
  imports: [TypeOrmModule.forFeature([Push]), FirebaseModule],
  controllers: [PushController],
  providers: [PushService],
  exports: [PushService],
})
export class PushModule {}
