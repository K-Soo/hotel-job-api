// src/database/seeds/membership.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { MembershipLevel } from '../../common/constants/membership';
import { Membership } from '../../modules/membership/entities/membership.entity';

const MAX_SCORE = 10000000000;

export default class MembershipSeeder implements Seeder {
  async run(dataSource: DataSource, _: SeederFactoryManager): Promise<void> {
    const membershipRepository = dataSource.getRepository(Membership);
    const memberships = [
      { membershipLevel: MembershipLevel.FAMILY, discountRate: 0.01, minScore: 0, maxScore: 100_000 }, // ~10만 원
      { membershipLevel: MembershipLevel.BRONZE, discountRate: 0.02, minScore: 100_001, maxScore: 300_000 }, // 10만 ~ 30만 원
      { membershipLevel: MembershipLevel.SILVER, discountRate: 0.03, minScore: 300_001, maxScore: 600_000 }, // 30만 ~ 60만 원
      { membershipLevel: MembershipLevel.GOLD, discountRate: 0.04, minScore: 600_001, maxScore: 1_000_000 }, // 60만 ~ 100만 원
      { membershipLevel: MembershipLevel.VIP, discountRate: 0.06, minScore: 1_000_001, maxScore: MAX_SCORE }, // 100만 원 초과
    ];

    for (const membership of memberships) {
      const exists = await membershipRepository.findOneBy({ membershipLevel: membership.membershipLevel });
      if (!exists) {
        await membershipRepository.save(membershipRepository.create(membership));
      }
    }
  }
}
