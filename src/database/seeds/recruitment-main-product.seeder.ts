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

export default class RecruitmentMainProductSeeder implements Seeder {
  async run(dataSource: DataSource, _: SeederFactoryManager): Promise<void> {
    const productRepository = dataSource.getRepository(RecruitmentProduct);
    const optionRepository = dataSource.getRepository(RecruitmentProductOption);
    const durationRepository = dataSource.getRepository(RecruitmentProductDuration);
    const optionDurationRepository = dataSource.getRepository(RecruitmentProductOptionDuration);

    const products = [
      {
        type: RecruitmentProductType.MAIN,
        name: RecruitmentProductName.PREMIUM,
        discountRate: 0.2,
        durations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 50000, discountRate: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 80000, discountRate: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, bonusDays: 1, price: 120000, discountRate: 0 },
          { duration: RecruitmentDuration.TEN_DAYS, bonusDays: 2, price: 150000, discountRate: 0 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, bonusDays: 3, price: 200000, discountRate: 0 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, bonusDays: 4, price: 300000, discountRate: 0 },
        ],
        options: [
          {
            name: RecruitmentProductOptionName.LIST_UP,
            maxListUpPerDay: 4,
            listUpIntervalHours: 6,
            tags: [],
            optionDurations: [
              { duration: RecruitmentDuration.THREE_DAYS, price: 2000, discountRate: 0 },
              { duration: RecruitmentDuration.FIVE_DAYS, price: 3500, discountRate: 0 },
              { duration: RecruitmentDuration.SEVEN_DAYS, price: 5000, discountRate: 0 },
              { duration: RecruitmentDuration.TEN_DAYS, price: 7000, discountRate: 0 },
              { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 9000, discountRate: 0 },
              { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 15000, discountRate: 0 },
            ],
          },
          {
            name: RecruitmentProductOptionName.TAG,
            tags: [RecruitmentOptionTag.NEW, RecruitmentOptionTag.POPULAR, RecruitmentOptionTag.RECOMMENDED],
            optionDurations: [
              { duration: RecruitmentDuration.THREE_DAYS, price: 2000, discountRate: 0 },
              { duration: RecruitmentDuration.FIVE_DAYS, price: 3500, discountRate: 0 },
              { duration: RecruitmentDuration.SEVEN_DAYS, price: 5000, discountRate: 0 },
              { duration: RecruitmentDuration.TEN_DAYS, price: 7000, discountRate: 0 },
              { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 9000, discountRate: 0 },
              { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 15000, discountRate: 0 },
            ],
          },
          {
            name: RecruitmentProductOptionName.HIGHLIGHT,
            tags: [],
            optionDurations: [
              { duration: RecruitmentDuration.THREE_DAYS, price: 2000, discountRate: 0 },
              { duration: RecruitmentDuration.FIVE_DAYS, price: 3500, discountRate: 0 },
              { duration: RecruitmentDuration.SEVEN_DAYS, price: 5000, discountRate: 0 },
              { duration: RecruitmentDuration.TEN_DAYS, price: 7000, discountRate: 0 },
              { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 9000, discountRate: 0 },
              { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 15000, discountRate: 0 },
            ],
          },
        ],
      },
    ];

    for (const productData of products) {
      // Step 1: 상품 업데이트 또는 생성
      let product = await productRepository.findOneBy({ name: productData.name, type: productData.type });
      if (product) {
        // Update existing product
        product.discountRate = productData.discountRate;
        product = await productRepository.save(product);
      } else {
        // Create new product
        const productEntity = productRepository.create({
          type: productData.type,
          name: productData.name,
          discountRate: productData.discountRate,
        });
        product = await productRepository.save(productEntity);
      }

      // Step 2: 상품 기간 업데이트 또는 생성
      for (const durationData of productData.durations) {
        let duration = await durationRepository.findOneBy({
          recruitmentProduct: product,
          duration: durationData.duration,
        });

        if (duration) {
          // Update existing duration
          duration.price = durationData.price;
          duration.bonusDays = durationData.bonusDays || 0;
          await durationRepository.save(duration);
        } else {
          // Create new duration
          const durationEntity = durationRepository.create({
            recruitmentProduct: product,
            ...durationData,
          });
          await durationRepository.save(durationEntity);
        }
      }

      // Step 3: 옵션 업데이트 또는 생성
      for (const optionData of productData.options) {
        let option = await optionRepository.findOneBy({
          recruitmentProduct: product,
          name: optionData.name,
        });

        if (option) {
          // Update existing option
          option.maxListUpPerDay = optionData.maxListUpPerDay || 0;
          option.listUpIntervalHours = optionData.listUpIntervalHours || 0;
          option.tags = optionData.tags || null;
          await optionRepository.save(option);
        }

        if (!option) {
          // Create new option
          const optionEntity = optionRepository.create({
            recruitmentProduct: product,
            name: optionData.name,
            maxListUpPerDay: optionData.maxListUpPerDay || 0,
            listUpIntervalHours: optionData.listUpIntervalHours || 0,
            tags: optionData.tags || null,
          });
          option = await optionRepository.save(optionEntity);
        }

        // Step 4: 옵션 기간 업데이트 또는 생성
        if (optionData.optionDurations) {
          for (const optionDurationData of optionData.optionDurations) {
            // eslint-disable-next-line prefer-const
            let optionDuration = await optionDurationRepository.findOneBy({
              option: option,
              duration: optionDurationData.duration,
            });

            if (optionDuration) {
              // Update existing option duration
              optionDuration.price = optionDurationData.price;
              await optionDurationRepository.save(optionDuration);
            } else {
              // Create new option duration
              const optionDurationEntity = optionDurationRepository.create({
                option: option,
                ...optionDurationData,
              });
              await optionDurationRepository.save(optionDurationEntity);
            }
          }
        }
      }
    }

    console.log('Main page products with options and durations updated or seeded successfully!');
  }
}
