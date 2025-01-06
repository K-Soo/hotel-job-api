import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { SecretsManagerService } from '../../providers/secrets-manager/secrets-manager.service';
import { makeSignature } from '../../common/helpers/makeSignature.help';
import { generateDate } from '../../common/utils/generateDate';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as https from 'https';
import * as path from 'path';
import * as fs from 'fs';
import { Response, Request } from 'express';

const g_conf_cert_info =
  '-----BEGIN CERTIFICATE-----MIIDgTCCAmmgAwIBAgIHBy4lYNG7ojANBgkqhkiG9w0BAQsFADBzMQswCQYDVQQGEwJLUjEOMAwGA1UECAwFU2VvdWwxEDAOBgNVBAcMB0d1cm8tZ3UxFTATBgNVBAoMDE5ITktDUCBDb3JwLjETMBEGA1UECwwKSVQgQ2VudGVyLjEWMBQGA1UEAwwNc3BsLmtjcC5jby5rcjAeFw0yMTA2MjkwMDM0MzdaFw0yNjA2MjgwMDM0MzdaMHAxCzAJBgNVBAYTAktSMQ4wDAYDVQQIDAVTZW91bDEQMA4GA1UEBwwHR3Vyby1ndTERMA8GA1UECgwITG9jYWxXZWIxETAPBgNVBAsMCERFVlBHV0VCMRkwFwYDVQQDDBAyMDIxMDYyOTEwMDAwMDI0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAppkVQkU4SwNTYbIUaNDVhu2w1uvG4qip0U7h9n90cLfKymIRKDiebLhLIVFctuhTmgY7tkE7yQTNkD+jXHYufQ/qj06ukwf1BtqUVru9mqa7ysU298B6l9v0Fv8h3ztTYvfHEBmpB6AoZDBChMEua7Or/L3C2vYtU/6lWLjBT1xwXVLvNN/7XpQokuWq0rnjSRThcXrDpWMbqYYUt/CL7YHosfBazAXLoN5JvTd1O9C3FPxLxwcIAI9H8SbWIQKhap7JeA/IUP1Vk4K/o3Yiytl6Aqh3U1egHfEdWNqwpaiHPuM/jsDkVzuS9FV4RCdcBEsRPnAWHz10w8CX7e7zdwIDAQABox0wGzAOBgNVHQ8BAf8EBAMCB4AwCQYDVR0TBAIwADANBgkqhkiG9w0BAQsFAAOCAQEAg9lYy+dM/8Dnz4COc+XIjEwr4FeC9ExnWaaxH6GlWjJbB94O2L26arrjT2hGl9jUzwd+BdvTGdNCpEjOz3KEq8yJhcu5mFxMskLnHNo1lg5qtydIID6eSgew3vm6d7b3O6pYd+NHdHQsuMw5S5z1m+0TbBQkb6A9RKE1md5/Yw+NymDy+c4NaKsbxepw+HtSOnma/R7TErQ/8qVioIthEpwbqyjgIoGzgOdEFsF9mfkt/5k6rR0WX8xzcro5XSB3T+oecMS54j0+nHyoS96/llRLqFDBUfWn5Cay7pJNWXCnw4jIiBsTBa3q95RVRyMEcDgPwugMXPXGBwNoMOOpuQ==-----END CERTIFICATE-----';
@Injectable()
export class CertificationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly secretsManagerService: SecretsManagerService,
    private readonly httpService: HttpService,
  ) {}

  async start() {
    try {
      const appEnv = this.configService.get('APP_ENV');
      const certpassUrl = this.configService.get('CERTPASS_URL');

      const ct_type = this.configService.get('CT_TYPE');

      const web_siteid_hashYN = 'Y';

      // eslint-disable-next-line prefer-const
      let site_cd = this.configService.get('SITE_CODE');
      if (appEnv === 'local') {
        site_cd = 'AO0QE'; //test
      }

      // eslint-disable-next-line prefer-const
      let web_siteid = this.configService.get('WEB_SIDE_ID');
      if (appEnv === 'local') {
        web_siteid = '';
      }

      // eslint-disable-next-line prefer-const
      let cryptoPassword = this.configService.get('CRYPTO_PASSWORD');
      if (appEnv === 'local') {
        cryptoPassword = 'changeit';
      }

      // eslint-disable-next-line prefer-const
      let secretPemKey = await this.secretsManagerService.getSecret('kcp-pem-key');
      //test
      if (appEnv === 'local') {
        const key_file_path = path.join(__dirname, '../../../splPrikeyPKCS8.pem');
        secretPemKey = fs.readFileSync(key_file_path).toString();
      }

      // eslint-disable-next-line prefer-const
      let kcpCertPemKey = await this.secretsManagerService.getSecret('kcp-cert-pem-key');
      //test
      if (appEnv === 'local') {
        kcpCertPemKey = g_conf_cert_info;
      }

      const make_req_dt = generateDate();

      const hash_data = site_cd + '^' + ct_type + '^' + make_req_dt;

      const kcp_sign_data = await makeSignature(hash_data, secretPemKey, cryptoPassword);

      const time = new Date().getTime();
      const ordr_idxx = make_req_dt + time;

      const requestData = {
        site_cd: site_cd,
        // kcp_cert_info: JSON.stringify(kcpCertPemKey),
        kcp_cert_info: kcpCertPemKey.replace(/\n/g, ''),
        ct_type: ct_type,
        ordr_idxx: ordr_idxx,
        web_siteid: web_siteid,
        make_req_dt: make_req_dt,
        kcp_sign_data: kcp_sign_data,
      };

      try {
        const response = await firstValueFrom(
          this.httpService.post(certpassUrl, requestData, {
            headers: {
              'Content-Type': 'application/json',
            },
            // timeout: 15000,
          }),
        );

        const data = response.data;
        console.log('응답 결과: ', data);

        // 성공
        if (data.res_cd === '0000') {
          return {
            status: ResponseStatus.SUCCESS,
            params: {
              // res default data
              res_cd: data.res_cd,
              res_msg: data.res_msg,
              up_hash: data.up_hash,
              kcp_merchant_time: data.kcp_merchant_time, //NHN KCP로 넘기는 상점 서버 시간: 필수값
              kcp_cert_lib_ver: data.kcp_cert_lib_ver, //NHN KCP CERT API 버전정보: 필수값

              url: this.configService.get('CERT_VIEW_URL'),
              ordr_idxx: ordr_idxx,
              req_tx: 'cert',
              cert_method: '01', //인증수단 고정 01
              web_siteid: web_siteid, //사이트 식별코드: 옵션값
              site_cd: site_cd, //가맹점 사이트코드: 필수값
              Ret_URL: this.configService.get('CERT_VIEW_REDIRECT_URL'),
              cert_otp_use: 'Y', //본인확인 인증요청 시 OTP 승인여부: 필수값, Y:실명확인 + OTP 점유 확인
              cert_enc_use_ext: 'Y', //고도화 암호화 사용유무: 필수값, 고정값:Y
              web_siteid_hashYN: web_siteid_hashYN, //사이트 식별코드 사용유무: 옵션값, web_siteid 사용시 Y로 전달
              param_opt_1: 'opt1', //업체 추가 변수: 옵션값
              param_opt_2: 'opt2',
              param_opt_3: 'opt3',
              kcp_page_submit_yn: 'Y', //페이지 전환방식 호출(반응형) 파라미터: 옵션값, 페이지 전환 방식으로 호출시 Y
            },
          };
        }

        return { status: ResponseStatus.FAILURE, message: data.res_msg };
      } catch (error) {
        console.error('Error during KCP API call:', error.message);
        throw error;
      }
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async verify(body: any) {
    return { status: ResponseStatus.SUCCESS };
  }
}
