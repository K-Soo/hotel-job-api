export const regex = {
  USER_ID: /^[a-z0-9_-]{8,16}$/,
  EMAIL: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, //8자 이상 16자 이하이어야 하며, 대소문자 알파벳, 숫자, 특수문자(@, $, !, %, *, ?, &)를 최소 1개씩 포함
  ALL_SPACE: /^[^\s]*$/,
  FIRST_SPACE: /^\S/, //첫번째글자 공백 체크
  LAST_SPACE: /\S$/, //마지막 글자 공백 체크
  TIME: /^(\d+)([smhd])$/, //숫자와 단위를 분리
  IMAGE_FILE: /^(image\/jpeg|image\/jpg|image\/png|image\/gif)$/, //이미지 파일
  NUMBER: /^\d+$/, //숫자만
  KOREAN: /^[가-힣]+$/, //한글
  GATHER: /^[^ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ]*$/, //모음 체크
  CONSONANT: /^[^ㄱ-ㅎ]*$/, //자음 체크
};

export const validationMessage = (text: string) => {
  return { message: `${text} Invalid format` };
};
