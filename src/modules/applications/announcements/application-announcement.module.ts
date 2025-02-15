import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationAnnouncementController } from './application-announcement.controller';
import { ApplicationAnnouncementService } from './application-announcement.service';
import { ApplicationAnnouncement } from './entities/application-announcement.entity';
import { ApplicationAnnouncementRecipient } from './entities/application-announcement-recipient.entity';
import { Recruitment } from '../../employers/recruitment/entities/recruitment.entity';
import { Application } from '../entities/application.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationAnnouncement, ApplicationAnnouncementRecipient, Recruitment, Application]),
  ],
  controllers: [ApplicationAnnouncementController],
  providers: [ApplicationAnnouncementService],
  exports: [ApplicationAnnouncementService],
})
export class ApplicationAnnouncementModule {}
