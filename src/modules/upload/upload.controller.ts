import {
  Controller,
  Post,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  Req,
  Res,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseFilePipe } from '@nestjs/common';
import { ProfileImageValidators } from '../../common/validations/file-validators';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { Request, Response } from 'express';
import { ResponseStatus } from '../../common/constants/responseStatus';
@ApiTags('Upload')
@ApiBearerAuth()
@UseGuards(PassportJwtGuard, RolesGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // @Post('resume/profile')
  // @ApiConsumes('multipart/form-data')
  // @Roles('JOB_SEEKER')
  // @ApiBody({
  //   description: 'Profile image file upload',
  //   schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } },
  // })
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadProfileImage(
  //   @Req() req: Request,
  //   @UploadedFile(new ParseFilePipe({ validators: ProfileImageValidators })) file: Express.Multer.File,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   const userUuid = req.user['sub'];

  //   // TODO - 엔티티 저장 후 저장되지않은 필드와 대조 후 일치하지않은 이미지 객체 전부삭제
  //   // await this.uploadService.deleteProfileImage(userUuid);

  //   // 새로운 프로필 이미지 업로드 및 키 반환
  //   const uploadedKey = await this.uploadService.uploadProfileImage(userUuid, file);

  //   // 업로드한 파일을 Blob 형태로 클라이언트에 반환
  //   await this.uploadService.sendFileAsBlob(res, uploadedKey);
  // }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Profile image file upload',
    schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } },
  })
  @Post('resume/profile')
  @Roles('JOB_SEEKER')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @Req() req: Request,
    @UploadedFile(new ParseFilePipe({ validators: ProfileImageValidators })) file: Express.Multer.File,
  ) {
    const userUuid = req.user['sub'];

    const uploadedKey = await this.uploadService.uploadProfileImage(userUuid, file);

    return { status: ResponseStatus.SUCCESS, key: uploadedKey };
  }

  @Get('resume/profile/:key')
  async getResumeProfileImage(@Param('key') key: string, @Req() req: Request, @Res() res: Response) {
    console.log('key: ', key);
    if (!key) {
      throw new BadRequestException();
    }
    const userUuid = req.user['sub'];

    const uploadedKey = `resources/resume/profile/${userUuid}-${key}`;

    await this.uploadService.sendFileAsBlob(res, uploadedKey);
  }
}
