import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TossService } from './toss.service';

@Module({
  imports: [HttpModule],
  providers: [TossService],
  exports: [TossService],
})
export class TossModule {}
