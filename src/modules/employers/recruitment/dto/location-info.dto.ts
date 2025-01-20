import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LocationInfoDto {
  @ApiProperty({ description: '호텔명', example: '서울호텔' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  hotelName: string;

  @ApiProperty({ description: '객실 수', example: '홍길동' })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  roomCount: number;

  @ApiProperty({ description: '주소', example: '서울 특별시' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: '주소 상세', example: '서울특별시' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  addressDetail: string;
}
