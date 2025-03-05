import { PushService } from './push.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from '../../../common/decorators/metadata/roles.decorator';
import { Body, Controller, Delete, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { PassportJwtGuard } from '../../../authentication/auth/guards/passport-jwt.guard';
import { Response, Request } from 'express';
import { SaveFcmTokenDto } from './dto/save-fcm-token.dto';
import { RequestUser } from '../../../authentication/auth/interfaces/jwt-payload.interface';
import { UAParser } from 'ua-parser-js';
import { SendPushToUserDto } from './dto/send-push-to-user.dto';
// import * as requestIp from 'request-ip';

@Controller('notification/push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @ApiBearerAuth()
  @UseGuards(PassportJwtGuard, RolesGuard)
  @ApiOperation({ summary: 'FCM 토큰 저장' })
  @Post('/token')
  async saveFcmToken(@Req() req: Request, @Body() saveFcmTokenDto: SaveFcmTokenDto) {
    const user = req.user as RequestUser;

    const parser = new UAParser(req.headers['user-agent'] || '');
    const result = parser.getResult();
    // const ip = requestIp.getClientIp(req);

    const userAgent = {
      os: result.os.name,
      device: result.device.type,
    };

    return this.pushService.saveFcmToken(saveFcmTokenDto, userAgent, user);
  }

  @ApiOperation({ summary: '특정 사용자에게 푸시 전송' })
  @Post('/send')
  async sendPushToUser(@Body() sendPushToUserDto: SendPushToUserDto) {
    this.pushService.sendPushNotification(sendPushToUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(PassportJwtGuard, RolesGuard)
  @ApiOperation({ summary: 'FCM 토큰 확인' })
  @Post('/token/check')
  async checkFcmToken(@Req() req: Request) {
    // 특정 사용자의 FCM 토큰 확인
  }

  @ApiBearerAuth()
  @UseGuards(PassportJwtGuard, RolesGuard)
  @ApiOperation({ summary: '푸시 알림 설정 변경' })
  @Put('/settings')
  async updatePushSettings(@Body() body) {
    // 사용자의 푸시 알림 설정 변경
  }
}
