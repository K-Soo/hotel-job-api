import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { S3_PROVIDER } from './s3.provider';
import { customHttpException } from '../../common/constants/custom-http-exception';

@Injectable()
export class S3Service {
  constructor(@Inject(S3_PROVIDER) private readonly s3Client: S3Client) {}

  async listFiles(bucket: string, prefix: string): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
    });

    const response = await this.s3Client.send(command);
    return response.Contents?.map((item) => item.Key) || [];
  }

  async uploadFile(bucketName: string, key: string, file: Express.Multer.File) {
    const encodedFileName = encodeURIComponent(file.originalname);

    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentDisposition: `attachment; filename="${encodedFileName}"; filename*=UTF-8'`,
      });

      await this.s3Client.send(command);
      return `https://${bucketName}.s3.amazonaws.com/${key}`;
    } catch (error) {
      console.log(`s3 error:  ${error.name}-${error.message}`);
      throw new BadRequestException(customHttpException.IMAGE_UPLOAD_FAILED);
    }
  }

  async deleteFile(bucket: string, key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      });

      await this.s3Client.send(command);

      return { status: 'success' };
    } catch (error) {
      console.log(`s3 error:  ${error.name}-${error.message}`);
      throw new BadRequestException(customHttpException.IMAGE_DELETE_FAILED);
    }
  }
  async deleteFiles(bucket: string, keys: string[]): Promise<void> {
    try {
      const command = new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: {
          Objects: keys.map((key) => ({ Key: key })),
        },
      });

      await this.s3Client.send(command);
    } catch (error) {
      console.log(`s3 error:  ${error.name}-${error.message}`);
      throw new BadRequestException(customHttpException.IMAGE_DELETE_FAILED);
    }
  }
}
