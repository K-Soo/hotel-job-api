import { Controller, Post, Body, Get, Req, UseGuards, Query } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { NotificationQueryDto } from './dto/notification-query.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({ summary: '알림 발송' })
  @Post()
  sendNotification(@Body() sendNotificationDto: SendNotificationDto) {
    return this.notificationService.sendNotification(sendNotificationDto);
  }

  @ApiBearerAuth()
  @UseGuards(PassportJwtGuard, RolesGuard)
  @Roles('EMPLOYER', 'JOB_SEEKER')
  @ApiOperation({ summary: '알림 목록 리스트' })
  @Get()
  notificationList(@Req() req: Request, @Query() query: NotificationQueryDto) {
    return this.notificationService.notificationList(req.user['sub'], query);
  }
}
