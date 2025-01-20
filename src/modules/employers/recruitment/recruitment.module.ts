import { Module, forwardRef } from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { RecruitmentController } from './recruitment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { Nationality } from './entities/nationality.entity';
import { CryptoModule } from '../../../providers/crypto/crypto.module';
import { EmployersModule } from '../employers.module';
import { Application } from '../../applications/entities/application.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Recruitment, Nationality]), CryptoModule, forwardRef(() => EmployersModule)],
  controllers: [RecruitmentController],
  providers: [RecruitmentService],
})
export class RecruitmentModule {}
