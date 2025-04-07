// /* eslint-disable prefer-const */
// import { Seeder, SeederFactoryManager } from 'typeorm-extension';
// import { DataSource } from 'typeorm';
// import { RecruitmentProductType } from '../../common/constants/product';
// import { RecruitmentProduct } from '../../modules/products/entities/recruitment.entity';
// import { RecruitmentProductOption } from '../../modules/products/entities/recruitment-option.entity';
// import { RecruitmentProductOptionDuration } from '../../modules/products/entities/recruitment-option-duration.entity';
// import { RecruitmentProductDuration } from '../../modules/products/entities/recruitment-duration.entity';
// import { MAIN_PRODUCT_SEEDER } from '../../common/constants/seeder';
// export default class RecruitmentMainProductSeeder implements Seeder {
//   async run(dataSource: DataSource, _: SeederFactoryManager): Promise<void> {
//     const productRepository = dataSource.getRepository(RecruitmentProduct);
//     const optionRepository = dataSource.getRepository(RecruitmentProductOption);
//     const durationRepository = dataSource.getRepository(RecruitmentProductDuration);
//     const optionDurationRepository = dataSource.getRepository(RecruitmentProductOptionDuration);

//     // 기존 데이터 삭제
//     await productRepository.delete({ type: RecruitmentProductType.MAIN });

//     console.log('✅ 기존 데이터 삭제 완료! 새로운 데이터 추가 시작...');

//     for (const PRODUCT_ITEM of MAIN_PRODUCT_SEEDER) {
//       const existingProduct = await productRepository.findOne({
//         where: { type: PRODUCT_ITEM.type, name: PRODUCT_ITEM.name },
//       });

//       if (existingProduct) {
//         // 옵션 기간 삭제
//         for (const option of existingProduct.options) {
//           await optionDurationRepository.delete({ option: { id: option.id } });
//         }
//         // 기존 옵션 삭제
//         await optionRepository.delete({ recruitmentProduct: existingProduct });

//         // 기존 기간 삭제
//         await durationRepository.delete({ recruitmentProduct: existingProduct });
//       }

//       // Step 1: 새 상품 생성
//       const savedProduct = await productRepository.save(
//         productRepository.create({
//           type: PRODUCT_ITEM.type,
//           name: PRODUCT_ITEM.name,
//         }),
//       );

//       // Step 2: 상품 기간 추가
//       for (const durationData of PRODUCT_ITEM.durations) {
//         await durationRepository.save(
//           durationRepository.create({
//             recruitmentProduct: savedProduct,
//             ...durationData,
//           }),
//         );
//       }

//       // Step 3: 옵션 추가
//       for (const optionData of PRODUCT_ITEM.options) {
//         const createdOptions = optionRepository.create({
//           recruitmentProduct: savedProduct,
//           name: optionData.name,
//           maxListUpPerDay: optionData.maxListUpPerDay,
//           listUpIntervalHours: optionData.listUpIntervalHours,
//           tags: optionData.tags,
//         });

//         const savedOptions = await optionRepository.save(createdOptions);

//         // Step 4: 옵션 기간 추가
//         for (const optionDurationData of optionData.optionDurations) {
//           const createdOptionsDuration = optionDurationRepository.create({
//             option: savedOptions,
//             ...optionDurationData,
//           });

//           await optionDurationRepository.save(createdOptionsDuration);
//         }
//       }
//     }

//     console.log('메인 페이지 상품, 옵션 데이터 추가 완료');
//   }
// }
