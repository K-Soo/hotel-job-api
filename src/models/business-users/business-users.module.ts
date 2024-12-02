import { Module } from '@nestjs/common';
import { BusinessUsersService } from './business-users.service';
import { BusinessUsersController } from './business-users.controller';

@Module({
  controllers: [BusinessUsersController],
  providers: [BusinessUsersService],
})
export class BusinessUsersModule {}
