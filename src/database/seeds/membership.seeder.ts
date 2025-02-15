import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Membership } from '../../modules/membership/entities/membership.entity';
import { MEMBERSHIP_SEEDER } from '../../common/constants/seeder';

export default class MembershipSeeder implements Seeder {
  async run(dataSource: DataSource, _: SeederFactoryManager): Promise<void> {
    const membershipRepository = dataSource.getRepository(Membership);

    for (const membership of MEMBERSHIP_SEEDER) {
      const exists = await membershipRepository.findOneBy({ membershipLevel: membership.membershipLevel });
      if (!exists) {
        await membershipRepository.save(membershipRepository.create(membership));
      }
    }
  }
}
