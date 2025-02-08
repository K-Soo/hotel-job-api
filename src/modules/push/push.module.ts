import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { PushController } from './push.controller';
import { Push } from './entities/push.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Push])],
  controllers: [PushController],
  providers: [PushService],
})
export class PushModule {}
