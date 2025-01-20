import { IsString, IsIn, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { CommType } from '../../../common/constants/app.enum';
export class VerifyDto {
  @IsString()
  @IsOptional()
  CI: string;

  @IsString()
  @IsOptional()
  CI_ENC_YN: string;

  @IsString()
  @IsOptional()
  CI_URL: string;

  @IsString()
  @IsOptional()
  DI: string;

  @IsString()
  @IsOptional()
  DI_URL: string;

  @IsString()
  @IsOptional()
  Logo_URL: string;

  @IsIn(['Y', 'N'])
  PRE_USE_YN: 'Y' | 'N';

  @IsString()
  @IsOptional()
  Ret_Noti: string;

  @IsString()
  @IsOptional()
  Ret_URL: string;

  @IsString()
  @IsOptional()
  auth_tx_id: string;

  @IsString()
  @IsOptional()
  birth_day: string;

  @IsIn(['Y', 'N'])
  cert_01_yn: 'Y' | 'N';

  @IsIn(['Y', 'N'])
  cert_02_yn: 'Y' | 'N';

  @IsIn(['Y', 'N'])
  cert_enc_use: 'Y' | 'N';

  @IsIn(['Y', 'N'])
  cert_enc_use_ext: 'Y' | 'N';

  @IsString()
  @IsOptional()
  cert_method: string;

  @IsString()
  @IsOptional()
  cert_no: string;

  @IsIn(['Y', 'N'])
  @IsString()
  cert_otp_use: 'Y' | 'N';

  @IsEnum(CommType)
  @IsOptional()
  comm_id: CommType;

  @IsString()
  @IsOptional()
  day: string;

  @IsString()
  @IsNotEmpty()
  dn_hash: string;

  @IsString()
  @IsNotEmpty()
  enc_cert_data2: string;

  @IsString()
  @IsOptional()
  info_code: string;

  @IsString()
  @IsOptional()
  kcp_merchant_time: string;

  @IsString()
  local_code: string;

  @IsString()
  log_trace_no: string;

  @IsString()
  month: string;

  @IsString()
  @IsNotEmpty()
  ordr_idxx: string;

  @IsString()
  @IsOptional()
  per_cert_no: string;

  @IsString()
  @IsOptional()
  phone_no: string;

  @IsString()
  @IsOptional()
  req_tx: string;

  @IsString()
  @IsOptional()
  res_cd: string;

  @IsString()
  @IsOptional()
  res_msg: string;

  @IsIn(['Y', 'N'])
  safe_guard_yn: 'Y' | 'N';

  @IsString()
  @IsOptional()
  session_id: string;

  @IsString()
  sex_code: string;

  @IsString()
  site_cd: 'AKWH3';

  @IsString()
  site_key: string;

  @IsString()
  @IsOptional()
  tx_type: string;

  @IsString()
  @IsNotEmpty()
  up_hash: string;

  @IsString()
  @IsOptional()
  user_name: string;

  @IsString()
  @IsOptional()
  user_name_url_yn: string;

  @IsString()
  @IsOptional()
  van_sms_yn: string;

  @IsString()
  @IsOptional()
  van_tx_id: string;

  @IsString()
  web_siteid: string;

  @IsIn(['Y', 'N'])
  web_siteid_hashYN: 'Y' | 'N';

  @IsString()
  @IsOptional()
  year: string;

  @IsString()
  @IsOptional()
  site_url: string;

  @IsString()
  @IsOptional()
  server_hash: string;

  @IsString()
  @IsOptional()
  reg_dt: string;

  @IsString()
  @IsOptional()
  re_otp: string;

  @IsString()
  @IsOptional()
  param_opt_1: string;

  @IsString()
  @IsOptional()
  param_opt_2: string;

  @IsString()
  @IsOptional()
  param_opt_3: string;
}
