import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { S3Module } from '../../providers/storage/s3.module';

@Module({
  imports: [S3Module],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
