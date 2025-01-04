import { Body, Controller, Post } from '@nestjs/common';
import { VerificationsService } from './verifications.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmployerUserIdDto } from './dto/employer-user-id.dto';

@Controller('verifications')
export class VerificationsController {
  constructor(private readonly verificationsService: VerificationsService) {}

  @ApiOperation({ summary: '아이디 중복체크' })
  @ApiResponse({
    status: 200,
    description: '사용 가능 아이디 { status: "available" }, 중복 아이디 { status: "duplicate" }',
  })
  @Post('employer/user-id')
  async userId(@Body() body: EmployerUserIdDto) {
    const user = await this.verificationsService.findEmployerUserId(body.userId);
    if (!user) {
      return { status: 'available' };
    }
    return { status: 'duplicate' };
  }

  phone() {}

  email() {}
}
