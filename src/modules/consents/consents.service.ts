import { Injectable } from '@nestjs/common';
import { CreateConsentDto } from './dto/create-consent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Consent } from './entities/consent.entity';
import { Repository } from 'typeorm';
import { Applicant } from '../applicants/entities/applicant.entity';
@Injectable()
export class ConsentsService {
  constructor(@InjectRepository(Consent) private readonly repo: Repository<Consent>) {}

  async createApplicantConsent(createConsentDto: CreateConsentDto, applicant: Applicant) {
    const consent = this.repo.create({ ...createConsentDto, applicant: applicant });

    return this.repo.save(consent);
  }

  findAll() {
    return this.repo.find({
      relations: ['applicant'],
    });
  }
}
