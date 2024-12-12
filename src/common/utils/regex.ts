export const regex = {
  USER_ID: /^[a-z0-9_-]{5,20}$/,
  EMAIL: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, //8자 이상 20자 이하이어야 하며, 대소문자 알파벳, 숫자, 특수문자(@, $, !, %, *, ?, &)를 최소 1개씩 포함
  ALL_SPACE: /^[^\s]*$/,
  FIRST_SPACE: /^\S/, //첫번째글자 공백 체크
  LAST_SPACE: /\S$/, //마지막 글자 공백 체크
};

export const validationMessage = (text: string) => {
  return { message: `${text} Invalid format` };
};
