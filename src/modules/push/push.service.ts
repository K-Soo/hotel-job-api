import { Injectable } from '@nestjs/common';
import { SaveFcmTokenDto } from './dto/save-fcm-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Push } from './entities/push.entity';
import { RequestUser } from '../../authentication/auth/interfaces/jwt-payload.interface';

@Injectable()
export class PushService {
  constructor(
    @InjectRepository(Push)
    private readonly tokenRepo: Repository<Push>,
  ) {}

  async saveFcmToken(saveFcmTokenDto: SaveFcmTokenDto, userAgent: string, user: RequestUser) {
    // const { userId, fcmToken, device, isPwa, provider, browser } = saveFcmTokenDto;

    // let existingToken = await this.fcmTokenRepo.findOne({ where: { userId, deviceType, browser } });

    // let existingToken = await this.fcmTokenRepo.findOne({
    //   where: { userId, deviceType, browser },
    // });

    return { success: true };
  }
}
