import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SecretsManagerService } from '../../providers/secrets-manager/secrets-manager.service';
import { makeSignature } from '../../common/helpers/makeSignature.help';
import { generateDate } from '../../common/utils/generateDate';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as https from 'https';

@Injectable()
export class CertificationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly secretsManagerService: SecretsManagerService,
    private readonly httpService: HttpService,
  ) {}

  async hashUp() {
    const site_cd = this.configService.get('SITE_CODE');
    const ct_type = this.configService.get('CT_TYPE');
    const web_siteid = this.configService.get('WEB_SIDE_ID');
    const cryptoPassword = this.configService.get('CRYPTO_PASSWORD');
    const certpassUrl = this.configService.get('CERTPASS_URL');

    const make_req_dt = generateDate();

    const hash_data = site_cd + '^' + ct_type + '^' + make_req_dt; //up_hash 생성 서명 데이터

    const pemKey = await this.secretsManagerService.getSecret('kcp-pem-key');
    const kcpCertPemKey = await this.secretsManagerService.getSecret('kcp-cert-pem-key');

    // const kcp_sign_data = await makeSignature(hash_data, pemKey, cryptoPassword); //서명 데이터(무결성 검증)

    // const time = new Date().getTime();
    // const ordr_idxx = make_req_dt + time;

    // const requestData = {
    //   site_cd: site_cd,
    //   kcp_cert_info: JSON.stringify(kcpCertPemKey),
    //   ct_type: 'HAS',
    //   ordr_idxx: ordr_idxx,
    //   web_siteid: web_siteid,
    //   make_req_dt: make_req_dt,
    //   kcp_sign_data: kcp_sign_data,
    // };

    // const httpsAgent = new https.Agent({
    //   secureProtocol: 'TLSv1_2_method',
    // });

    try {
      // const response = await firstValueFrom(
      //   this.httpService.post(url, requestData, {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     timeout: 5000,
      //   }),
      // );

      // const response = await firstValueFrom(
      //   this.httpService.post(certpassUrl, requestData, {
      //     httpsAgent,
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     timeout: 3000,
      //   }),
      // );

      // console.log('Response from KCP:', response.data);

      return 'asd';
    } catch (error) {
      console.error('Error during KCP API call:', error.message);
      throw error;
    }
  }
}
