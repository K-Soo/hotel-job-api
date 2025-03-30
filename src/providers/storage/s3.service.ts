import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { S3_PROVIDER } from './s3.provider';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { PassThrough } from 'stream';
import { Response } from 'express';

@Injectable()
export class S3Service {
  constructor(@Inject(S3_PROVIDER) private readonly s3Client: S3Client) {}

  async getFileMetadata(bucketName: string, key: string) {
    try {
      const command = new HeadObjectCommand({
        Bucket: bucketName,
        Key: key,
      });

      const metadata = await this.s3Client.send(command);

      return {
        contentDisposition: metadata.ContentDisposition,
        contentType: metadata.ContentType,
        contentLength: metadata.ContentLength,
        lastModified: metadata.LastModified,
      };
    } catch (error) {
      this.logS3Error('getFileMetadata', error);
      throw new BadRequestException(customHttpException.IMAGE_METADATA_FETCH_FAILED);
    }
  }

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
        ContentDisposition: `inline; filename="${encodedFileName}"; filename*=UTF-8'`,
      });

      await this.s3Client.send(command);

      return key;
    } catch (error) {
      this.logS3Error('uploadFile', error);
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
      this.logS3Error('deleteFile', error);
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
      this.logS3Error('deleteFiles', error);
      throw new BadRequestException(customHttpException.IMAGE_DELETE_FAILED);
    }
  }

  /** S3 Blob 데이터를 스트림 처리하여 반환 */
  async streamFile(res: Response, bucketName: string, key: string): Promise<void> {
    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
      });

      const { Body, ContentType } = await this.s3Client.send(command);

      if (!Body) {
        throw new Error();
      }

      res.setHeader('Content-Type', ContentType || 'application/octet-stream');
      res.setHeader('Content-Disposition', 'inline');

      const passThrough = new PassThrough();
      (Body as NodeJS.ReadableStream).pipe(passThrough).pipe(res);
    } catch (error) {
      this.logS3Error('deleteFiles', error);
      throw new BadRequestException(customHttpException.IMAGE_DELETE_FAILED);
    }
  }

  private logS3Error(method: string, error: any) {
    console.error(`S3 Error in ${method}:`, {
      name: error.name,
      message: error.message,
    });
  }
}
