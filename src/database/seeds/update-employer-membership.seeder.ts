import { Seeder } from 'typeorm-extension';
import { DataSource, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Employer } from '../../modules/employers/entities/employer.entity';
import { Membership } from '../../modules/membership/entities/membership.entity';

export default class UpdateEmployerMembershipSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const employerRepository = dataSource.getRepository(Employer);
    const membershipRepository = dataSource.getRepository(Membership);

    if (process.env.NODE_ENV === 'production') {
      console.log('🚫 This seeder should NOT run in production.');
      return;
    }

    const employers = await employerRepository.find();

    for (const employer of employers) {
      const membership = await membershipRepository.findOne({
        where: {
          minScore: LessThanOrEqual(employer.totalScore),
          maxScore: MoreThanOrEqual(employer.totalScore),
        },
      });

      if (membership) {
        employer.membership = membership;
        await employerRepository.save(employer);
      }
    }

    console.log('All existing Employers have been assigned a Membership.');
  }
}
