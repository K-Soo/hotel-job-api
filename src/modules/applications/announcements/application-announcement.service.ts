import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationAnnouncement } from './entities/application-announcement.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { ApplicationAnnouncementRecipient } from './entities/application-announcement-recipient.entity';
import { Recruitment } from '../../employers/recruitment/entities/recruitment.entity';
import { Application } from '../../applications/entities/application.entity';
import { AnnouncementType, ResultNotificationStatus, ReviewStageStatus } from '../../../common/constants/application';
import { NotificationService } from '../../../modules/notifications/notifications.service';
import { CategoryType, NotificationType } from '../../../common/constants/notification';

export class ApplicationAnnouncementService {
  constructor(
    @InjectRepository(ApplicationAnnouncement) private announcementRepo: Repository<ApplicationAnnouncement>,
    @InjectRepository(Recruitment) private readonly recruitmentRepo: Repository<Recruitment>,
    @InjectRepository(Application) private readonly applicationRepo: Repository<Application>,
    @InjectRepository(ApplicationAnnouncementRecipient)
    private readonly announcementRecipientRepo: Repository<ApplicationAnnouncementRecipient>,
    private readonly notificationService: NotificationService,
  ) {}

  /**
   * 합격자 or 불합격 발표
   */
  async createAnnouncement(createDto: CreateAnnouncementDto, userId: string): Promise<ApplicationAnnouncement> {
    const { title, message, announcementType, resultNotificationStatus, recruitmentId, recipientApplicationIds } =
      createDto;

    const recruitment = await this.recruitmentRepo.findOne({ where: { id: recruitmentId, employer: { id: userId } } });

    if (!recruitment) throw new Error('채용 공고를 찾을 수 없습니다.');

    const announcement = this.announcementRepo.create({
      title,
      message,
      announcementType,
      resultNotificationStatus,
      recruitment,
      announcedAt: new Date(),
      isSent: false,
    });

    await this.announcementRepo.save(announcement);

    const recipients: ApplicationAnnouncementRecipient[] = [];

    for (const appId of recipientApplicationIds) {
      const application = await this.applicationRepo.findOne({ where: { id: appId } });

      if (!application) continue;

      // 합격 발표 - 실제 지원자에게 보여지는 전형단계 업데이트
      if (announcementType === AnnouncementType.ACCEPT) {
        if (resultNotificationStatus === ResultNotificationStatus.DOCUMENT_PASS) {
          application.reviewStageStatus = ReviewStageStatus.INTERVIEW;
        }
        if (resultNotificationStatus === ResultNotificationStatus.INTERVIEW_PASS) {
          application.reviewStageStatus = ReviewStageStatus.INTERVIEW_PASS;
        }
        if (resultNotificationStatus === ResultNotificationStatus.FINAL_PASS) {
          application.reviewStageStatus = ReviewStageStatus.ACCEPT;
        }
      }

      // 불합격 발표 - 실제 지원자에게 보여지는 전형단계 업데이트
      if (announcementType === AnnouncementType.REJECT) {
        application.reviewStageStatus = ReviewStageStatus.REJECT;
      }

      // 지원자 상태 업데이트
      await this.applicationRepo.save(application);

      const isAccept = announcementType === AnnouncementType.ACCEPT;
      const acceptMessage = `${application.recruitmentSnapshot.hotelName}의 ${application.recruitmentSnapshot.recruitmentTitle} 포지션에 합격 발표가 있습니다.`;
      const rejectMessage = `${application.recruitmentSnapshot.hotelName}의 ${application.recruitmentSnapshot.recruitmentTitle} 포지션에 안타깝게도 합격되지 않았습니다.`;

      // 지원자에게 알림 전송
      await this.notificationService.sendNotification({
        category: CategoryType.APPLICANT,
        title: isAccept ? '합격 발표 🎉' : '불합격 발표',
        userIds: [application.applicantId],
        message: isAccept ? acceptMessage : rejectMessage,
        link: isAccept ? '/user/application/history' : '/user/application/history?status=reject',
        notificationType: [NotificationType.IN_APP, NotificationType.PUSH],
      });

      const recipient = this.announcementRecipientRepo.create({ announcement, application });
      recipients.push(recipient);
    }

    await this.announcementRecipientRepo.save(recipients);

    // 푸시 알림 & 인앱 알림 전송
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
