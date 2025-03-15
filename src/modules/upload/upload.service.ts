import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { S3Service } from '../../providers/storage/s3.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  async uploadProfileImage(userUuid: string, file: Express.Multer.File) {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    const CLOUD_FRONT_DOMAIN = 'https://cdn.hotel-job-connect.com';

    const fileExtension = file.originalname.split('.').pop();

    if (!fileExtension) {
      throw new BadRequestException(customHttpException.IMAGE_FORMAT_NOT_SUPPORTED);
    }

    const key = `resources/resume/profile/${uuidv4()}.${fileExtension}`;

    try {
      const uploadedKey = await this.s3Service.uploadFile(bucketName, key, file);

      if (!uploadedKey) {
        throw new BadRequestException(customHttpException.IMAGE_UPLOAD_FAILED);
      }

      return { uploadedKey: CLOUD_FRONT_DOMAIN + '/' + uploadedKey };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(customHttpException.IMAGE_UPLOAD_FAILED);
    }
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
