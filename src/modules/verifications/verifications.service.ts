import { BadRequestException, Injectable } from '@nestjs/common';
import { EmployersService } from '../employers/employers.service';
import { BusinessNumberDto } from './dto/business-number.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { CompanyService } from '../employers/company/company.service';
@Injectable()
export class VerificationsService {
  constructor(
    private readonly employersService: EmployersService,
    private readonly configService: ConfigService,
    private readonly companyService: CompanyService,
    private readonly httpService: HttpService,
  ) {}

  findEmployerUserId(userId: string) {
    return this.employersService.findOneUserId(userId);
  }

  async businessNumberCheck(businessNumberDto: BusinessNumberDto) {
    const nationBusinessUrl = this.configService.get('NATIONAL_BUSINESS_URL');
    const nationTexServiceKey = this.configService.get('NATIONAL_TAX_SERVICE_KEY');
    const statusUrl = `${nationBusinessUrl}?serviceKey=${nationTexServiceKey}&returnType=JSON`;

    const requestData = {
      b_no: [businessNumberDto.b_no],
    };

    try {
      const existingBusinessNumber = await this.companyService.findBusinessNumber(businessNumberDto.b_no);
      if (existingBusinessNumber) {
        return { status: ResponseStatus.DUPLICATE };
      }

      const response = await firstValueFrom(
        this.httpService.post(statusUrl, requestData, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 7000,
        }),
      );

      const data = response.data;
      console.log('사업자 번호검증 API : ', data);

      if (!data?.match_cnt) {
        return { status: ResponseStatus.FAILURE };
      }

      return { status: ResponseStatus.SUCCESS };
    } catch (error) {
      console.log('error: ', error.message);
      throw new BadRequestException();
    }
  }
}
