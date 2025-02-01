import { BadRequestException, Injectable } from '@nestjs/common';
import { S3Service } from '../../providers/storage/s3.service';
import { ConfigService } from '@nestjs/config';
import { dateFormat } from '../../common/utils/dateFormat';
import { Response } from 'express';
import { customHttpException } from '../../common/constants/custom-http-exception';

@Injectable()
export class UploadService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  async uploadProfileImage(userUuid: string, file: Express.Multer.File): Promise<string> {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    const encodedFileName = encodeURIComponent(file.originalname);
    const CLOUD_FRONT_DOMAIN = 'https://cdn.hotel-job-connect.com';

    const currentDate = new Date();

    const key = `resources/resume/profile/${userUuid}_${currentDate.getTime()}_${encodedFileName}`;

    const uploadFile = await this.s3Service.uploadFile(bucketName, key, file);

    if (!uploadFile) {
      throw new BadRequestException(customHttpException.IMAGE_UPLOAD_FAILED);
    }

    return CLOUD_FRONT_DOMAIN + '/' + key;
  }

  async deleteProfileImage(userUuid: string) {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    const prefix = `resources/profiles/${userUuid}-`;

    const existingKeys = await this.s3Service.listFiles(bucketName, prefix);

    if (existingKeys.length === 0) {
      return;
    }

    return this.s3Service.deleteFiles(bucketName, existingKeys);
  }

  /** S3 Blob 데이터를 클라이언트로 반환 */
  async sendFileAsBlob(res: Response, key: string): Promise<void> {
    try {
      const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
      await this.s3Service.streamFile(res, bucketName, key);
    } catch (error) {
      console.error('파일 스트림 실패:', error);
      throw new BadRequestException('File Stream Failed');
    }
  }
}
