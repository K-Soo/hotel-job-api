/* eslint-disable prefer-const */
// src/database/seeds/main-page-product.seeder.ts
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

export default class RecruitmentRecruitProductSeeder implements Seeder {
  async run(dataSource: DataSource, _: SeederFactoryManager): Promise<void> {
    const productRepository = dataSource.getRepository(RecruitmentProduct);
    const optionRepository = dataSource.getRepository(RecruitmentProductOption);
    const durationRepository = dataSource.getRepository(RecruitmentProductDuration);
    const optionDurationRepository = dataSource.getRepository(RecruitmentProductOptionDuration);

    // 기존 데이터 삭제
    await productRepository.delete({ type: RecruitmentProductType.RECRUIT });

    const PRODUCT = [
      // 1일 4900
      {
        type: RecruitmentProductType.RECRUIT,
        name: RecruitmentProductName.SPECIAL,
        durations: [
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, bonusDays: 4, price: 102900, discountRate: 0.2 }, // 92,610원 적용
          { duration: RecruitmentDuration.FOURTEEN_DAYS, bonusDays: 3, price: 68600, discountRate: 0.15 }, // 61,740원 적용
          { duration: RecruitmentDuration.TEN_DAYS, bonusDays: 2, price: 49000, discountRate: 0.12 }, // 43,120원 적용
          { duration: RecruitmentDuration.SEVEN_DAYS, bonusDays: 1, price: 34300, discountRate: 0.1 }, // 30,870원 적용
          { duration: RecruitmentDuration.FIVE_DAYS, price: 24500, discountRate: 0 },
          { duration: RecruitmentDuration.THREE_DAYS, price: 14700, discountRate: 0 },
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
      // 1일 3900
      {
        type: RecruitmentProductType.RECRUIT,
        name: RecruitmentProductName.URGENT,
        durations: [
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, bonusDays: 4, price: 81900, discountRate: 0.2 }, // 73,710원 적용
          { duration: RecruitmentDuration.FOURTEEN_DAYS, bonusDays: 3, price: 54600, discountRate: 0.15 }, // 49,140원 적용
          { duration: RecruitmentDuration.TEN_DAYS, bonusDays: 2, price: 39000, discountRate: 0.12 }, // 34,320원 적용
          { duration: RecruitmentDuration.SEVEN_DAYS, bonusDays: 1, price: 27300, discountRate: 0.1 }, // 24,570원 적용
          { duration: RecruitmentDuration.FIVE_DAYS, price: 19500, discountRate: 0 },
          { duration: RecruitmentDuration.THREE_DAYS, price: 11700, discountRate: 0 },
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
      {
        type: RecruitmentProductType.RECRUIT,
        name: RecruitmentProductName.BASIC,
        durations: [
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, bonusDays: 0, price: 23000, discountRate: 0.1 }, // 20,700원 적용
          { duration: RecruitmentDuration.FOURTEEN_DAYS, bonusDays: 0, price: 15400, discountRate: 0.1 }, // 13,950원 적용
          { duration: RecruitmentDuration.TEN_DAYS, bonusDays: 0, price: 11000, discountRate: 0.1 }, // 9,900원 적용
        ],
        options: [
          {
            name: RecruitmentProductOptionName.LIST_UP,
            maxListUpPerDay: 4,
            listUpIntervalHours: 6,
            tags: [],
            optionDurations: [
              { duration: RecruitmentDuration.THREE_DAYS, price: 14700, discountRate: 0.1 },
              { duration: RecruitmentDuration.FIVE_DAYS, price: 24500, discountRate: 0.1 },
              { duration: RecruitmentDuration.SEVEN_DAYS, price: 34300, discountRate: 0.1 },
              { duration: RecruitmentDuration.TEN_DAYS, price: 49000, discountRate: 0.1 },
              { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 68600, discountRate: 0.1 },
              { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 102900, discountRate: 0.1 },
            ],
          },
          {
            name: RecruitmentProductOptionName.TAG,
            tags: [RecruitmentOptionTag.NEW, RecruitmentOptionTag.POPULAR, RecruitmentOptionTag.RECOMMENDED],
            optionDurations: [
              { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1 },
              { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1 },
              { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1 },
              { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1 },
              { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1 },
              { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1 },
            ],
          },
          {
            name: RecruitmentProductOptionName.HIGHLIGHT,
            tags: [],
            optionDurations: [
              { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1 },
              { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1 },
              { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1 },
              { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1 },
              { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1 },
              { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1 },
            ],
          },
          {
            name: RecruitmentProductOptionName.BOLD,
            tags: [],
            optionDurations: [
              { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1 },
              { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1 },
              { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1 },
              { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1 },
              { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1 },
              { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1 },
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
        const option = await optionRepository.save(
          optionRepository.create({
            recruitmentProduct: savedProduct,
            name: optionData.name,
            maxListUpPerDay: optionData.maxListUpPerDay,
            listUpIntervalHours: optionData.listUpIntervalHours,
            tags: optionData.tags,
          }),
        );

        // Step 4: 옵션 기간 추가
        for (const optionDurationData of optionData.optionDurations) {
          await optionDurationRepository.save(
            optionDurationRepository.create({
              option: option,
              ...optionDurationData,
            }),
          );
        }
      }
    }

    console.log('Main page products with options and durations updated or seeded successfully!');
  }
}
