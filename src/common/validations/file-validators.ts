import { MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { regex } from '../../common/utils/regex';

export const ProfileImageValidators = [
  new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024, message: '5MB 이하의 파일을 선택해주세요' }),
  new FileTypeValidator({ fileType: regex.IMAGE_FILE }),
];
