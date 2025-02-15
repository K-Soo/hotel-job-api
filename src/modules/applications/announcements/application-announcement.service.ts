import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationAnnouncement } from './entities/application-announcement.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { ApplicationAnnouncementRecipient } from './entities/application-announcement-recipient.entity';
import { Recruitment } from '../../employers/recruitment/entities/recruitment.entity';
import { Application } from '../../applications/entities/application.entity';

export class ApplicationAnnouncementService {
  constructor(
    @InjectRepository(ApplicationAnnouncement) private announcementRepo: Repository<ApplicationAnnouncement>,
    @InjectRepository(Recruitment) private readonly recruitmentRepo: Repository<Recruitment>,
    @InjectRepository(Application) private readonly applicationRepo: Repository<Application>,
    @InjectRepository(ApplicationAnnouncementRecipient)
    private readonly announcementRecipientRepo: Repository<ApplicationAnnouncementRecipient>,
  ) {}

  /**
   * 합격자 or 불합격 발표
   */
  async createAnnouncement(createDto: CreateAnnouncementDto, userId: string): Promise<ApplicationAnnouncement> {
    const { title, message, announcementType, reviewStage, recruitmentId, recipientApplicationIds } = createDto;

    const recruitment = await this.recruitmentRepo.findOne({ where: { id: recruitmentId, employer: { id: userId } } });
    if (!recruitment) throw new Error('채용 공고를 찾을 수 없습니다.');

    const announcement = this.announcementRepo.create({
      title,
      message,
      announcementType,
      reviewStage,
      recruitment,
      announcedAt: new Date(),
      isSent: false,
    });

    await this.announcementRepo.save(announcement);

    const recipients: ApplicationAnnouncementRecipient[] = [];

    for (const appId of recipientApplicationIds) {
      const application = await this.applicationRepo.findOne({ where: { id: appId } });

      if (application) {
        const recipient = this.announcementRecipientRepo.create({ announcement, application });
        recipients.push(recipient);
      }
    }

    await this.announcementRecipientRepo.save(recipients);

    // // 📌 푸시 알림 & 인앱 알림 전송
    // await this.notificationService.sendAnnouncementNotifications(announcement.id);

    return announcement;
  }

  async getAnnouncementById(announcementId: number): Promise<ApplicationAnnouncement> {
    return this.announcementRepo.findOne({
      where: { id: announcementId },
      relations: ['recipients', 'recipients.application', 'recruitment'],
    });
  }
}
