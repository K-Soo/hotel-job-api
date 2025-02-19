import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApplicationAnnouncementService } from './application-announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PassportJwtGuard } from '../../../authentication/auth/guards/passport-jwt.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/metadata/roles.decorator';
import { Request } from 'express';

@ApiBearerAuth()
@UseGuards(PassportJwtGuard, RolesGuard)
@Roles('EMPLOYER')
@Controller('applications/announcements')
export class ApplicationAnnouncementController {
  constructor(private readonly announcementService: ApplicationAnnouncementService) {}

  @Get(':id')
  async getAnnouncement(@Param('id') id: number) {
    return this.announcementService.getAnnouncementById(id);
  }

  @ApiOperation({ summary: '합격자 발표' })
  @Post()
  async createAnnouncement(@Req() req: Request, @Body() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementService.createAnnouncement(createAnnouncementDto, req.user['sub']);
  }
}
