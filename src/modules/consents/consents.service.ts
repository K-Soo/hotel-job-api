import { Injectable } from '@nestjs/common';
import { CreateConsentDto } from './dto/create-consent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Consent } from './entities/consent.entity';
import { EntityManager, Repository } from 'typeorm';
import { Applicant } from '../applicants/entities/applicant.entity';
import { Employer } from '../employers/entities/employer.entity';
@Injectable()
export class ConsentsService {
  constructor(@InjectRepository(Consent) private readonly repo: Repository<Consent>) {}

  async createApplicantConsent(createConsentDto: CreateConsentDto, applicant: Applicant) {
    const consent = this.repo.create({ ...createConsentDto, applicant: applicant });

    return this.repo.save(consent);
  }

  async createEmployerConsent(createConsentDto: CreateConsentDto, employer: Employer, manager: EntityManager) {
    const consent = this.repo.create({ ...createConsentDto, employer: employer });

    return manager.save(Consent, consent);
  }

  findAll() {
    return this.repo.find({
      relations: ['applicant'],
    });
  }
}
