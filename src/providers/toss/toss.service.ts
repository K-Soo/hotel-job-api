import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { TossConfirmResponse } from './interfaces/toss-confirm-response.interface';

@Injectable()
export class TossService {
  private readonly logger = new Logger(TossService.name);

  private readonly TOSS_API_URL = 'https://api.tosspayments.com/v1/payments/confirm';
  private readonly secretKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.secretKey = this.configService.get<string>('TOSS_SECRET_KEY');
  }

  private getAuthorizationHeader(): string {
    return 'Basic ' + Buffer.from(`${this.secretKey}:`).toString('base64');
  }

  async confirmPayment(orderId: string, paymentKey: string, amount: number) {
    try {
      const response = await lastValueFrom(
        this.httpService.post<TossConfirmResponse>(
          this.TOSS_API_URL,
          { orderId, paymentKey, amount },
          {
            headers: {
              Authorization: this.getAuthorizationHeader(),
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`❌ toss Payment Error: ${error.response?.data?.code}`);
      throw error;
    }
  }
}
