import { PushService } from './push.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { Response, Request } from 'express';
import { SaveFcmTokenDto } from './dto/save-fcm-token.dto';
import { RequestUser } from '../../authentication/auth/interfaces/jwt-payload.interface';
import { UAParser } from 'ua-parser-js';
import * as requestIp from 'request-ip';

@ApiBearerAuth()
@Controller('push')
@UseGuards(PassportJwtGuard, RolesGuard)
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @ApiOperation({ summary: 'FCM 토큰 저장' })
  @Post('/token')
  async saveFcmToken(@Req() req: Request, @Body() saveFcmTokenDto: SaveFcmTokenDto) {
    console.log('saveFcmTokenDto: ', saveFcmTokenDto);
    const user = req.user as RequestUser;

    const parser = new UAParser(req.headers['user-agent'] || '');
    const result = parser.getResult();
    const ip = requestIp.getClientIp(req);

    console.log('브라우저:', result.browser.name);
    console.log('운영체제:', result.os.name);
    console.log('디바이스:', result.device.type);
    console.log('엔진:', result.engine.name);

    const userAgent = {
      ip,
      browser: result.browser.name,
      os: result.os.name,
      device: result?.device?.type ?? undefined,
      engine: result.engine.name,
    };

    type UserAgent = keyof typeof userAgent;

    // const ip = req.ip || req.connection.remoteAddress;
    // const agent = useragent.parse(req.headers['user-agent'] || '');

    // const serverDevice = agent.os.toString();
    // const serverBrowser = agent.family;

    // FCM 토큰 저장 로직
    // return this.pushService.saveFcmToken(saveFcmTokenDto, userAgent, user);
    return { success: true };
  }

  @ApiOperation({ summary: 'FCM 토큰 확인' })
  @Post('/token/check')
  async checkFcmToken(@Req() req: Request) {
    // 특정 사용자의 FCM 토큰 확인
  }

  @ApiOperation({ summary: 'FCM 토큰 삭제' })
  @Delete('/token')
  async deleteFcmToken(@Body() body) {
    // 특정 사용자의 FCM 토큰 삭제
  }

  @ApiOperation({ summary: '특정 사용자에게 푸시 전송' })
  @Post('/send')
  async sendPushToUser(@Body() body) {
    // 특정 사용자에게 푸시 전송
  }

  @ApiOperation({ summary: '푸시 알림 설정 변경' })
  @Put('/settings')
  async updatePushSettings(@Body() body) {
    // 사용자의 푸시 알림 설정 변경
  }
}
