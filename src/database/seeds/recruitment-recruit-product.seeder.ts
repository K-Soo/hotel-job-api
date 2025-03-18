/* eslint-disable prefer-const */
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { RecruitmentProduct } from '../../modules/products/entities/recruitment.entity';
import { RecruitmentProductOption } from '../../modules/products/entities/recruitment-option.entity';
import { RecruitmentProductOptionDuration } from '../../modules/products/entities/recruitment-option-duration.entity';
import { RecruitmentProductDuration } from '../../modules/products/entities/recruitment-duration.entity';
import { RecruitmentProductType } from '../../common/constants/product';
import { RECRUIT_PRODUCT_SEEDER } from '../../common/constants/seeder';

export default class RecruitmentRecruitProductSeeder implements Seeder {
  async run(dataSource: DataSource, _: SeederFactoryManager): Promise<void> {
    const productRepository = dataSource.getRepository(RecruitmentProduct);
    const optionRepository = dataSource.getRepository(RecruitmentProductOption);
    const durationRepository = dataSource.getRepository(RecruitmentProductDuration);
    const optionDurationRepository = dataSource.getRepository(RecruitmentProductOptionDuration);

    // 기존 데이터 삭제
    await productRepository.delete({ type: RecruitmentProductType.RECRUIT });

    for (const PRODUCT_ITEM of RECRUIT_PRODUCT_SEEDER) {
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
