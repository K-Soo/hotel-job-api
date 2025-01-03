import { Controller, Post, UseInterceptors, UseGuards, UploadedFile, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseFilePipe } from '@nestjs/common';
import { ProfileImageValidators } from '../../common/validations/file-validators';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { Request } from 'express';

@ApiTags('Upload')
@ApiBearerAuth()
@UseGuards(PassportJwtGuard, RolesGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('profile')
  @ApiConsumes('multipart/form-data')
  @Roles('JOB_SEEKER')
  @ApiBody({
    description: 'Profile image file upload',
    schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @Req() req: Request,
    @UploadedFile(new ParseFilePipe({ validators: ProfileImageValidators })) file: Express.Multer.File,
  ): Promise<{ url: string }> {
    const userUuid = req.user['sub'];

    // TODO - 엔티티 저장 후 저장되지않은 필드와 대조 후 일치하지않은 이미지 객체 전부삭제
    // await this.uploadService.deleteProfileImage(userUuid);

    const url = await this.uploadService.uploadProfileImage(userUuid, file);
    return { url };
  }
}
