import { ConfigService } from '@nestjs/config';
import { ConflictException, HttpException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { SecretsManagerService } from '../../providers/secrets-manager/secrets-manager.service';
import { makeSignature } from '../../common/helpers/makeSignature.help';
import { generateDate } from '../../common/utils/generateDate';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as path from 'path';
import * as fs from 'fs';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { DecryptCertDto } from './dto/decrypt-cert.dto';
import { DecryptCertResponse } from './interfaces/decrypt-cert.response.interface';
import { Certification } from './entities/certification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CertificationStatus, CertificationType } from '../../common/constants/app.enum';
import { EmployersService } from '../../modules/employers/employers.service';
import { Employer } from '../../modules/employers/entities/employer.entity';
import { Applicant } from '../../modules/applicants/entities/applicant.entity';
import { ApplicantsService } from '../../modules/applicants/applicants.service';
import { ProviderType, RoleType } from '../../common/types';
import { safeQuery } from '../../common/helpers/database.helper';
const g_conf_cert_info =
  '-----BEGIN CERTIFICATE-----MIIDgTCCAmmgAwIBAgIHBy4lYNG7ojANBgkqhkiG9w0BAQsFADBzMQswCQYDVQQGEwJLUjEOMAwGA1UECAwFU2VvdWwxEDAOBgNVBAcMB0d1cm8tZ3UxFTATBgNVBAoMDE5ITktDUCBDb3JwLjETMBEGA1UECwwKSVQgQ2VudGVyLjEWMBQGA1UEAwwNc3BsLmtjcC5jby5rcjAeFw0yMTA2MjkwMDM0MzdaFw0yNjA2MjgwMDM0MzdaMHAxCzAJBgNVBAYTAktSMQ4wDAYDVQQIDAVTZW91bDEQMA4GA1UEBwwHR3Vyby1ndTERMA8GA1UECgwITG9jYWxXZWIxETAPBgNVBAsMCERFVlBHV0VCMRkwFwYDVQQDDBAyMDIxMDYyOTEwMDAwMDI0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAppkVQkU4SwNTYbIUaNDVhu2w1uvG4qip0U7h9n90cLfKymIRKDiebLhLIVFctuhTmgY7tkE7yQTNkD+jXHYufQ/qj06ukwf1BtqUVru9mqa7ysU298B6l9v0Fv8h3ztTYvfHEBmpB6AoZDBChMEua7Or/L3C2vYtU/6lWLjBT1xwXVLvNN/7XpQokuWq0rnjSRThcXrDpWMbqYYUt/CL7YHosfBazAXLoN5JvTd1O9C3FPxLxwcIAI9H8SbWIQKhap7JeA/IUP1Vk4K/o3Yiytl6Aqh3U1egHfEdWNqwpaiHPuM/jsDkVzuS9FV4RCdcBEsRPnAWHz10w8CX7e7zdwIDAQABox0wGzAOBgNVHQ8BAf8EBAMCB4AwCQYDVR0TBAIwADANBgkqhkiG9w0BAQsFAAOCAQEAg9lYy+dM/8Dnz4COc+XIjEwr4FeC9ExnWaaxH6GlWjJbB94O2L26arrjT2hGl9jUzwd+BdvTGdNCpEjOz3KEq8yJhcu5mFxMskLnHNo1lg5qtydIID6eSgew3vm6d7b3O6pYd+NHdHQsuMw5S5z1m+0TbBQkb6A9RKE1md5/Yw+NymDy+c4NaKsbxepw+HtSOnma/R7TErQ/8qVioIthEpwbqyjgIoGzgOdEFsF9mfkt/5k6rR0WX8xzcro5XSB3T+oecMS54j0+nHyoS96/llRLqFDBUfWn5Cay7pJNWXCnw4jIiBsTBa3q95RVRyMEcDgPwugMXPXGBwNoMOOpuQ==-----END CERTIFICATE-----';
@Injectable()
export class CertificationService {
  private readonly logger = new Logger(CertificationService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly secretsManagerService: SecretsManagerService,
    private readonly httpService: HttpService,
    private readonly employersService: EmployersService,
    private readonly applicantsService: ApplicantsService,
    @InjectRepository(Certification) private readonly certificationRepository: Repository<Certification>,
    @InjectRepository(Employer) private employerRepo: Repository<Employer>,
    @InjectRepository(Applicant) private applicantRepo: Repository<Applicant>,
  ) {}

  // 본인인증 시작 params 생성
  async startCertification() {
    try {
      const appEnv = this.configService.get('APP_ENV');
      const certpassUrl = this.configService.get('CERTPASS_URL');

      const ct_type = 'HAS';

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
        kcp_cert_info: kcpCertPemKey.replace(/\n/g, ''),
        ct_type: ct_type,
        ordr_idxx: ordr_idxx, //상점 관리 주문번호
        web_siteid: web_siteid,
        make_req_dt: make_req_dt, //해쉬 생성 요청 일시
        kcp_sign_data: kcp_sign_data,
      };

      try {
        const response = await firstValueFrom(
          this.httpService.post(certpassUrl, requestData, {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 7000,
          }),
        );

        const data = response.data;
        console.log('start Certification 응답 결과: ', data);

        // 성공
        if (data.res_cd !== '0000') {
          throw new Error(data.res_msg);
        }

        return {
          status: ResponseStatus.SUCCESS,
          params: {
            // res default data
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
            param_opt_1: '', //업체 추가 변수: 옵션값
            param_opt_2: '',
            param_opt_3: '',
            kcp_page_submit_yn: 'Y', //페이지 전환방식 호출(반응형) 파라미터: 옵션값, 페이지 전환 방식으로 호출시 Y
          },
        };
      } catch (error) {
        throw error;
      }
    } catch (error) {
      this.logger.error(`[본인인증 초기화 실패]: ${error.message}`);
      throw new UnauthorizedException(error.message);
    }
  }

  /**
   * NHN KCP 본인인증 서비스와 통신하여 사용자의 `dn_hash`를 검증
   * 검증 요청이 성공하면 `ordr_idxx`, `enc_cert_data2`, `dn_hash`, `cert_no` 값을 반환
   */
  async verifyDnHash(verifyDto: any) {
    const dn_hash = verifyDto.dn_hash;
    const ordr_idxx = verifyDto.ordr_idxx;
    const cert_no = verifyDto.cert_no;
    const enc_cert_data2 = verifyDto.enc_cert_data2;

    try {
      const certpassUrl = this.configService.get('CERTPASS_URL');
      const site_cd = this.configService.get('SITE_CODE');
      const ct_type = 'CHK';
      const secretPemKey = await this.secretsManagerService.getSecret('kcp-pem-key');

      const kcpCertPemKey = await this.secretsManagerService.getSecret('kcp-cert-pem-key');

      const cryptoPassword = this.configService.get('CRYPTO_PASSWORD');

      const hash_data = site_cd + '^' + ct_type + '^' + cert_no + '^' + dn_hash;

      const kcp_sign_data = await makeSignature(hash_data, secretPemKey, cryptoPassword);

      const requestData = {
        //상점 정보
        site_cd,
        kcp_cert_info: kcpCertPemKey.replace(/\n/g, ''),
        ordr_idxx,
        // 등록 요청정보
        ct_type,
        //데이터 검증 요청정보
        dn_hash,
        cert_no,
        kcp_sign_data,
      };

      try {
        const response = await firstValueFrom(
          this.httpService.post(certpassUrl, requestData, {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 7000,
          }),
        );
        const data = response.data;

        console.log('dn_hash 검증 요청 API : ', data);

        if (data.res_cd !== '0000') {
          throw new Error(data.res_msg);
        }
        return { ordr_idxx, enc_cert_data2, dn_hash, cert_no };
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw new UnauthorizedException(customHttpException.CERTIFICATION_FAILED(error.message));
    }
  }

  /**
   * 본인인증 복호화 및 개인정보 응답
   */
  async decryptCert(decryptCertDto: DecryptCertDto) {
    try {
      const site_cd = this.configService.get('SITE_CODE');
      const kcpCertPemKey = await this.secretsManagerService.getSecret('kcp-cert-pem-key');
      const secretPemKey = await this.secretsManagerService.getSecret('kcp-pem-key');
      const cryptoPassword = this.configService.get('CRYPTO_PASSWORD');
      const certpassUrl = this.configService.get('CERTPASS_URL');

      const ct_type = 'DEC';

      const hash_data = site_cd + '^' + ct_type + '^' + decryptCertDto.cert_no;

      const kcp_sign_data = await makeSignature(hash_data, secretPemKey, cryptoPassword);

      const requestData = {
        site_cd,
        kcp_cert_info: kcpCertPemKey.replace(/\n/g, ''),
        ordr_idxx: decryptCertDto.ordr_idxx,
        ct_type,
        cert_no: decryptCertDto.cert_no,
        dn_hash: decryptCertDto.dn_hash,
        enc_cert_Data: decryptCertDto.enc_cert_data2,
        kcp_sign_data,
      };

      const response = await firstValueFrom(
        this.httpService.post<DecryptCertResponse>(certpassUrl, requestData, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 7000,
        }),
      );

      const data = response.data;
      console.log('복호화 응답데이터 API : ', data);

      if (data.res_cd !== '0000') {
        throw new Error(data.res_msg);
      }

      return data;
    } catch (error) {
      throw new UnauthorizedException(customHttpException.CERTIFICATION_FAILED(error.message));
    }
  }

  /**
   *  본인인증 정보 저장, 이미 본인인증을 완료했는지 확인
   *  @description 사업자 - DI 중복확인(같은 본인인증정보 인증 불가)
   *  @description 일반 유저 - 본인인증 완료 여부 확인
   */
  async saveCertification(decryptCert: DecryptCertResponse, user: Applicant | Employer) {
    try {
      // 해당 유저가 이미 본인인증을 완료했는지 확인
      const existCertification = await this.checkSignUpCertificationExists(user);

      if (existCertification) {
        return { status: ResponseStatus.DUPLICATE };
      }

      // 사업자 - 이미 존재하는 본인인증 정보 중복확인
      if (user instanceof Employer) {
        const isDuplicateDi = await this.SignUpWithDiAlreadyVerified(decryptCert.di);

        if (isDuplicateDi) {
          return { status: ResponseStatus.UNAVAILABLE };
        }

        const createdCertification = await safeQuery(async () =>
          this.certificationRepository.create({
            ...decryptCert,
            certificationType: CertificationType.SIGN_UP,
            employer: user,
          }),
        );

        await safeQuery(() => this.certificationRepository.save(createdCertification));

        await safeQuery(() => this.employerRepo.update(user.id, { certificationStatus: CertificationStatus.VERIFIED }));

        return { status: ResponseStatus.SUCCESS };
      }

      // 일반 유저
      if (user instanceof Applicant) {
        const createdCertification = await safeQuery(async () =>
          this.certificationRepository.create({
            ...decryptCert,
            certificationType: CertificationType.SIGN_UP,
            applicant: user,
          }),
        );

        await safeQuery(() => this.certificationRepository.save(createdCertification));

        await safeQuery(() =>
          this.applicantRepo.update(user.id, { certificationStatus: CertificationStatus.VERIFIED }),
        );

        return { status: ResponseStatus.SUCCESS };
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new UnauthorizedException(customHttpException.CERTIFICATION_FAILED(error.message));
    }
  }

  /**
   * 유저의 본인인증 정보 존재여부 확인
   */
  async checkSignUpCertificationExists(user: Applicant | Employer) {
    if (user instanceof Employer) {
      const existingCertification = await this.certificationRepository.findOne({
        where: { employer: { id: user.id }, certificationType: CertificationType.SIGN_UP },
      });

      return existingCertification;
    }

    if (user instanceof Applicant) {
      const existingCertification = await this.certificationRepository.findOne({
        where: {
          applicant: { id: user.id },
          certificationType: CertificationType.SIGN_UP,
        },
      });

      return existingCertification;
    }
  }

  /**
   *이미 존재하는 DI값(휴대폰번호) 중복확인
   */
  private async SignUpWithDiAlreadyVerified(di: string): Promise<boolean> {
    const existingCertification = await this.certificationRepository.findOne({
      where: { di, certificationType: CertificationType.SIGN_UP },
    });

    return !!existingCertification;
  }

  /**
   * DI 값, 유저 id로 본인인증 정보 찾기
   */
  async findVerifySignUpUser(di: string, user: Applicant | Employer) {
    const userTypeKey = user instanceof Employer ? 'employer' : 'applicant';

    const where = {
      di,
      certificationType: CertificationType.SIGN_UP,
      [userTypeKey]: { id: user.id },
    };

    return this.certificationRepository.findOne({ where });
  }
}
