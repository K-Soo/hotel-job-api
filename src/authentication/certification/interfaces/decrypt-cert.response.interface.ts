import { CommType } from '../../../common/constants/app.enum';

export interface DecryptCertResponse {
  birth_day: string; //생년월일 (YYYYMMDD)
  ci: string; //특정 웹사이트가 타 웹사이트와의 제휴 사업을 수행할 경우, 동일 고객을 확인하기 위한 값
  ci_url: string;
  comm_id: CommType;
  di: string; //DI 중복가입 확인값 - 특정 웹 사이트 내에서 중복가입 및 내부회원 관리 시, 동일 고객을 확인하기 위한 값
  di_url: string;
  local_code: '01' | '02'; //내/외국인 정보: 01: 내국인, 02: 외국인
  phone_no: string;
  res_cd: string;
  res_msg: string;
  sex_code: '01' | '02';
  user_name: string;
  web_siteid: string;
}
