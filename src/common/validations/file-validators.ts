import { MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { regex } from '../../common/utils/regex';

export const ProfileImageValidators = [
  new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
  new FileTypeValidator({ fileType: regex.IMAGE_FILE }),
];
