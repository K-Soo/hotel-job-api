/* eslint-disable prefer-const */
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import {
  RecruitmentProductType,
  RecruitmentProductName,
  RecruitmentProductOptionName,
  RecruitmentDuration,
  RecruitmentOptionTag,
} from '../../common/constants/product';
import { RecruitmentProduct } from '../../modules/products/entities/recruitment.entity';
import { RecruitmentProductOption } from '../../modules/products/entities/recruitment-option.entity';
import { RecruitmentProductOptionDuration } from '../../modules/products/entities/recruitment-option-duration.entity';
import { RecruitmentProductDuration } from '../../modules/products/entities/recruitment-duration.entity';

export default class RecruitmentMainProductSeeder implements Seeder {
  async run(dataSource: DataSource, _: SeederFactoryManager): Promise<void> {
    const productRepository = dataSource.getRepository(RecruitmentProduct);
    const optionRepository = dataSource.getRepository(RecruitmentProductOption);
    const durationRepository = dataSource.getRepository(RecruitmentProductDuration);
    const optionDurationRepository = dataSource.getRepository(RecruitmentProductOptionDuration);

    // 기존 데이터 삭제
    await productRepository.delete({ type: RecruitmentProductType.MAIN });

    console.log('✅ 기존 데이터 삭제 완료! 새로운 데이터 추가 시작...');

    // 상품 데이터 정의
    const PRODUCT = [
      {
        type: RecruitmentProductType.MAIN,
        name: RecruitmentProductName.PREMIUM,
        durations: [
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 168000, bonusDays: 4, discountRate: 0.2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 112000, bonusDays: 3, discountRate: 0.15 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 80000, bonusDays: 2, discountRate: 0.12 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 56000, bonusDays: 1, discountRate: 0.1 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 40000, discountRate: 0 },
          { duration: RecruitmentDuration.THREE_DAYS, price: 24000, discountRate: 0 },
        ],
        options: [
          {
            name: RecruitmentProductOptionName.LIST_UP,
            maxListUpPerDay: 4,
            listUpIntervalHours: 6,
            tags: [],
            optionDurations: [
              { duration: RecruitmentDuration.THREE_DAYS, price: 14700, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.FIVE_DAYS, price: 24500, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.SEVEN_DAYS, price: 34300, discountRate: 0.1, bonusDays: 1 },
              { duration: RecruitmentDuration.TEN_DAYS, price: 49000, discountRate: 0.1, bonusDays: 2 },
              { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 68600, discountRate: 0.1, bonusDays: 3 },
              { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 102900, discountRate: 0.1, bonusDays: 4 },
            ],
          },
          {
            name: RecruitmentProductOptionName.TAG,
            maxListUpPerDay: 0,
            listUpIntervalHours: 0,
            tags: [RecruitmentOptionTag.NEW, RecruitmentOptionTag.POPULAR, RecruitmentOptionTag.RECOMMENDED],
            optionDurations: [
              { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
              { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
              { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
              { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
            ],
          },
          {
            name: RecruitmentProductOptionName.HIGHLIGHT,
            tags: [],
            optionDurations: [
              { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
              { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
              { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
              { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
            ],
          },
          {
            name: RecruitmentProductOptionName.BOLD,
            tags: [],
            optionDurations: [
              { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
              { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
              { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
              { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
            ],
          },
        ],
      },
      {
        type: RecruitmentProductType.MAIN,
        name: RecruitmentProductName.SPECIAL,
        durations: [
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 126000, bonusDays: 4, discountRate: 0.2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 84000, bonusDays: 3, discountRate: 0.15 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 60000, bonusDays: 2, discountRate: 0.12 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 42000, bonusDays: 1, discountRate: 0.1 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 30000, discountRate: 0 },
          { duration: RecruitmentDuration.THREE_DAYS, price: 18000, discountRate: 0 },
        ],
        options: [
          {
            name: RecruitmentProductOptionName.LIST_UP,
            maxListUpPerDay: 4,
            listUpIntervalHours: 6,
            tags: [],
            optionDurations: [
              { duration: RecruitmentDuration.THREE_DAYS, price: 14700, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.FIVE_DAYS, price: 24500, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.SEVEN_DAYS, price: 34300, discountRate: 0.1, bonusDays: 1 },
              { duration: RecruitmentDuration.TEN_DAYS, price: 49000, discountRate: 0.1, bonusDays: 2 },
              { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 68600, discountRate: 0.1, bonusDays: 3 },
              { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 102900, discountRate: 0.1, bonusDays: 4 },
            ],
          },
          {
            name: RecruitmentProductOptionName.TAG,
            tags: [RecruitmentOptionTag.NEW, RecruitmentOptionTag.POPULAR, RecruitmentOptionTag.RECOMMENDED],
            optionDurations: [
              { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
              { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
              { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
              { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
            ],
          },
          {
            name: RecruitmentProductOptionName.HIGHLIGHT,
            tags: [],
            optionDurations: [
              { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
              { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
              { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
              { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
            ],
          },
          {
            name: RecruitmentProductOptionName.BOLD,
            tags: [],
            optionDurations: [
              { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
              { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
              { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
              { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
              { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
            ],
          },
        ],
      },
    ];

    for (const PRODUCT_ITEM of PRODUCT) {
      const existingProduct = await productRepository.findOne({
        where: { type: PRODUCT_ITEM.type, name: PRODUCT_ITEM.name },
      });

      if (existingProduct) {
        // 옵션 기간 삭제
        for (const option of existingProduct.options) {
          await optionDurationRepository.delete({ option: { id: option.id } });
        }
        // 기존 옵션 삭제
        await optionRepository.delete({ recruitmentProduct: existingProduct });

        // 기존 기간 삭제
        await durationRepository.delete({ recruitmentProduct: existingProduct });
      }

      // Step 1: 새 상품 생성
      const savedProduct = await productRepository.save(
        productRepository.create({
          type: PRODUCT_ITEM.type,
          name: PRODUCT_ITEM.name,
        }),
      );

      // Step 2: 상품 기간 추가
      for (const durationData of PRODUCT_ITEM.durations) {
        await durationRepository.save(
          durationRepository.create({
            recruitmentProduct: savedProduct,
            ...durationData,
          }),
        );
      }

      // Step 3: 옵션 추가
      for (const optionData of PRODUCT_ITEM.options) {
        const createdOptions = optionRepository.create({
          recruitmentProduct: savedProduct,
          name: optionData.name,
          maxListUpPerDay: optionData.maxListUpPerDay,
          listUpIntervalHours: optionData.listUpIntervalHours,
          tags: optionData.tags,
        });

        const savedOptions = await optionRepository.save(createdOptions);

        // Step 4: 옵션 기간 추가
        for (const optionDurationData of optionData.optionDurations) {
          const createdOptionsDuration = optionDurationRepository.create({
            option: savedOptions,
            ...optionDurationData,
          });

          await optionDurationRepository.save(createdOptionsDuration);
        }
      }
    }

    console.log('✅ Main page products with options and durations updated or seeded successfully!');
  }
}
