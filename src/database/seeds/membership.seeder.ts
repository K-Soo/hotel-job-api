import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Membership } from '../../modules/membership/entities/membership.entity';
import { MEMBERSHIP_SEEDER } from '../../common/constants/seeder';

export default class MembershipSeeder implements Seeder {
  async run(dataSource: DataSource, _: SeederFactoryManager): Promise<void> {
    const membershipRepository = dataSource.getRepository(Membership);

    await membershipRepository.upsert(MEMBERSHIP_SEEDER, ['membershipLevel']);
  }
}
