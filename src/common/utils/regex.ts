export const regex = {
	USER_ID: /^[a-z0-9_-]{5,20}$/,
	EMAIL: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
	PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[.,!@#$%&*])[a-zA-Z\d.,!@#$%&*]{8,20}$/,
	ALL_SPACE: /^[^\s]*$/,
	FIRST_SPACE: /^\S/, //첫번째글자 공백 체크
	LAST_SPACE: /\S$/, //마지막 글자 공백 체크
};
