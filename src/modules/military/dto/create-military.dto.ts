import { IsDate, IsEnum, IsString, Length, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MilitaryStatus } from '../../../common/constants/app.enum';
import { Type } from 'class-transformer';

export class CreateMilitaryDto {
  @ApiProperty({
    description:
      '병역상태 (NONE: 미선택, NOT_APPLICABLE: 대상아님, COMPLETED: 군필, NOT_COMPLETED: 미필, EXEMPTED: 면제)',
    example: MilitaryStatus.NONE,
    enum: MilitaryStatus,
  })
  @IsEnum(MilitaryStatus, { message: 'result must be a valid MilitaryStatus value' })
  militaryStatus: MilitaryStatus;

  @ValidateIf((obj) => obj.militaryStatus === MilitaryStatus.EXEMPTED)
  @ApiProperty({ description: '면제사유(선택)', example: '(선택)' })
  @Length(1, 255, { message: 'Reason must be between 5 and 255 characters when exempted.' })
  @IsString()
  reason: string;

  @ApiProperty({ description: '입대일', example: '2023-12-15T01:00:00.000Z' })
  @ValidateIf((o) => o.enlistmentDate !== null)
  @Type(() => Date)
  @IsDate({ message: 'must be a valid ISO 8601 date in UTC format' })
  enlistmentDate: Date;

  @ApiProperty({ description: '제대일', example: '2023-12-15T01:00:00.000Z' })
  @ValidateIf((o) => o.dischargeDate !== null)
  @Type(() => Date)
  @IsDate({ message: 'must be a valid ISO 8601 date in UTC format' })
  dischargeDate: Date;
}
