import { Injectable } from '@nestjs/common';
import { S3Service } from '../../providers/storage/s3.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  async uploadProfileImage(userUuid: string, file: Express.Multer.File): Promise<string> {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    const encodedFileName = encodeURIComponent(file.originalname);
    const key = `resources/profiles/${userUuid}-${Date.now()}-${encodedFileName}`;

    return this.s3Service.uploadFile(bucketName, key, file);
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
}
