import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SecretsManagerService } from '../../providers/secrets-manager/secrets-manager.service';
import { makeSignature } from '../../common/helpers/makeSignature.help';
import { generateDate } from '../../common/utils/generateDate';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as https from 'https';
import * as path from 'path';
import * as fs from 'fs';

const g_conf_cert_info =
  '-----BEGIN CERTIFICATE-----MIIDgTCCAmmgAwIBAgIHBy4lYNG7ojANBgkqhkiG9w0BAQsFADBzMQswCQYDVQQGEwJLUjEOMAwGA1UECAwFU2VvdWwxEDAOBgNVBAcMB0d1cm8tZ3UxFTATBgNVBAoMDE5ITktDUCBDb3JwLjETMBEGA1UECwwKSVQgQ2VudGVyLjEWMBQGA1UEAwwNc3BsLmtjcC5jby5rcjAeFw0yMTA2MjkwMDM0MzdaFw0yNjA2MjgwMDM0MzdaMHAxCzAJBgNVBAYTAktSMQ4wDAYDVQQIDAVTZW91bDEQMA4GA1UEBwwHR3Vyby1ndTERMA8GA1UECgwITG9jYWxXZWIxETAPBgNVBAsMCERFVlBHV0VCMRkwFwYDVQQDDBAyMDIxMDYyOTEwMDAwMDI0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAppkVQkU4SwNTYbIUaNDVhu2w1uvG4qip0U7h9n90cLfKymIRKDiebLhLIVFctuhTmgY7tkE7yQTNkD+jXHYufQ/qj06ukwf1BtqUVru9mqa7ysU298B6l9v0Fv8h3ztTYvfHEBmpB6AoZDBChMEua7Or/L3C2vYtU/6lWLjBT1xwXVLvNN/7XpQokuWq0rnjSRThcXrDpWMbqYYUt/CL7YHosfBazAXLoN5JvTd1O9C3FPxLxwcIAI9H8SbWIQKhap7JeA/IUP1Vk4K/o3Yiytl6Aqh3U1egHfEdWNqwpaiHPuM/jsDkVzuS9FV4RCdcBEsRPnAWHz10w8CX7e7zdwIDAQABox0wGzAOBgNVHQ8BAf8EBAMCB4AwCQYDVR0TBAIwADANBgkqhkiG9w0BAQsFAAOCAQEAg9lYy+dM/8Dnz4COc+XIjEwr4FeC9ExnWaaxH6GlWjJbB94O2L26arrjT2hGl9jUzwd+BdvTGdNCpEjOz3KEq8yJhcu5mFxMskLnHNo1lg5qtydIID6eSgew3vm6d7b3O6pYd+NHdHQsuMw5S5z1m+0TbBQkb6A9RKE1md5/Yw+NymDy+c4NaKsbxepw+HtSOnma/R7TErQ/8qVioIthEpwbqyjgIoGzgOdEFsF9mfkt/5k6rR0WX8xzcro5XSB3T+oecMS54j0+nHyoS96/llRLqFDBUfWn5Cay7pJNWXCnw4jIiBsTBa3q95RVRyMEcDgPwugMXPXGBwNoMOOpuQ==-----END CERTIFICATE-----';
@Injectable()
export class CertificationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly secretsManagerService: SecretsManagerService,
    private readonly httpService: HttpService,
  ) {}

  async hashUp() {
    let site_cd = this.configService.get('SITE_CODE');
    // site_cd = 'AO0QE'; //test
    const ct_type = this.configService.get('CT_TYPE');

    let web_siteid = this.configService.get('WEB_SIDE_ID');
    // web_siteid = ''; //test

    let cryptoPassword = this.configService.get('CRYPTO_PASSWORD');
    // cryptoPassword = 'changeit'; //test

    const certpassUrl = this.configService.get('CERTPASS_URL');

    let pemKey = await this.secretsManagerService.getSecret('kcp-pem-key');
    //test
    // const key_file_path = path.join(__dirname, '../../../splPrikeyPKCS8.pem');
    // pemKey = fs.readFileSync(key_file_path).toString();

    let kcpCertPemKey = await this.secretsManagerService.getSecret('kcp-cert-pem-key');
    console.log('kcpCertPemKey: ', kcpCertPemKey);
    // kcpCertPemKey = g_conf_cert_info;

    const make_req_dt = generateDate();

    const hash_data = site_cd + '^' + ct_type + '^' + make_req_dt;

    const kcp_sign_data = await makeSignature(hash_data, pemKey, cryptoPassword);

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
    console.log('requestData: ', requestData);

    const httpsAgent = new https.Agent({
      secureProtocol: 'TLSv1_2_method',
    });

    try {
      const response = await firstValueFrom(
        this.httpService.post(certpassUrl, requestData, {
          httpsAgent,
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        }),
      );
      console.log('response: ', response.data);

      return response.data;
    } catch (error) {
      console.error('Error during KCP API call:', error.message);
      throw error;
    }
  }
}
