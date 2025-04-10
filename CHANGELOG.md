# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.7.2](https://github.com/K-Soo/hotel-job-api/compare/v1.7.1...v1.7.2) (2025-04-09)


### Features

* 불필요한 import 문 제거 및 코드 정리 ([e25406f](https://github.com/K-Soo/hotel-job-api/commit/e25406ff419e8ee98e8841a80e1e5ab45a1a78d5))
* 사용자 미발견 예외 메시지 수정 및 관련 상수 추가 ([fbb4340](https://github.com/K-Soo/hotel-job-api/commit/fbb4340daf1f1dae9f42efc85daeac1af6925141))
* 이메일 인증 테이블 생성 마이그레이션 추가 ([95eff44](https://github.com/K-Soo/hotel-job-api/commit/95eff44ef572c04b3a323b8ae59160725a773de2))
* createCoupon 메서드에서 employerUserId 필드 제거 ([3613bcf](https://github.com/K-Soo/hotel-job-api/commit/3613bcf3b995e0b04d7078b16952850cdbe87f6b))

### [1.7.1](https://github.com/K-Soo/hotel-job-api/compare/v1.7.0...v1.7.1) (2025-04-07)

## [1.7.0](https://github.com/K-Soo/hotel-job-api/compare/v1.6.0...v1.7.0) (2025-04-07)


### Features

* 채용 상품 목록 조회에서 쿼리 파라미터 제거 및 고정 타입 사용 ([348d098](https://github.com/K-Soo/hotel-job-api/commit/348d098900d6466391f5cd4086004fcd8b3f560e))
* 채용 상품 목록 API에서 쿼리 파라미터 및 응답 관련 데코레이터 제거 ([f65d4a7](https://github.com/K-Soo/hotel-job-api/commit/f65d4a73ec366b3f01dac3fb608269ed92b651b0))
* 채용 서비스에 교육 조건, 방 개수, 근무일 및 근무 시간 필드 추가 ([5278895](https://github.com/K-Soo/hotel-job-api/commit/5278895fc539f3cf73b559d408f0cb5a38aa3020))
* RecruitmentProductQueryDto 파일 삭제 및 관련 타입 제거 ([ce2143f](https://github.com/K-Soo/hotel-job-api/commit/ce2143f69ccbd17022361708b7ef66e801e119aa))
* RecruitQueryDto에서 상품 타입 필드 제거 및 관련 서비스 수정 ([89d65e7](https://github.com/K-Soo/hotel-job-api/commit/89d65e7e52e408982e9e1d4772d55fedd03b0868))


### Updates

* merge ([05afe87](https://github.com/K-Soo/hotel-job-api/commit/05afe87a2b5125f087ab8f41d691e789b3d4bcd7))

## [1.6.0](https://github.com/K-Soo/hotel-job-api/compare/v1.5.6...v1.6.0) (2025-04-07)


### Features

* 불필요한 파일 및 코드 제거 및 제품 서비스 로직 간소화 ([6c4cf66](https://github.com/K-Soo/hotel-job-api/commit/6c4cf6611fc264175d822b632189eb31e299ce91))
* 이메일 인증 관련 템플릿 및 DTO 파일 삭제 ([429ef73](https://github.com/K-Soo/hotel-job-api/commit/429ef733363f7974bb089527ad2304ae8a032435))
* 이메일 인증 템플릿 경로를 assets에 추가 ([63c4635](https://github.com/K-Soo/hotel-job-api/commit/63c4635a3c512cb36832bb17def73a582a611a73))
* 이메일 인증 템플릿 디렉토리 경로 수정 및 핸들바 어댑터 설정 추가 ([84dc306](https://github.com/K-Soo/hotel-job-api/commit/84dc3065b247619ba5c3c80c5123b8ff196fccbb))
* 이메일 인증 템플릿 추가 ([0df458a](https://github.com/K-Soo/hotel-job-api/commit/0df458a9fef8175bcdf1b08fe6b9766f2d88b05a))
* 이메일 인증 템플릿을 Handlebars로 변경하고 관련 파일 정리 ([6c62f40](https://github.com/K-Soo/hotel-job-api/commit/6c62f40b473c28bfb7203b45bf572d6b53bf4f93))
* 채용 상품 목록 조회에서 쿼리 매개변수 제거 및 기본 타입 설정 ([03c5b02](https://github.com/K-Soo/hotel-job-api/commit/03c5b028a83c36246a7d8b34280cd148151f9cfc))
* 채용 상품 목록 API에서 불필요한 인증 및 메타데이터 제거 ([075cbc4](https://github.com/K-Soo/hotel-job-api/commit/075cbc4c8d774a21292cdb5327682bf55a6555d4))
* 채용 상품 시더 코드 주석 처리 ([97b6b40](https://github.com/K-Soo/hotel-job-api/commit/97b6b40b9852455a44d5aff0da79474c0db34277))
* 채용 상품 시더에 프리미엄 상품 및 옵션 추가 ([34f63cd](https://github.com/K-Soo/hotel-job-api/commit/34f63cdaf790b48fa4320069f6c6dea45c20fa9d))
* 채용 상품 쿼리 DTO에서 상품 타입 관련 코드 제거 ([e4cbe4f](https://github.com/K-Soo/hotel-job-api/commit/e4cbe4ff6583fe1090db5630b1307b006fb3382a))
* 채용 상품 API에서 쿼리 매개변수에서 타입 제거 및 결제 타입 수정 ([f23d6b2](https://github.com/K-Soo/hotel-job-api/commit/f23d6b262eb24d8483fefd45a7f637087bacb20c))
* Dockerfile 개선 및 프로덕션 빌드 단계 추가 ([706e34e](https://github.com/K-Soo/hotel-job-api/commit/706e34e79443861c46079f52694f8d32b886701d))
* nest-cli.json에서 자산 포함 규칙 수정 ([62e34c8](https://github.com/K-Soo/hotel-job-api/commit/62e34c84d6efbb4638645caef031ccb2ca6622a0))

### [1.5.6](https://github.com/K-Soo/hotel-job-api/compare/v1.5.5...v1.5.6) (2025-04-03)


### Features

* 도커 컨텍스트에 .hbs 포함 여부 확인 단계 추가 ([245abb4](https://github.com/K-Soo/hotel-job-api/commit/245abb469ade1ae19e9fb43a1636951000427427))


### Chore

* remove dependency installation step from deploy workflow ([41ae5de](https://github.com/K-Soo/hotel-job-api/commit/41ae5de33172090a8a5c7b078515856c9790062e))

### [1.5.5](https://github.com/K-Soo/hotel-job-api/compare/v1.5.4...v1.5.5) (2025-04-03)


### Features

* 도커 컨텍스트에 .hbs 포함 여부 확인 작업 추가 ([b8ae8da](https://github.com/K-Soo/hotel-job-api/commit/b8ae8daf0bfa2939855a4b2ef6f49b5d7549ac80))
* EJS 템플릿 추가 및 이메일 인증 기능 개선 ([595b08a](https://github.com/K-Soo/hotel-job-api/commit/595b08a0b92c8b39fcce1098ed0c15026069ad5e))

### [1.5.4](https://github.com/K-Soo/hotel-job-api/compare/v1.5.3...v1.5.4) (2025-04-03)


### Features

* .hbs 파일 포함 여부 확인 및 dist 구조 출력 추가 ([c35738e](https://github.com/K-Soo/hotel-job-api/commit/c35738e8d392bf559bae3a86d0dd653d1ba59db6))

### [1.5.3](https://github.com/K-Soo/hotel-job-api/compare/v1.5.2...v1.5.3) (2025-04-03)


### Features

* .hbs 파일 존재 여부 확인 및 오류 메시지 추가 ([d8b56dc](https://github.com/K-Soo/hotel-job-api/commit/d8b56dc4c36ae2e893b5dc95332b20c59760291f))


### Chore

* .dockerignore에서 dist 항목 제거 및 Dockerfile에서 curl 설치 주석 제거 ([2a8ee5d](https://github.com/K-Soo/hotel-job-api/commit/2a8ee5d07b14fd4a0051d17d24f8e2d0ca4af479))

### [1.5.2](https://github.com/K-Soo/hotel-job-api/compare/v1.5.1...v1.5.2) (2025-04-02)


### Features

* 데이터베이스 연결 타임아웃 증가 및 이메일 검증 테이블 생성 마이그레이션 추가 ([e87f931](https://github.com/K-Soo/hotel-job-api/commit/e87f93175d90e74c09f5f1f154206a49be73dfad))
* 이메일 템플릿 디렉토리 존재 여부 확인 및 오류 처리 추가 ([472b3bc](https://github.com/K-Soo/hotel-job-api/commit/472b3bcaaf20a9fe3860c9cd5520d73739be7d03))

### [1.5.1](https://github.com/K-Soo/hotel-job-api/compare/v1.5.0...v1.5.1) (2025-04-02)


### Features

* 계정 인증을 위한 사용자 이름 및 이메일 찾기 기능 추가 ([bf8d2b5](https://github.com/K-Soo/hotel-job-api/commit/bf8d2b5080172e5f660d08b55bdbb5f0e7da216f))
* 계정 인증을 위한 DTO 추가 (사용자 이름 및 이메일 필드 포함) ([78de7a6](https://github.com/K-Soo/hotel-job-api/commit/78de7a6d2bd8d9ce454edefd49eff690fc5b62ed))
* 관리자 이메일 조회 기능 추가 ([750d901](https://github.com/K-Soo/hotel-job-api/commit/750d901b92b88fe70f3e66b677429148fda6ed40))
* 라이센스 및 사용 안내 문서 추가 ([2110502](https://github.com/K-Soo/hotel-job-api/commit/2110502c0698401c1c2acb68beee1752061727b8))
* 새로운 IsTrue 데코레이터 추가 ([4ccf016](https://github.com/K-Soo/hotel-job-api/commit/4ccf016b67772ea63ab3909f2d0c4b889c48d389))
* 이력서 필드 업데이트 및 이메일 검증 관련 마이그레이션 파일 삭제 ([ddd0a37](https://github.com/K-Soo/hotel-job-api/commit/ddd0a3767256bcbb37578535ce19705d52322f1c))
* 이메일 발송 기능을 위한 MailModule 추가 및 설정 구성 ([7f440fd](https://github.com/K-Soo/hotel-job-api/commit/7f440fd1c3a722f2368540109d6fc31cdce0b61d))
* 이메일 인증 기능 개선 및 새로운 API 엔드포인트 추가 ([b5c48d8](https://github.com/K-Soo/hotel-job-api/commit/b5c48d81dc0bbf944116edfe621a7148bf871c1a))
* 이메일 인증 기능 추가 및 관련 DTO, 서비스, 엔티티 구현 ([92f6f0e](https://github.com/K-Soo/hotel-job-api/commit/92f6f0e538beaac8dcabd8928d1d611a8bd2c435))
* 이메일 인증 모듈 추가 및 관련 데이터베이스 마이그레이션 구현 ([cffdd2b](https://github.com/K-Soo/hotel-job-api/commit/cffdd2bd466da8181f759eff97f0d4ef2d484d86))
* 이메일 인증 발송 기능을 위한 EmailVerificationMailer 서비스 추가 ([7320481](https://github.com/K-Soo/hotel-job-api/commit/73204815faaa797993f449719c7677b34665c019))
* 이메일 인증 요청 DTO에 사용자 이름 및 리다이렉트 URL 필드 추가 ([5f806a4](https://github.com/K-Soo/hotel-job-api/commit/5f806a4b9a9fa6b7d11b371dbb9ceb6e945717e0))
* 이메일 인증 템플릿 및 관련 상수 추가 ([4e7ffa7](https://github.com/K-Soo/hotel-job-api/commit/4e7ffa751a99647acda52c7011f29736b0793360))
* 이메일 인증을 위한 템플릿 추가 ([80ad82b](https://github.com/K-Soo/hotel-job-api/commit/80ad82bef7a61db12b1424f075c9dfa055de21c2))
* AES 암호화 메서드에 대한 주석 추가 및 오류 처리 개선 ([fa4bd0f](https://github.com/K-Soo/hotel-job-api/commit/fa4bd0f85552467074d5f9a3c46ef2d98421ab99))
* AuthModule을 알림 모듈에 추가 ([2588578](https://github.com/K-Soo/hotel-job-api/commit/258857830718782233c075d9635a0b54c56ea0bc))
* MailService 추가하여 이메일 발송 기능 구현 ([9167059](https://github.com/K-Soo/hotel-job-api/commit/91670598dfa86f05eb0543eb2dcbbfc4d6f3e9a9))
* nest-cli 및 package.json 수정하여 핸들바 자산 지원 추가 ([3b87c59](https://github.com/K-Soo/hotel-job-api/commit/3b87c59d357a09b02005024bb21c995a80cf56e0))


### Bug Fixes

* 데이터베이스 마이그레이션 경로 수정 ([db7bc1f](https://github.com/K-Soo/hotel-job-api/commit/db7bc1ff588c8145615a6600d88e5042a8887f9a))
* 데이터베이스 마이그레이션 경로 오타 수정 ([7e665f7](https://github.com/K-Soo/hotel-job-api/commit/7e665f7a21a5012571dc7cea2c7931376ab30866))
* 데이터베이스 마이그레이션 충돌 해결 전략 수정 ([1333904](https://github.com/K-Soo/hotel-job-api/commit/1333904a83c4809b57611aca5a8d6405b31a85ee))


### Refactors

* 데이터베이스 구성에서 synchronize 옵션을 false로 변경 ([04790cc](https://github.com/K-Soo/hotel-job-api/commit/04790cca333deac43145d1cb8054c5ed08259357))
* 데이터베이스 마이그레이션 충돌 해결 전략 변경 ([0e1db3b](https://github.com/K-Soo/hotel-job-api/commit/0e1db3b2d74ba8b09c51cdbb0e52e7c51da3405a))
* 모집 서비스에 교육 조건 및 근무 정보 필드 추가 ([c571f93](https://github.com/K-Soo/hotel-job-api/commit/c571f9309941544fd48d938a96be82f58592af20))
* 불필요한 마이그레이션 파일 삭제 ([0e7986d](https://github.com/K-Soo/hotel-job-api/commit/0e7986d28dee4be3de757ad8b36988aec60fe3ab))
* 암호 해독 오류 처리 방식을 개선 ([89c0f07](https://github.com/K-Soo/hotel-job-api/commit/89c0f07da07ef2584a04e738822a7eee1945ccea))
* 진행중인 모집만 필터링하도록 쿼리 수정 ([31f8d80](https://github.com/K-Soo/hotel-job-api/commit/31f8d809c0f34eb065efe89fbd5a524c524cf6b8))
* IsTrue 데코레이터의 경로를 수정 ([22e8133](https://github.com/K-Soo/hotel-job-api/commit/22e8133d6ec83c712bfa4a222b3ae3a545b03d12))
* IsTrue 데코레이터의 경로를 수정 ([d87d48e](https://github.com/K-Soo/hotel-job-api/commit/d87d48e8dfcc8d09ff574a7bec246f66beb1e5aa))
* RecruitQueryDto에서 job 필드의 ArrayMaxSize 유효성 검사 주석 처리 ([d0f4a5e](https://github.com/K-Soo/hotel-job-api/commit/d0f4a5ea1e48ba71953eb1e6548acd4cbe652b6a))
* S3Service에서 메타데이터 로그 출력 제거 ([1003870](https://github.com/K-Soo/hotel-job-api/commit/1003870fb863da20c6ec10ef6445069038ffeb4d))

## [1.5.0](https://github.com/K-Soo/hotel-job-api/compare/v1.4.2...v1.5.0) (2025-03-26)


### Features

* PaymentService에 로깅 기능 추가 및 결제 정보 검증 강화 ([4a7d7c5](https://github.com/K-Soo/hotel-job-api/commit/4a7d7c572079b86b9de6ea75ef9eb6556a89cbbc))


### Bug Fixes

* 쿠폰 발급 알림 제목을 '쿠폰'으로 수정 ([84c315f](https://github.com/K-Soo/hotel-job-api/commit/84c315f1530e71ea581f4fbc204579f9310db00e))
* PaymentService에서 결제 정보가 없을 경우 null 대신 undefined 반환 ([30f3909](https://github.com/K-Soo/hotel-job-api/commit/30f3909f320023b5b9ef8d5dee8bd53e255a7029))
* PaymentService에서 recruitmentPayments가 없거나 비어있을 경우 에러 로깅 추가 ([307b059](https://github.com/K-Soo/hotel-job-api/commit/307b0590472da1d8326e63a833d24bb51c77ff03))
* PaymentService에서 recruitmentPayments가 없을 경우 에러 로깅 추가 ([8f75661](https://github.com/K-Soo/hotel-job-api/commit/8f75661ee4f8d15963f357d152cacf9211f3a89c))


### Refactors

* 인앱 알림 전송 주석 수정 및 모집 서비스에 새로운 필드 추가 ([b3b86e0](https://github.com/K-Soo/hotel-job-api/commit/b3b86e008bccf33d154462de1082b69cbd8af0d7))
* makefile에서 불필요한 주석 및 마이그레이션 관련 명령어 제거 ([f017235](https://github.com/K-Soo/hotel-job-api/commit/f017235faea22655857e71731bd697a1121ae6bb))
* NotificationGateway에서 console.log를 logger로 변경 및 사용자 소켓 ID 처리 개선 ([883c200](https://github.com/K-Soo/hotel-job-api/commit/883c2001060667682e8d6c32ef41a0f4fe89b72a))
* PaymentService에서 불필요한 로그 제거 및 결과 필터링 추가 ([33c4a00](https://github.com/K-Soo/hotel-job-api/commit/33c4a004fb5cefed662509884d6cb9d4ddbca895))
* sendPushNotification 메서드 이름을 firebaseSendEachForMulticast로 변경 ([4074373](https://github.com/K-Soo/hotel-job-api/commit/4074373518c2e6e88ab8499ce67b40313297f172))
* sendPushNotification 메서드를 firebaseSendEachForMulticast로 변경 ([cf6b698](https://github.com/K-Soo/hotel-job-api/commit/cf6b6984b66492224dcf0199bfa3156691155bea))

### [1.4.2](https://github.com/K-Soo/hotel-job-api/compare/v1.4.1...v1.4.2) (2025-03-24)


### Features

* account_history 테이블의 제약 조건 및 컬럼 업데이트 ([d8c6c7b](https://github.com/K-Soo/hotel-job-api/commit/d8c6c7b607b99ca6071c4e7a7ee25058a8663b36))
* RecruitService에 isListUp 및 listUpCount 필드 추가 ([d2bf1ac](https://github.com/K-Soo/hotel-job-api/commit/d2bf1ac3fbcdea277cab3784bda29d8e23932ebb))


### Updates

* 마이그레이션 - 인증관련 이넘값 변경 [skip ci] ([d8fd0bc](https://github.com/K-Soo/hotel-job-api/commit/d8fd0bc577735aa604d50d95bd9a7fba9203293f))
* 쿠폰 알림 링크를 '/employer'로 수정 ([89396cc](https://github.com/K-Soo/hotel-job-api/commit/89396ccd886c81fd033299558c56d48e83a2eb54))
* account with payment migration ([7c79a12](https://github.com/K-Soo/hotel-job-api/commit/7c79a12d32b617aef16bb1217c1dbaf509f22836))
* cascade 옵션을 onDelete: 'SET NULL'로 변경 ([b603678](https://github.com/K-Soo/hotel-job-api/commit/b6036785d6d705ba4a42ba9618bb1dc4567ae4fb))


### Refactors

* 결제 관련 엔티티 수정, nullable 속성 추가 및 불필요한 코드 제거 ([40e2174](https://github.com/K-Soo/hotel-job-api/commit/40e2174deb204d3ac62228e5146f607e844ef1f6))
* 계정 상태 설명 수정 및 삭제 요청 상태 추가 ([88d4cb5](https://github.com/K-Soo/hotel-job-api/commit/88d4cb524216eba3ced185da86f0a06acb3ebbb3))
* 계정 상태 처리 로직 추가 및 인증 유효성 검사 개선 ([b9f4e44](https://github.com/K-Soo/hotel-job-api/commit/b9f4e440ee57a64b65ab9a3dbfb0cf21a1db8b5a))
* 계정 상태에 WITHDRAW 및 INACTIVE 추가 예외 처리 ([6e2dbdf](https://github.com/K-Soo/hotel-job-api/commit/6e2dbdfef19e8feccd90bdc11055f35564976b8d))
* 고용주 ID 참조 수정 및 로깅 추가 ([d95ffe0](https://github.com/K-Soo/hotel-job-api/commit/d95ffe03259a7284f8dd3beec74c85a57b909bda))
* 리스트업 횟수 제한 로직 주석 처리 ([62a0ebc](https://github.com/K-Soo/hotel-job-api/commit/62a0ebce5377d5fac4d3758f7912b1b90000508a))
* 불필요한 주석 제거 및 계정 이력 관련 엔티티와 서비스 개선 ([60ce4ff](https://github.com/K-Soo/hotel-job-api/commit/60ce4ffdef53efb5f6746242360f8ff89d3cba1d))
* 사업자 계정 삭제 로직 개선 및 푸시 서비스 통합 ([40c04ba](https://github.com/K-Soo/hotel-job-api/commit/40c04bae991a08b4e23ce4f67fc7f4f5ef173698))
* 사용자 탈퇴 로직 개선 및 푸시 서비스 통합 ([878b124](https://github.com/K-Soo/hotel-job-api/commit/878b12439a247c6e721874b35e5377017c35b8e9))
* 응답 상태에 NOT_FOUND 추가 ([95555fe](https://github.com/K-Soo/hotel-job-api/commit/95555fedcf87c057ec70bae95da7206aa48f7361))
* 이력서 엔티티 및 서비스 개선, 불필요한 코드 제거 및 예외 처리 추가 ([acc11a3](https://github.com/K-Soo/hotel-job-api/commit/acc11a3477a39e22272df4a8857d08ffaebd7c3b))
* 인증 관련 로직 개선 및 null 처리 추가 ([c391fbb](https://github.com/K-Soo/hotel-job-api/commit/c391fbb07a2c9fcd098c4a7b1cc3d124a229afe8))
* 조건 엔티티에서 Resume 관계의 cascade 옵션 제거 ([daea05f](https://github.com/K-Soo/hotel-job-api/commit/daea05ff6158ee1aa147cb7c2f671309ecc75119))
* 지원자 엔티티에서 계정 이력 제거 및 관계에 cascade 옵션 추가 ([efa36c6](https://github.com/K-Soo/hotel-job-api/commit/efa36c6ec7991549da50e1cb40ba44c6c462e908))
* 카카오 OAuth 전략에 토큰 비율 제한 예외 처리 추가 ([e8f156e](https://github.com/K-Soo/hotel-job-api/commit/e8f156e161113363ae83ddb4d11830def8754d19))
* 쿠폰 설명에서 '웰컴 쿠폰' 문구 제거 ([2658167](https://github.com/K-Soo/hotel-job-api/commit/265816716f1c2eeb3d0e1739dc5bacf42ce86b02))
* 푸시 서비스에 사용자 푸시 토큰 삭제 메서드 추가 및 포인트 거래 엔티티 수정 ([d96cf5f](https://github.com/K-Soo/hotel-job-api/commit/d96cf5fce6216e189bf32d5453afb6f5ef4d223d))
* Company 엔티티에서 Employer 관계의 cascade 옵션 제거 ([15bb6a3](https://github.com/K-Soo/hotel-job-api/commit/15bb6a33d65e9d09ac026a61165f812b9de16176))
* consent 엔티티에서 Employer 및 Applicant 관계의 cascade 옵션 제거 ([78f7ad9](https://github.com/K-Soo/hotel-job-api/commit/78f7ad9f5ef0f55ef61ee6d4c44af5dbae9a384a))
* createCertification으로 변경 및 링크 수정 ([a4f129a](https://github.com/K-Soo/hotel-job-api/commit/a4f129a7133c1a2b29d34c13146d1b9613c46d25))
* createCertification으로 이름 변경 ([353578d](https://github.com/K-Soo/hotel-job-api/commit/353578d671402e571fc4fbf0c9ceadb8e655e8de))
* OAuth 관련 예외 처리 추가 및 계정 상태 메시지 개선 ([a09af26](https://github.com/K-Soo/hotel-job-api/commit/a09af26745571d75180a81bbe7e8d94bd1bd04ae))
* paymentRecruitment 쿼리에서 type 필드 제거 ([9f50dfa](https://github.com/K-Soo/hotel-job-api/commit/9f50dfac9fb125b52ec2dae13d06485f002f282f))
* Recruitment 엔티티에서 Employer 관계의 cascade 옵션 제거 및 Application 관계의 cascade 옵션 추가 ([98b721f](https://github.com/K-Soo/hotel-job-api/commit/98b721fbb6a153206af1faa0d3fc7dad65f513de))

### [1.4.1](https://github.com/K-Soo/hotel-job-api/compare/v1.4.0...v1.4.1) (2025-03-21)


### Features

* 채용공고 복사 시 국적 정보 수정 및 복사 제목 포맷 개선 ([6c5954f](https://github.com/K-Soo/hotel-job-api/commit/6c5954fcd82bf6c2d45145b0934340ead00412f7))


### Refactors

* 결제 ID 유효성 검사 추가 및 예외 처리 개선 ([3cc8211](https://github.com/K-Soo/hotel-job-api/commit/3cc82119cfcced5b44f6c6e73916beff96c00589))
* 결제 ID가 없는 경우 빈 결과 및 페이지네이션 반환 로직 추가 ([a506a7c](https://github.com/K-Soo/hotel-job-api/commit/a506a7cd0aa7eed756e862c5e5f1cf18b667ed62))
* 계정 삭제 요청 메서드 수정 및 인증 상태 필드 추가 ([c92661f](https://github.com/K-Soo/hotel-job-api/commit/c92661fa8b60bd4e2d93dfd088733e940291d4bc))
* 본인인증 관련 메서드 및 DTO의 인증 타입을 SIGN_UP으로 변경 ([98e6073](https://github.com/K-Soo/hotel-job-api/commit/98e6073f1eab895137b9fc51cb73a0c31753fce4))
* 불필요한 주석 제거 및 인증 정보 조회 메서드 변경 ([05f81a2](https://github.com/K-Soo/hotel-job-api/commit/05f81a28faef5a3df540c232044666a13fc0881b))
* 불필요한 주석 처리 및 옵션 쿼리 수정 ([3e16afc](https://github.com/K-Soo/hotel-job-api/commit/3e16afc0bcd28fcd6b4af114d7a0ba39c1923d47))
* 불필요한 주석 처리 및 쿼리 조건 주석화 ([0580538](https://github.com/K-Soo/hotel-job-api/commit/0580538f76d5cc2687e9c3f52e9440ab152e2828))
* 불필요한 EmployersService 및 TypeOrmModule 제거 ([c77cdc5](https://github.com/K-Soo/hotel-job-api/commit/c77cdc55cf67cb4f97fe79900ef480ff4ecca990))
* 불필요한 import 제거 및 코드 정리 ([c9feacf](https://github.com/K-Soo/hotel-job-api/commit/c9feacf50e370c68121a0c239595f81832aab297))
* 사업자 계정 삭제 메서드 추가 및 모듈 의존성 정리 ([bbc4c83](https://github.com/K-Soo/hotel-job-api/commit/bbc4c836124cd667b65e6101f8d0952f467c8151))
* 인증 관련 메서드 및 변수 이름 변경으로 가독성 향상 ([85ecaa5](https://github.com/K-Soo/hotel-job-api/commit/85ecaa5e86151d193a89a0737079ddffe5c7503b))
* 회사 및 고용주 엔티티의 불필요한 임포트 제거 및 관계 수정 ([f7b914d](https://github.com/K-Soo/hotel-job-api/commit/f7b914dca4de6d4d5ca09d84059df253295f1644))
* 회원탈퇴 상태 추가 및 인증 타입에 SIGN_UP 추가 ([35167b1](https://github.com/K-Soo/hotel-job-api/commit/35167b181f59284a631264a6a0eff278b9b3d5e2))
* account-history.module.ts에서 불필요한 EmployersModule import 제거 ([4bffdac](https://github.com/K-Soo/hotel-job-api/commit/4bffdac50850b6514a5055c8553c8f7ece40213f))
* AuthService에서 불필요한 DataSource 의존성 제거 ([74fbba5](https://github.com/K-Soo/hotel-job-api/commit/74fbba5a49ef6d6e158d33340e70b86bfd4a7c3b))
* changeAccountStatus 메서드를 createAccountHistory로 이름 변경 및 changedBy 매개변수 제거 ([9130998](https://github.com/K-Soo/hotel-job-api/commit/91309987a84bf78d65b06ed5d201da8926d45aec))
* changedBy 필드 제거 및 note 필드를 reason으로 이름 변경 ([5f72da8](https://github.com/K-Soo/hotel-job-api/commit/5f72da88ab5ea4e6bfc992c87c734345d8aa5368))
* note 매개변수를 reason으로 이름 변경 ([0d94aae](https://github.com/K-Soo/hotel-job-api/commit/0d94aae9fb4ae3fa669ee7c4a1ea169d4fcdf8be))

## [1.4.0](https://github.com/K-Soo/hotel-job-api/compare/v1.3.1...v1.4.0) (2025-03-18)


### Features

* 채용공고 복사 기능 추가 및 관련 로직 구현 ([0dda24f](https://github.com/K-Soo/hotel-job-api/commit/0dda24fe15870795ca4e62681b941a27d14a6143))


### Refactors

* 고유 닉네임 생성 로직 개선 및 불필요한 함수 제거 ([e553d3b](https://github.com/K-Soo/hotel-job-api/commit/e553d3b677278ec074f7aba4b86ff89f0ef886f5))
* nationality.entity.ts에서 불필요한 import 제거 ([37a89f3](https://github.com/K-Soo/hotel-job-api/commit/37a89f35fcfbbabef8f2cf38fed70bc4259d6d24))

### [1.3.1](https://github.com/K-Soo/hotel-job-api/compare/v1.3.0...v1.3.1) (2025-03-18)


### Features

* 쿠폰 생성 및 발급 기능 추가, DTO 수정 ([207cf3a](https://github.com/K-Soo/hotel-job-api/commit/207cf3a70259961a1003e8f2448d0a0a2b5e1a41))


### Refactors

* 고유 닉네임 생성 로직 개선 및 불필요한 함수 제거 ([36d9ca0](https://github.com/K-Soo/hotel-job-api/commit/36d9ca0fdc5b0c691d039c8c03c5a16a407902ff))
* 알림 서비스 호출 주석 추가 및 고유 닉네임 생성 로직 개선 ([de31188](https://github.com/K-Soo/hotel-job-api/commit/de31188a12d7d4c8e9307073ed2e6091045c2270))
* 쿠폰 관련 로직 개선 및 주석 추가 ([94a98b3](https://github.com/K-Soo/hotel-job-api/commit/94a98b344b54bbd29f5d175cadc8e765457047d5))

## [1.3.0](https://github.com/K-Soo/hotel-job-api/compare/v1.2.2...v1.3.0) (2025-03-18)


### Features

* 결제 스케줄러에 만료된 결제 처리 및 삭제 기능 추가 ([33fa03b](https://github.com/K-Soo/hotel-job-api/commit/33fa03bbc13a022cb6bb362a8e2f8daa8d31f1bc))
* 쿠폰 스케줄러의 로그 메시지 개선 및 코드 주석 정리 ([7ec0d42](https://github.com/K-Soo/hotel-job-api/commit/7ec0d4235be681adfa547d85a5085a34cddedacf))
* JWT 전략에서 토큰 검사 로직 주석 개선 및 커스텀 예외 처리 설명 추가 ([83562d5](https://github.com/K-Soo/hotel-job-api/commit/83562d5dd6219754acf3b77269500cd707369ff9))
* MembershipSeeder에서 불필요한 주석 제거 및 upsert 로직 간소화 ([86597e9](https://github.com/K-Soo/hotel-job-api/commit/86597e945fb0b15436e530a83a4274ffd36ccbdf))
* RecruitmentMainProductSeeder에서 상품 데이터 정의를 상수화하여 코드 간소화 ([e28dd69](https://github.com/K-Soo/hotel-job-api/commit/e28dd69913a066dfac4359620da9ac28e1db8788))
* RecruitmentScheduler 추가 및 채용 공고 관리 기능 구현 ([22b8fbb](https://github.com/K-Soo/hotel-job-api/commit/22b8fbb85909d40370848d3739c43311e62caa36))
* RecruitmentScheduler를 SchedulerModule에 추가 ([0641452](https://github.com/K-Soo/hotel-job-api/commit/0641452c5e7b2c636bafa273cfeea26f288db9e5))
* RecruitService에 진행 중인 채용 ID를 반환하는 메서드 추가 ([abf6ccc](https://github.com/K-Soo/hotel-job-api/commit/abf6cccf0a3e7c143ca45262d767b4a40a61cd4a))
* RefreshTokenMiddleware에서 토큰 검증 로직 주석 개선 및 흐름 설명 추가 ([d048d98](https://github.com/K-Soo/hotel-job-api/commit/d048d98143333c6737fe97a0ac426ca892d5a337))


### Bug Fixes

* 불필요한 OnModuleInit 임포트 제거 ([74f1635](https://github.com/K-Soo/hotel-job-api/commit/74f16359fd575bd931654acf1bfd9c9b7e55a222))
* confirmRecruitmentPaymentDto 메서드 이름 수정 ([57f26c5](https://github.com/K-Soo/hotel-job-api/commit/57f26c5a1714aaef4e3325c8b5449916da932ea7))


### Refactors

* 코드 상수화 및 이동 ([cb6b3b0](https://github.com/K-Soo/hotel-job-api/commit/cb6b3b0b32c154587d952697ed5ce6bf8e4c4d4e))
* 코드 최적화 및 주석 개선 ([ccaaa49](https://github.com/K-Soo/hotel-job-api/commit/ccaaa4921f3e08c09a8757a64b641f901a1983c6))
* 쿠폰 스케줄러 로그 메시지 개선 및 주석 정리 ([210eb3b](https://github.com/K-Soo/hotel-job-api/commit/210eb3b0ec36e76cad058f511c0f91057b168cb7))

### [1.2.2](https://github.com/K-Soo/hotel-job-api/compare/v1.2.1...v1.2.2) (2025-03-15)


### Features

* 불필요한 임포트 제거 ([e36c154](https://github.com/K-Soo/hotel-job-api/commit/e36c154a5e20eeaeb1f5044ac45886b74f62a5c0))
* 이미지 메타데이터 가져오기 실패에 대한 사용자 정의 예외 추가 ([69b6e55](https://github.com/K-Soo/hotel-job-api/commit/69b6e551e9564d08c99eaa9211fdd0e0144bac91))
* 채용 프리미엄 공고 기능 추가 및 기존 메서드 이름 변경 ([b0d90f3](https://github.com/K-Soo/hotel-job-api/commit/b0d90f37939e36791d8b653581be12b8a6156694))
* 코드 변경 사항에 따른 기능 개선 및 최적화 ([cab883e](https://github.com/K-Soo/hotel-job-api/commit/cab883e2911afc72872a62dca68f08d936c0f3d1))
* 패치 버전 증가를 위한 메서드 추가 ([8e4985a](https://github.com/K-Soo/hotel-job-api/commit/8e4985a503c2a94b9244c363132258a88cedf4ce))
* 프로필 이미지 업로드 기능 개선 및 UUID 기반 파일 이름 생성 ([e6364fe](https://github.com/K-Soo/hotel-job-api/commit/e6364fe2217755620288ad7df35afffddd33e1ea))
* 프로필 이미지 파일 크기 제한을 5MB로 변경 및 사용자 메시지 추가 ([dbe8957](https://github.com/K-Soo/hotel-job-api/commit/dbe89578c71bc65ee021b296841e6acff985a8f5))
* S3Service에 파일 메타데이터 가져오기 기능 추가 및 오류 처리 개선 ([233b4bf](https://github.com/K-Soo/hotel-job-api/commit/233b4bf3b6a259a79a85805de1dd0a936f27184b))
* uuid 패키지 추가 ([1a76de4](https://github.com/K-Soo/hotel-job-api/commit/1a76de46de756a4e9b41faef132898930d281ed3))

### [1.2.1](https://github.com/K-Soo/hotel-job-api/compare/v1.2.0...v1.2.1) (2025-03-12)


### Features

* 결제 서비스에서 옵션에 보너스 일수 추가 ([14fb8dd](https://github.com/K-Soo/hotel-job-api/commit/14fb8dd36632a9abde963bc1324927474cb5cfe4))
* 리크루트 서비스에서 결제 상태 및 타입에 따른 필터링 개선 및 페이지네이션 로직 최적화 ([e8cec03](https://github.com/K-Soo/hotel-job-api/commit/e8cec03b9e2e5612483a44f12d7cb942ee938963))
* 채용공고 목록 조회 메서드 개선 및 페이징 처리 로직 최적화 ([2ef1f2c](https://github.com/K-Soo/hotel-job-api/commit/2ef1f2c384a7fc97e9982e8cbe3d50f65d4c1472))
* 채용공고 목록 조회 메서드 이름 변경 및 응답 설명 수정 ([9306868](https://github.com/K-Soo/hotel-job-api/commit/930686820bcf712131be25cfaf1e84c1dca00d5b))
* FCM 토큰 저장 메서드에서 불필요한 로그 제거 ([1f2d864](https://github.com/K-Soo/hotel-job-api/commit/1f2d864d5198383d2f9f8cb96d128e019af36f72))

## [1.2.0](https://github.com/K-Soo/hotel-job-api/compare/v1.1.0...v1.2.0) (2025-03-05)


### Features

* 계정 비밀번호 재설정 DTO 추가 및 유효성 검사 구현 ([e6e17c9](https://github.com/K-Soo/hotel-job-api/commit/e6e17c90fe462574da7754d0a6d3a442e2ea67f0))
* 본인인증 서비스 개선 및 중복 인증 체크 기능 추가 ([093cf88](https://github.com/K-Soo/hotel-job-api/commit/093cf8820c290d2a53be82a2878df637d50d4a06))
* 비밀번호 변경 기능 추가 ([f84c695](https://github.com/K-Soo/hotel-job-api/commit/f84c695752800d070507abbc7c1ac0439fbc3ef4))
* 비밀번호 변경 기능 추가 및 예외 처리 개선 ([34a2c79](https://github.com/K-Soo/hotel-job-api/commit/34a2c7917348e5fb3e3df46bd6a39ab3f7fb7ac3))
* 알림 경로 수정 및 컨트롤러 이름 변경 ([2916332](https://github.com/K-Soo/hotel-job-api/commit/29163324d654979a7677fbe379dea0a5fbcc7c96))
* 알림 관련 DTO 및 인앱 모듈 삭제 ([b9fe707](https://github.com/K-Soo/hotel-job-api/commit/b9fe707865e5f255050ce24416f82b365a8d4f41))
* 알림 모듈에 인증 모듈 및 게이트웨이 추가 ([8f3c351](https://github.com/K-Soo/hotel-job-api/commit/8f3c351061edcf2c09bee42cdf86373d477b0c78))
* 알림 발송 및 목록 조회 기능 구현 ([49cbec3](https://github.com/K-Soo/hotel-job-api/commit/49cbec39f7a1539c6665359850db1145575fb727))
* 알림 발송 및 목록 조회 기능 추가 ([3c5bf3a](https://github.com/K-Soo/hotel-job-api/commit/3c5bf3a6462447ea9302e449f580f19ab47b74de))
* 알림 엔티티 및 DTO 수정, 푸시 알림 링크 처리 개선 ([18d6f45](https://github.com/K-Soo/hotel-job-api/commit/18d6f4544b8f52b9059e6b707ce50d9da8c34e6f))
* 알림 엔티티 수정 및 사용자 목록 처리 개선 ([db31a74](https://github.com/K-Soo/hotel-job-api/commit/db31a74aea9a8215d81cd6295d4314e667218fff))
* 알림 웹소켓 게이트웨이 구현 및 사용자 연결 관리 추가 ([5b5b4ec](https://github.com/K-Soo/hotel-job-api/commit/5b5b4ec088f7a3e999bc0cd5de2e6d7e55fd8c47))
* 알림 유형 및 카테고리 상수 추가 ([1bdc9a3](https://github.com/K-Soo/hotel-job-api/commit/1bdc9a32f9614b2998d4425f5e32ebe1198619f0))
* 알림 조회를 위한 DTO 추가 및 유효성 검사 구현 ([cbcaabb](https://github.com/K-Soo/hotel-job-api/commit/cbcaabb5d6ea49e102991a8da2dfff8bb8a2389a))
* 알림 테이블 구조 변경 및 새로운 열 추가 ([3baf0e1](https://github.com/K-Soo/hotel-job-api/commit/3baf0e1a0a31a788fd40bbadd4c4a3597353e45f))
* 응답 상태 상수에 사용 불가능 및 알림 읽음 상태 추가 ([c95086d](https://github.com/K-Soo/hotel-job-api/commit/c95086d4326ea56733a847a797cf9a53a16ec37d))
* 인증 컨트롤러에 비밀번호 재설정 검증 및 알림 전송 기능 추가 ([5136c88](https://github.com/K-Soo/hotel-job-api/commit/5136c88431a6c754b01d8aac8bd0d5061d152b75))
* 지원 취소 시 중복 지원 가능 횟수 제한 및 이력서 지원 로직 개선 ([5c0db5f](https://github.com/K-Soo/hotel-job-api/commit/5c0db5fafabdbbc5f1a2472fe312743445ac4cc3))
* 지원서 제출 및 취소 시 알림 전송 기능 추가 ([15e35ab](https://github.com/K-Soo/hotel-job-api/commit/15e35ab88de4f5df5986f088b74d0c21e1340539))
* 쿠폰 발급 실패에 대한 예외 처리 추가 ([1ee095f](https://github.com/K-Soo/hotel-job-api/commit/1ee095fe6cc4450accfe673c0d5ca9489617828e))
* 패키지.json에 Socket.IO 및 관련 의존성 추가 ([500c0e7](https://github.com/K-Soo/hotel-job-api/commit/500c0e7088c12078c71544675e0df37998bfc4c2))
* 푸시 알림 전송 메서드의 매개변수 타입 수정 및 불필요한 로그 제거 ([29d3beb](https://github.com/K-Soo/hotel-job-api/commit/29d3beb174f2488900a598628f842828af04c9eb))
* 푸시 알림 전송 시 DTO 로그 추가 및 링크 처리 개선 ([e16ec3e](https://github.com/K-Soo/hotel-job-api/commit/e16ec3eb495c71b40fb6d141160c0a1b82e94bf5))
* 합격 및 불합격 발표 시 지원자에게 알림 전송 기능 추가 ([9b96d1b](https://github.com/K-Soo/hotel-job-api/commit/9b96d1b439af7dcfe2446e768d4ecdc7d1f79585))
* FCM 토큰 저장 메서드에 예외 처리 추가 및 로그 제거 ([5bc26be](https://github.com/K-Soo/hotel-job-api/commit/5bc26be225e2622290d326890b020093e78285f8))


### Bug Fixes

* 불필요한 임포트 제거 ([b5fa8ce](https://github.com/K-Soo/hotel-job-api/commit/b5fa8ce80204c43186f63a23a54b826e2d1649e8))
* 지원자 엔티티에서 불필요한 알림 관계 제거 ([da7ab5a](https://github.com/K-Soo/hotel-job-api/commit/da7ab5a49b598794ade10b0868d37274de4e5edc))
* 쿠폰 발급 오류 메시지에서 이모지 제거 ([6ecace1](https://github.com/K-Soo/hotel-job-api/commit/6ecace1535c3bb969a9804facfa08b7cb61a5949))
* makefile에서 함수 이름 오타 수정 및 PushService에서 FCM 토큰 응답 개선 ([2da37d8](https://github.com/K-Soo/hotel-job-api/commit/2da37d8782f7f4b0cae9d232ca8de8c9392fe2fe))


### Refactors

* 고용주 엔티티에서 불필요한 알림 관계 제거 ([2865ba7](https://github.com/K-Soo/hotel-job-api/commit/2865ba73a44832ec87c2171418a0a9d3d66c87cb))
* 리프레시 토큰 미들웨어의 생성자 코드 간소화 ([2de43ab](https://github.com/K-Soo/hotel-job-api/commit/2de43ab4c61e7fb3e5af6e616b3ce6cbdc2a7511))
* 인증 엔티티에서 불필요한 관계 제거 ([35d03dd](https://github.com/K-Soo/hotel-job-api/commit/35d03ddf33f10d67513b17a29af61086226084e8))

## [1.1.0](https://github.com/K-Soo/hotel-job-api/compare/v1.0.0...v1.1.0) (2025-02-25)


### Features

* 결제 모듈에서 불필요한 모듈 제거 ([5f381f8](https://github.com/K-Soo/hotel-job-api/commit/5f381f8c48b9df9b34d1b57be77f57e960186894))
* 결제 모듈에서 불필요한 임포트 제거 ([9d67825](https://github.com/K-Soo/hotel-job-api/commit/9d6782598af77098bf6a50bb1ca8d793a5690781))
* 사용자 에이전트 정보를 위한 인터페이스 추가 ([9942a79](https://github.com/K-Soo/hotel-job-api/commit/9942a795a26086db053eea66815225be6da462cf))
* 사용자에게 푸시 알림 전송을 위한 DTO 추가 ([a7d417f](https://github.com/K-Soo/hotel-job-api/commit/a7d417f75f92922d4f07eb0e2d04bd8a1c04c231))
* 알림 관련 모듈, 서비스, DTO 및 엔티티 추가 ([b6b4787](https://github.com/K-Soo/hotel-job-api/commit/b6b47875ecb5484211b512b6064f7382ad46fc8d))
* 알림 관련 상수 파일 추가 ([2bb7304](https://github.com/K-Soo/hotel-job-api/commit/2bb730469f7a8afa689162f7810f579015d46095))
* 알림 모듈 추가 및 관련 서비스, 컨트롤러 설정 ([4625f06](https://github.com/K-Soo/hotel-job-api/commit/4625f06b07aca3665d15890e9dd05fef7adb790d))
* 알림 및 결제 관련 모듈과 DTO, 서비스, 컨트롤러 삭제 ([3d1502b](https://github.com/K-Soo/hotel-job-api/commit/3d1502b22ce4fbb57c48068b98b12c18f20b70f2))
* 알림 서비스 추가 및 기본 CRUD 메서드 구현 ([f0854ea](https://github.com/K-Soo/hotel-job-api/commit/f0854ea0b72c237776d5ec25118114850b1050ae))
* 알림 엔티티 추가 및 알림 유형 정의 ([1232bca](https://github.com/K-Soo/hotel-job-api/commit/1232bca9e91a0865838297d2a22cf8a8c05eda70))
* 알림 컨트롤러 추가 및 기본 CRUD 메서드 구현 ([9cbf131](https://github.com/K-Soo/hotel-job-api/commit/9cbf13198d2bae81f407a652b73d53acf5e0dad9))
* 인앱 알림 모듈 파일 추가 ([ab8e056](https://github.com/K-Soo/hotel-job-api/commit/ab8e05666655e84c27a3fa6abf8f40b928f80475))
* 인앱 알림 서비스 파일 추가 ([12d4fd6](https://github.com/K-Soo/hotel-job-api/commit/12d4fd6d1e65e184462585d50cd8f82a82cc1f87))
* 인앱 알림 컨트롤러 추가 ([b1f459b](https://github.com/K-Soo/hotel-job-api/commit/b1f459bad1efa6c82b1faede55e0b52e94dadd06))
* 지원자 엔티티에 알림 관계 추가 ([226f0a1](https://github.com/K-Soo/hotel-job-api/commit/226f0a11778a74c16fb57a40f5758465b38859f2))
* 테스트 모듈 제거 및 알림 관련 모듈 이름 변경 ([7d20e0e](https://github.com/K-Soo/hotel-job-api/commit/7d20e0e3d2944fdebcd25919161aae6df176659b))
* 포인트 모듈에서 불필요한 삭제 메서드 제거 ([d99435f](https://github.com/K-Soo/hotel-job-api/commit/d99435f4743284ade5680019c2f2210af1bd8cc4))
* 포인트 서비스에서 불필요한 삭제 메서드 제거 ([9ca516b](https://github.com/K-Soo/hotel-job-api/commit/9ca516bb7a443700101fe88c556a0ab5d5b8c10d))
* 푸시 알림 모듈 추가 및 관련 서비스, 컨트롤러 설정 ([af2630c](https://github.com/K-Soo/hotel-job-api/commit/af2630cd67780107d5a27773b7a0e588317dabd0))
* 푸시 알림 서비스 및 관련 기능 구현 ([a9602e1](https://github.com/K-Soo/hotel-job-api/commit/a9602e1273c7f08a58bbc1b25631a1aaa709e518))
* 푸시 알림 엔티티 추가 ([110152b](https://github.com/K-Soo/hotel-job-api/commit/110152b4384ff28d4e5a371da2e9d20f1dd17c5d))
* 푸시 알림 컨트롤러 추가 및 FCM 토큰 저장, 전송, 확인, 설정 변경 기능 구현 ([70600b7](https://github.com/K-Soo/hotel-job-api/commit/70600b75f3cf0991b129e720f8d2d27dd53a1d86))
* 푸시관련 마이그레이션 ([f47c437](https://github.com/K-Soo/hotel-job-api/commit/f47c4378cf914a31ac835034a1f908505e846f12))
* 푸시관련 마이그레이션 ([4647d01](https://github.com/K-Soo/hotel-job-api/commit/4647d0167385489dbb0e199e271a17e12e6accdd))
* CreateNotificationDto 클래스 추가 ([9c71297](https://github.com/K-Soo/hotel-job-api/commit/9c71297339b15879ad3c33735d238a61384fef09))
* Employer 엔티티에 알림 관계 추가 ([8d9b0cb](https://github.com/K-Soo/hotel-job-api/commit/8d9b0cb7a17dc11f12a4226afa0ef98fdb45f492))
* FCM 토큰 저장을 위한 DTO 추가 ([2177bcc](https://github.com/K-Soo/hotel-job-api/commit/2177bcc953ff615c6f1b76c06e637f3e2530ab39))
* Firebase 모듈 추가 및 서비스 제공 ([b0741b3](https://github.com/K-Soo/hotel-job-api/commit/b0741b370f281d5a03e51aaf968fcbed13dbcaba))
* firebase-admin 패키지 추가 ([99ee330](https://github.com/K-Soo/hotel-job-api/commit/99ee330a12a215bd1dd2ad09eef316eda3440dd8))
* FirebaseProvider 추가 및 초기화 설정 구현 ([3080edc](https://github.com/K-Soo/hotel-job-api/commit/3080edcb46971655c3447e70472fe9492dc44e6a))
* FirebaseService 추가 및 푸시 알림 전송 기능 구현 ([449a767](https://github.com/K-Soo/hotel-job-api/commit/449a7670c7b28dce1a806a6cedb5195a2809cf95))


### Bug Fixes

* 불필요한 BadRequestException 임포트 제거 ([8892bcd](https://github.com/K-Soo/hotel-job-api/commit/8892bcdb5e3d6475d5e304879f32f53ebb2aa121))

## [1.0.0](https://github.com/K-Soo/hotel-job-api/compare/v0.0.13...v1.0.0) (2025-02-20)


### Features

* SignInDto의 예제 값을 빈 문자열로 수정하여 보안 강화 ([565d615](https://github.com/K-Soo/hotel-job-api/commit/565d6158a016dd3833918a0caf2027ab0203fe15))
* Swagger 문서 접근을 위한 인증 미들웨어 제거 ([6e6c0b5](https://github.com/K-Soo/hotel-job-api/commit/6e6c0b5b7250d5a1e8a841f12411b0d6f0075aba))
* Swagger 문서 접근을 위한 인증 미들웨어 추가 및 설정 ([cfe4cdc](https://github.com/K-Soo/hotel-job-api/commit/cfe4cdc1f631d31f8d4c9e6543b3404b61a0609c))

### [0.0.13](https://github.com/K-Soo/hotel-job-api/compare/v0.0.12...v0.0.13) (2025-02-19)


### Features

* 게시 기간 계산 유틸리티 함수 추가 ([4c4779f](https://github.com/K-Soo/hotel-job-api/commit/4c4779ff5d3fd49830f191a755a0927d9a0c61fe))
* 결과 알림 상태로 전형 단계 필드 변경 및 관련 유효성 검사 추가 ([efeddc5](https://github.com/K-Soo/hotel-job-api/commit/efeddc5eab3eeae9a48038481c5bc04f9f7f33f0))
* 결과 알림 상태에 따른 전형 단계 동적 변경 로직 추가 ([1b31b2d](https://github.com/K-Soo/hotel-job-api/commit/1b31b2dcf180d1173519a516b45a9957eadd0968))
* 결정 상태 업데이트 DTO 파일 삭제 ([0e2d15b](https://github.com/K-Soo/hotel-job-api/commit/0e2d15bfd7511cf78f79ee6bf34561c40e617daf))
* 결정 상태 DTO에서 최종 결정 상태 필드 제거 ([0110f3c](https://github.com/K-Soo/hotel-job-api/commit/0110f3c2961a7697bcc4972ec2f24bbc280070d4))
* 결제 관련 모듈 및 엔티티 개선 ([b47a241](https://github.com/K-Soo/hotel-job-api/commit/b47a2417d97405be2057b59bec3f0021ddf95187))
* 결제 관련 사용자 정의 HTTP 예외 추가 ([7270450](https://github.com/K-Soo/hotel-job-api/commit/72704500836857082ab88bc8acf145859ce19491))
* 결제 내역 리스트 조회 기능 추가 및 권한 설정 ([317b8a6](https://github.com/K-Soo/hotel-job-api/commit/317b8a64cca0c020bea7aa584381b266eb142046))
* 결제 내역 상세 조회 기능 추가 및 성능 개선 ([55ab14b](https://github.com/K-Soo/hotel-job-api/commit/55ab14b6f17b503eec016067c7fab8027232591c))
* 결제 내역 조회 기능 추가 및 포맷팅 구현 ([4b86d77](https://github.com/K-Soo/hotel-job-api/commit/4b86d77872192240da90c8062e11d3969d7a9e2e))
* 결제 모집 모듈에 TypeOrm 및 Toss 모듈 추가 ([3aff1dd](https://github.com/K-Soo/hotel-job-api/commit/3aff1dd0fa0e44d9093ab873aab3bbbf0639a889))
* 결제 모집 엔티티 및 옵션 엔티티 추가 ([a4c9799](https://github.com/K-Soo/hotel-job-api/commit/a4c9799509965662abd4be99194dc306931943a5))
* 결제 모집 옵션에 보너스 일수 및 게시 시작/종료 날짜 필드 추가 ([331637e](https://github.com/K-Soo/hotel-job-api/commit/331637e06ee5e724c3a838b74f25b00f1d12775b))
* 결제 및 쿠폰 처리를 위한 스케줄러 추가 ([9097922](https://github.com/K-Soo/hotel-job-api/commit/9097922ed43bfc0853e15b79ecabb3ff281daf78))
* 결제 상태 주석 수정 및 결제 유형 열거형 추가 ([85b348e](https://github.com/K-Soo/hotel-job-api/commit/85b348e93a6ba722cd88867919cd7df074ea7060))
* 결제 상태를 정의하는 PaymentStatus 열거형 추가 ([8b66477](https://github.com/K-Soo/hotel-job-api/commit/8b664772934eae872b560f671b1020060fb74461))
* 결제 상태에 따라 특별 및 긴급 채용 조회 메서드 추가 ([49c0ced](https://github.com/K-Soo/hotel-job-api/commit/49c0ced023a1ee18e2c0bddbeac24b3e3b68105d))
* 결제 엔티티를 리크루트 모듈에 추가 ([f300450](https://github.com/K-Soo/hotel-job-api/commit/f30045082dde7b7fddfd81c0e1d2ba872058d74e))
* 결제 엔티티에 쿠폰 할인 및 결제 유형 추가, 필드 설명 수정 ([86ca5dc](https://github.com/K-Soo/hotel-job-api/commit/86ca5dceb875a73b8380e445468b019c82a6612b))
* 경험 엔티티에서 불필요한 SalaryType 및 City 임포트 제거 ([4a5774e](https://github.com/K-Soo/hotel-job-api/commit/4a5774e0590e56ecf1fadc8e167bfacc183dcb02))
* 고용주 서비스에서 계정 정보 조회 시 인증 관계 제거 ([25385d4](https://github.com/K-Soo/hotel-job-api/commit/25385d416c02bfd7e6652c659cfa8713171bfc5a))
* 고용주 엔티티에 쿠폰 및 포인트 거래 관계 추가 ([1c8f1ae](https://github.com/K-Soo/hotel-job-api/commit/1c8f1ae9a0e3c906ec37a38edfac72fc4314f9fa))
* 고용주 응답 DTO에 총 점수, 총 포인트 및 멤버십 정보 필드 추가 ([70fb692](https://github.com/K-Soo/hotel-job-api/commit/70fb6920daee2af504c7060090016fec5c801dd6))
* 고용주 컨트롤러에 직렬화 인터셉터 추가 및 응답 설명 수정 ([b92429f](https://github.com/K-Soo/hotel-job-api/commit/b92429f28f7188b465583c05f0ee5c761a794759))
* 고용주 쿠폰 엔티티 추가 ([0af96a7](https://github.com/K-Soo/hotel-job-api/commit/0af96a71d94f1352786e59b4e20443223f3e6d53))
* 고용주 쿠폰 엔티티에 설명 필드 및 만료 상태 필드 추가, 발급 및 만료일 정밀도 수정 ([1a4c9e6](https://github.com/K-Soo/hotel-job-api/commit/1a4c9e6f15bf6f055c8ee96a01d5dc4b26ae0f9f))
* 날짜 및 시간 관련 유틸리티 함수 추가 ([f5c7c10](https://github.com/K-Soo/hotel-job-api/commit/f5c7c10307f55bf4a5eb0774d89122fb553b7e3c))
* 닉네임 변경 기능 추가 및 유효성 검사 로직 구현 ([6c93ee3](https://github.com/K-Soo/hotel-job-api/commit/6c93ee346a4a79650c1e159cff92889b539a9478))
* 닉네임 유효성 검사를 위한 정규 표현식 추가 ([cabc43a](https://github.com/K-Soo/hotel-job-api/commit/cabc43a7d709111a8b37077706ee3da5b039ee9e))
* 닉네임 중복 확인 메서드 추가 및 데이터 소스 주입 ([cea0246](https://github.com/K-Soo/hotel-job-api/commit/cea0246983991ba069bc714b0b1e27c4b11ac1a5))
* 닉네임 체크 DTO 추가 및 유효성 검사 로직 구현 ([4196b60](https://github.com/K-Soo/hotel-job-api/commit/4196b60cc6a831cd116ad03a86d1dc07ba734dbb))
* 리뷰 단계 상태를 고용주 리뷰 단계 상태로 변경 ([6c58721](https://github.com/K-Soo/hotel-job-api/commit/6c587219516d48f7ff15540f45b0ac6e30187a2b))
* 마감된 채용공고 처리를 위한 스케줄러 추가 ([8a921a1](https://github.com/K-Soo/hotel-job-api/commit/8a921a1634b34c57851c305b2afa1447429fecf1))
* 마감된 채용공고를 처리하는 스케줄러 추가 ([a4760f4](https://github.com/K-Soo/hotel-job-api/commit/a4760f4e80f0e20d241a2d55584bca79d85d3e77))
* 멤버십 응답 DTO 추가 및 최소/최대 점수, 할인율, 등급 필드 정의 ([f57017d](https://github.com/K-Soo/hotel-job-api/commit/f57017d04560db86621dbb458fdbeb85813630ea))
* 모집 상세 조회 시 비공개 정보 처리 로직 추가 및 상태 필터 수정 ([33eb9a4](https://github.com/K-Soo/hotel-job-api/commit/33eb9a496dc7f08e864c21850fb643a5683f4c89))
* 모집 상품 옵션에 가격 필드 추가 ([1f57289](https://github.com/K-Soo/hotel-job-api/commit/1f57289197337a5e01277f8b424a7943be24329d))
* 무료 채용 결제 확인을 위한 DTO 클래스 추가 ([de5893f](https://github.com/K-Soo/hotel-job-api/commit/de5893fed30f04ca7cd458d226df1d98c85d21a7))
* 발표 생성 DTO 추가 ([5da295b](https://github.com/K-Soo/hotel-job-api/commit/5da295b81dc67006e1e8480623a9943d6506440e))
* 발표 수신자 엔티티 추가 ([9b82863](https://github.com/K-Soo/hotel-job-api/commit/9b828639ad9d0c869a296a40d005d0a2caf01ebe))
* 발표 알림 엔티티 추가 ([5328cc1](https://github.com/K-Soo/hotel-job-api/commit/5328cc1556d3c6d776340489e9646e869f93694f))
* 불필요한 결정 상태 업데이트 메서드 제거 및 관계 추가 ([24526c3](https://github.com/K-Soo/hotel-job-api/commit/24526c3ba69bcde731d8b842077e1dffee28e0ad))
* 불필요한 임포트 제거 및 코드 정리 ([19709fe](https://github.com/K-Soo/hotel-job-api/commit/19709fea93830496b03b4dedb2ab16ab598dcef1))
* 블랙리스트 이름 상수 추가 ([ecb58ef](https://github.com/K-Soo/hotel-job-api/commit/ecb58efe45a10ece4252521fcf74ae811b57eeae))
* 사용 가능한 쿠폰 응답을 위한 DTO 클래스 추가 ([1a6fc70](https://github.com/K-Soo/hotel-job-api/commit/1a6fc70dea8a0e2854e2b672dd7843eaa0eeef2f))
* 새로운 상태 열거형 추가 및 고용주 전형 단계 정의 ([ddd6b26](https://github.com/K-Soo/hotel-job-api/commit/ddd6b267c0abb0b90ec9b108ebbca4e5316e34f1))
* 스케줄러 모듈 추가 및 결제 정리 스케줄러 등록 ([8037578](https://github.com/K-Soo/hotel-job-api/commit/8037578e98c08df8733d0e203ec0e4e0e410bd6f))
* 알림 모듈 추가 및 서비스, 컨트롤러 연결 ([3865d07](https://github.com/K-Soo/hotel-job-api/commit/3865d07f4af988e6c8b2bad99b5b2d496447a8a1))
* 알림 생성 DTO 추가 ([9ca1aa2](https://github.com/K-Soo/hotel-job-api/commit/9ca1aa2446344c06cd88edeffe21e2a858b67902))
* 알림 서비스 추가 및 기본 CRUD 메서드 구현 ([85647fe](https://github.com/K-Soo/hotel-job-api/commit/85647fe0f0d5a2d5b507bb0d329ec4f28c5149b4))
* 알림 업데이트 DTO 추가 ([d7fce33](https://github.com/K-Soo/hotel-job-api/commit/d7fce338cdfedf6847c7bbd5a86133163353ac01))
* 알림 엔티티 추가 ([a67f66d](https://github.com/K-Soo/hotel-job-api/commit/a67f66d626aa85a22de50c171b16191266957a8b))
* 알림 컨트롤러 추가 및 CRUD 기능 구현 ([62d88d4](https://github.com/K-Soo/hotel-job-api/commit/62d88d41d35fb957c5d735f1486b28ae184cd14b))
* 애플리케이션 공고 관리 컨트롤러 추가 ([28a687f](https://github.com/K-Soo/hotel-job-api/commit/28a687f70fc6f5eb150bb605517e1141998b6891))
* 애플리케이션 공고 모듈 추가 ([6c25314](https://github.com/K-Soo/hotel-job-api/commit/6c253148d82a6eceeba382013ac72e7a8b4b2cd4))
* 애플리케이션 공고 서비스 추가 ([098fc1d](https://github.com/K-Soo/hotel-job-api/commit/098fc1d16dc8ce1006d3d3fbc973435e8caebdcd))
* 애플리케이션 모듈에 공고 모듈 추가 ([64e7def](https://github.com/K-Soo/hotel-job-api/commit/64e7defc1fd035edc86b0d3e3f8cc3924dae8669))
* 앱 모듈에 Push, Scheduler, Coupon, Point 모듈 추가 ([ab128fd](https://github.com/K-Soo/hotel-job-api/commit/ab128fd6ea3ace58d1e1ccd3be3f801e6c2339c7))
* 이력 조회를 위한 DTO 추가 및 상태 필드 정의 ([268b2cd](https://github.com/K-Soo/hotel-job-api/commit/268b2cd061e7afd55d1d212d67f32576c8554cdf))
* 이력서 생성 메서드 이름 변경 ([edb75a0](https://github.com/K-Soo/hotel-job-api/commit/edb75a0fabfe9717d5fce9f574d99135e3cf6e57))
* 이력서 생성 메서드 이름 변경 및 인증 정보 검증 로직 추가 ([91ee082](https://github.com/K-Soo/hotel-job-api/commit/91ee0828864cac5ef32a6fe25e2f98123d6b95e1))
* 인증 서비스에 로깅 기능 추가 및 오류 메시지 개선 ([c9f483f](https://github.com/K-Soo/hotel-job-api/commit/c9f483fa61fe50c80fd35e5e8f3a2f6846c385a0))
* 인증 요청 처리 시 사용자 미존재 예외 처리 및 쿠폰 발급 로직 추가 ([e1a4110](https://github.com/K-Soo/hotel-job-api/commit/e1a411069d81079d8e26fff37c708c93d3539224))
* 인증되지 않은 사용자에 대한 예외 처리 추가 ([4a79068](https://github.com/K-Soo/hotel-job-api/commit/4a79068057510ee36bdff6522fa97600200c05e8))
* 전형 상태 필드 변경 및 결과 알림 상태로 업데이트 ([65edb6c](https://github.com/K-Soo/hotel-job-api/commit/65edb6c62e5660f15363d291020ea699f88cc9a6))
* 제품 컨트롤러에서 불필요한 의존성 제거 및 요청 객체 수정 ([56d60d9](https://github.com/K-Soo/hotel-job-api/commit/56d60d930a6e1b5ea999d6bbb88446d16d623862))
* 지원 내역 조회 및 지원 취소 기능 추가, 유효성 검사 로직 개선 ([ac9f3f0](https://github.com/K-Soo/hotel-job-api/commit/ac9f3f045ae290631bf96c8c1ed77b97c2fe47f5))
* 지원 이력 조회 및 지원 취소 기능 추가, 전형 상태 관련 로직 개선 ([c04a692](https://github.com/K-Soo/hotel-job-api/commit/c04a692021201bca5756d13c12e32265bc322c1e))
* 지원서 엔티티에 발표 알림 수신자 필드 추가 및 최종 결정 상태 필드 제거 ([53146c6](https://github.com/K-Soo/hotel-job-api/commit/53146c68a77503a6ab3f94a866213955369fe5e1))
* 지원서 엔티티에 최종 결정 상태 및 공고 스냅샷 데이터 필드 추가 ([6361a45](https://github.com/K-Soo/hotel-job-api/commit/6361a45439d58f7c71924782cf47a9baeea8c93a))
* 지원자 ID 필드 추가 및 고용주 리뷰 단계 상태를 수정 ([40fb9f7](https://github.com/K-Soo/hotel-job-api/commit/40fb9f796df4e7155e3959619f8c007d0677c540))
* 지원자의 닉네임 존재 여부 확인 및 닉네임 업데이트 기능 추가 ([8104d8f](https://github.com/K-Soo/hotel-job-api/commit/8104d8fcd988b0b2ef08f76c0de940da1da362e5))
* 지원자의 최종 결정 상태 업데이트 기능 추가 및 관련 필드 수정 ([da63925](https://github.com/K-Soo/hotel-job-api/commit/da63925a7bf4d747239790dc5f9bdd158a2f6e31))
* 지원자의 최종 결정 상태 업데이트를 위한 DTO 추가 ([f124fd2](https://github.com/K-Soo/hotel-job-api/commit/f124fd27e84953170ed01894de93d70605fcefcc))
* 지원자의 합격여부 상태 변경 기능 추가 ([7569be0](https://github.com/K-Soo/hotel-job-api/commit/7569be04a4a7a93cd9d6a550e039b71e15bc3ea4))
* 채용 결제 초기화를 위한 DTO 클래스 추가 ([81c68f6](https://github.com/K-Soo/hotel-job-api/commit/81c68f60707e4d466064cca736d55687f8622e84))
* 채용 결제 확인을 위한 DTO 추가 ([e7a4d93](https://github.com/K-Soo/hotel-job-api/commit/e7a4d93f42d40303be8f2b7ccb9932608ec4b2b4))
* 채용 공고 조회 메서드 이름 변경 ([c811cfc](https://github.com/K-Soo/hotel-job-api/commit/c811cfc834e317073b2dac339626f0e8c3212dd2))
* 채용 서비스에 게시 시작 및 종료 날짜 필드 추가, 상태 필터 수정 ([063a368](https://github.com/K-Soo/hotel-job-api/commit/063a368c4569150bdaa8b9b9b3a3d7e34b902256))
* 채용 조회 DTO에 상품 타입 필드 추가 및 직무 필드 수정 ([190cadb](https://github.com/K-Soo/hotel-job-api/commit/190cadbf3038f0c4658bcf84f70c8f9e6ce14539))
* 채용공고 마감 처리 스케줄러 파일 삭제 ([61e567b](https://github.com/K-Soo/hotel-job-api/commit/61e567b735dc501ff40ef8ab7edd0a89611c0c93))
* 채용공고 목록에 결제 가능한 공고 조회 기능 추가 ([9c729d9](https://github.com/K-Soo/hotel-job-api/commit/9c729d9f865f0ce5526686fa68646f3d0523bec3))
* 채용공고 상세 전형 상태 통계 API 문서 수정 및 불필요한 코드 제거 ([083fcdb](https://github.com/K-Soo/hotel-job-api/commit/083fcdbc2e568a4edb2b79357b3808ab605a7007))
* 채용공고 상세 조회 기능 추가 및 사용자 ID 변수명 통일 ([cca3290](https://github.com/K-Soo/hotel-job-api/commit/cca32900520ee029153eb77968ba104c4e9bba43))
* 채용공고 수정 기능 개선 및 결제 정보 조회 추가 ([49e1062](https://github.com/K-Soo/hotel-job-api/commit/49e1062f00da99c1d86a69047b5adc7dcdb5d1bd))
* 채용공고 엔티티에 시작일 및 마감일 필드 추가와 업데이트 로그 기능 구현 ([cfdb7d0](https://github.com/K-Soo/hotel-job-api/commit/cfdb7d04eb4c9f2f57b321e54ccf27b037b4a43b))
* 채용공고 엔티티에 우선순위 날짜 및 리스트 업 카운트 필드 추가 ([2dde6da](https://github.com/K-Soo/hotel-job-api/commit/2dde6da2d5bdab27f6ac1459d08bcae2b09301f9))
* 채용공고 응답 DTO 추가 ([6ce3ecb](https://github.com/K-Soo/hotel-job-api/commit/6ce3ecb81aaefa0519eb86e3e506fe0b9e8389d1))
* 채용공고 지원자 수 카운트 기능 추가 및 채용 상태 변경 로직 수정 ([b12efa2](https://github.com/K-Soo/hotel-job-api/commit/b12efa261578ec5649e6f4602edf6e752d01878c))
* 채용상품 결제 관련 쿠폰 기능 추가 및 무료 승인 요청 API 구현 ([ba22ff8](https://github.com/K-Soo/hotel-job-api/commit/ba22ff88691c2ab412ee146c4329e4bd4d6ef941))
* 채용상품 결제 관련 API 엔드포인트 추가 및 인증 가드 적용 ([3e9269f](https://github.com/K-Soo/hotel-job-api/commit/3e9269fc42768ab0b187c31a17c78458d1ef0b58))
* 최종 결정 상태 열거형을 발표 유형으로 변경 ([f98e2ba](https://github.com/K-Soo/hotel-job-api/commit/f98e2ba8c6c881ab125e7636874017a30e9c506e))
* 최종 결정 상태를 위한 FinalDecisionStatus 열거형 추가 ([157c711](https://github.com/K-Soo/hotel-job-api/commit/157c711f9d1427093246bd75ce022af947ae4ef3))
* 쿠폰 관련 사용자 정의 HTTP 예외 추가 ([7a8cb7f](https://github.com/K-Soo/hotel-job-api/commit/7a8cb7facc5bc9975e9e264371fe71fc1017bbac))
* 쿠폰 관리 기능 추가 및 개선 ([4fdda55](https://github.com/K-Soo/hotel-job-api/commit/4fdda550a3b846ac83b767999fd134c9769066a3))
* 쿠폰 관리 기능을 위한 CouponController 추가 ([ccdc7e3](https://github.com/K-Soo/hotel-job-api/commit/ccdc7e37730a6d852c7c8b01dfadc1f46a8a2a3b))
* 쿠폰 관리 기능을 위한 CouponModule 추가 ([9683e23](https://github.com/K-Soo/hotel-job-api/commit/9683e230cc1ca276410265753a3635609ea42509))
* 쿠폰 관리 기능을 위한 CouponService 추가 ([6777f6c](https://github.com/K-Soo/hotel-job-api/commit/6777f6cc16ac53b87d7a3937914938f4ebeac856))
* 쿠폰 만료 및 월별 쿠폰 발급을 위한 스케줄러 추가 ([ceef96a](https://github.com/K-Soo/hotel-job-api/commit/ceef96a19b78c53c8e02a78b87ede6308ac40d44))
* 쿠폰 및 결제 관련 테이블 구조 변경 및 새로운 열 추가 ([c81a103](https://github.com/K-Soo/hotel-job-api/commit/c81a1031ba42df9f5f4d912375aaf048c054435f))
* 쿠폰 생성을 위한 시더 파일 추가 ([88b2d91](https://github.com/K-Soo/hotel-job-api/commit/88b2d91debb8740e6b92872099121d8b9ba50419))
* 쿠폰 생성을 위한 CreateCouponDto 추가 ([db157d9](https://github.com/K-Soo/hotel-job-api/commit/db157d92604b17194352c9a5378d81a07e51f67e))
* 쿠폰 업데이트를 위한 UpdateCouponDto 추가 ([8f006ec](https://github.com/K-Soo/hotel-job-api/commit/8f006eceaf0045e0053dc9815f234f80a8542c76))
* 쿠폰 엔티티 추가 ([2e3c63d](https://github.com/K-Soo/hotel-job-api/commit/2e3c63de228da15ddea9f23986da589495ff1e35))
* 쿠폰 엔티티에 할인율 변환기 추가 및 만료일 필드 제거 ([efd8040](https://github.com/K-Soo/hotel-job-api/commit/efd8040d29bc45d8a14cb9c2c307e1d75f4d04b4))
* 쿠폰 적용을 위한 DTO 클래스 추가 ([5d78372](https://github.com/K-Soo/hotel-job-api/commit/5d783728b0f4cd536c3f55f628ef99bb6037f0a4))
* 쿠폰 정보 추가 및 사용 가능한 쿠폰 수 계산 기능 구현 ([c876fc3](https://github.com/K-Soo/hotel-job-api/commit/c876fc3db0e56150286aca5852e0aa8dcac9b388))
* 쿠폰 취소를 위한 DTO 클래스 추가 ([c189349](https://github.com/K-Soo/hotel-job-api/commit/c1893499d63d3edf6d12b7b4bcd0cc0f5c2374ce))
* 쿠폰 코드 및 설명 추가 ([3543ffb](https://github.com/K-Soo/hotel-job-api/commit/3543ffb7aa5b87f762ac1844fdf9ef061e02d988))
* 포인트 거래 엔티티 추가 ([4fc8a22](https://github.com/K-Soo/hotel-job-api/commit/4fc8a22286a9acc49114cca2d0d6269a3b48cadb))
* 포인트 거래 유형 및 적립률 상수 추가 ([6ac9f44](https://github.com/K-Soo/hotel-job-api/commit/6ac9f443a150f7c37ec0e3cb1c1b6ad0e1f09dc8))
* 포인트 관리 컨트롤러 추가 ([1bd6893](https://github.com/K-Soo/hotel-job-api/commit/1bd6893c145868d13da968ff1385fc59605f1c30))
* 포인트 모듈 및 관련 서비스, 컨트롤러 추가 ([0b7674e](https://github.com/K-Soo/hotel-job-api/commit/0b7674ef1a26e25d7ce58c1380bd631402d1c53a))
* 포인트 생성 DTO 클래스 추가 ([446147d](https://github.com/K-Soo/hotel-job-api/commit/446147d2eff8df8d2e59e6bf8c26959c09814401))
* 포인트 서비스 추가 ([2654918](https://github.com/K-Soo/hotel-job-api/commit/2654918ac7c2c1235467be0cdcb92aa4ff5f43e7))
* 포인트 업데이트 DTO 클래스 추가 ([c103e93](https://github.com/K-Soo/hotel-job-api/commit/c103e93a73e8037ceb686d3967e1d325b16c773e))
* 포인트 적립률을 2%에서 1%로 변경 ([070a15b](https://github.com/K-Soo/hotel-job-api/commit/070a15b829a63c882199f3c4aa76ac517fd6a557))
* 푸시 모듈 추가 및 서비스, 컨트롤러, 엔티티 설정 ([9e3e150](https://github.com/K-Soo/hotel-job-api/commit/9e3e1503c6ae9c8a6ee0a1fd819fe3b9be5f262c))
* 푸시 서비스 추가 및 FCM 토큰 저장 메서드 구현 ([44a90cc](https://github.com/K-Soo/hotel-job-api/commit/44a90ccd208eaf4b6d40005c2850f2e0aab3d3cf))
* 푸시 알림 관련 컨트롤러 추가 ([8c6c487](https://github.com/K-Soo/hotel-job-api/commit/8c6c4876b8c9bff61caec54308e3c34959f62b2e))
* 푸시 알림 설정을 위한 엔티티 추가 ([465ec67](https://github.com/K-Soo/hotel-job-api/commit/465ec67412a3f4e8a547fbe8a37312b72a1e9379))
* 할인 유형을 정의하는 DiscountType 열거형 추가 ([a70d3ae](https://github.com/K-Soo/hotel-job-api/commit/a70d3ae63a1c13319832c249d9d4c0833e88ff40))
* 헬멧 미들웨어 활성화 ([e919729](https://github.com/K-Soo/hotel-job-api/commit/e9197297fd4546513dfdd24c9d3f341348c1826f))
* 회원 등급 및 쿠폰 정보를 위한 시더 파일 추가 ([0832683](https://github.com/K-Soo/hotel-job-api/commit/0832683c401dd2e6eae1df22cb64ca4400eec336))
* 회원 등급 정보를 위한 시더 파일에서 상수 사용으로 리팩토링 ([42b56d5](https://github.com/K-Soo/hotel-job-api/commit/42b56d587ce1390a5b6318f2245eb37c7f61ccad))
* CouponModule을 인증 모듈에 추가 ([66306b9](https://github.com/K-Soo/hotel-job-api/commit/66306b9958cd2487842c61d10d548cd72c208859))
* create-coupon.dto.ts 파일 삭제 ([611df09](https://github.com/K-Soo/hotel-job-api/commit/611df09c9022fe6946acc136f7cd08a00ebcb845))
* create-employer-coupon.dto.ts 파일 추가 ([c507926](https://github.com/K-Soo/hotel-job-api/commit/c507926ac20d2814c9204970b2813c64c40dcac6))
* DelayMiddleware 적용 주석 처리 ([8da39a1](https://github.com/K-Soo/hotel-job-api/commit/8da39a102ad1feac88dd597f1f0497ecd40b9663))
* FCM 토큰 저장을 위한 DTO 추가 ([a8b300a](https://github.com/K-Soo/hotel-job-api/commit/a8b300aaea8d01d05218438c2b502fd72bc9894d))
* Membership 엔티티의 discountRate 필드의 소수점 자릿수 수정 및 변환기 추가 ([5f96f52](https://github.com/K-Soo/hotel-job-api/commit/5f96f52652cc45fa7084a19a0b28201bdd42f999))
* MEMBERSHIP_SEEDER 배열을 사용하여 멤버십 데이터베이스에 업서트 로직 추가 및 기존 반복문 주석 처리 ([d04c548](https://github.com/K-Soo/hotel-job-api/commit/d04c548654ea4a7935117d4b65002c369bb4a515))
* MembershipSeeder에서 membershipRepository 초기화 추가 ([b01fec6](https://github.com/K-Soo/hotel-job-api/commit/b01fec675760fe6aa74fff3c2858c74240220a27))
* Migration addMem ([113352a](https://github.com/K-Soo/hotel-job-api/commit/113352a2a750dea971ab253d65641ea68739eafa))
* Nationality 엔티티에 Recruitment 관계 추가 ([eaf9f5b](https://github.com/K-Soo/hotel-job-api/commit/eaf9f5b6580b2a446e0e295c5e22aa28fa6db324))
* NotificationModule 추가 및 DelayMiddleware 주석 해제 ([78ed95f](https://github.com/K-Soo/hotel-job-api/commit/78ed95f796d72c2bb81b6f18e1dce6573219acb0))
* OAuthController에서 디버깅 로그 주석 처리 ([3448170](https://github.com/K-Soo/hotel-job-api/commit/3448170a1be654dcf33494822c41c53af11c7ab1))
* package.json에 새로운 의존성 추가 및 타입 정의 업데이트 ([9783ce9](https://github.com/K-Soo/hotel-job-api/commit/9783ce94ec4962d2441bce8912e79bf43e4c7c95))
* Payment 엔티티에 결제 관련 필드 추가 및 주문 생성 로직 구현 ([2fb3bc9](https://github.com/K-Soo/hotel-job-api/commit/2fb3bc967778be4c8d27371c75e41dfc3cb754f8))
* PaymentTransaction 엔티티 추가 및 결제 관련 필드 정의 ([0dd7310](https://github.com/K-Soo/hotel-job-api/commit/0dd7310c91d147d37ac88d39ab7c59f8fa9590ef))
* PostgreSQL 설정에서 autoLoadEntities 주석 처리 ([5e990f3](https://github.com/K-Soo/hotel-job-api/commit/5e990f396e3b042e408d04038a2ff1491dbe44b0))
* production 환경에서 seeder 실행 방지 및 점수 필드 수정 ([c08f710](https://github.com/K-Soo/hotel-job-api/commit/c08f710828c9bb31a2db995521239776e6d26619))
* recruitment-recruit-product seeder에서 bonusDays 필드 제거 ([f3a8c3a](https://github.com/K-Soo/hotel-job-api/commit/f3a8c3a55985c60b515a246ba42335f0269f28c0))
* SerializeInterceptor에서 배열 및 객체 변환 로직 추가 ([53e4d55](https://github.com/K-Soo/hotel-job-api/commit/53e4d558285db72094cc58eaf4bf48d26bbfa8fe))
* Toss 결제 확인 응답 인터페이스 추가 ([d5a62dd](https://github.com/K-Soo/hotel-job-api/commit/d5a62dd726563a9acef4ded7aa3f916241e96562))
* Toss 모듈 추가 및 TossService 제공 ([97c8799](https://github.com/K-Soo/hotel-job-api/commit/97c879957d70a26f765ea8ecc4724732d234ce25))
* TossService 추가 및 결제 확인 기능 구현 ([50a1d27](https://github.com/K-Soo/hotel-job-api/commit/50a1d27ab40895753521c258ae8a418392b308ff))
* update-coupon.dto.ts 파일 삭제 ([f22f111](https://github.com/K-Soo/hotel-job-api/commit/f22f11155cc013e5fa671bdbcc3a1474eeb2e976))
* VerifyDto 임포트 제거 ([dce48c8](https://github.com/K-Soo/hotel-job-api/commit/dce48c81d2be46bd0e036948a2016f148867dffa))


### Bug Fixes

* 쿠폰 발급 주석에서 이모지 제거 ([42504c1](https://github.com/K-Soo/hotel-job-api/commit/42504c1564258ada2193f0d384ed305084c512a1))
* account-history.service.ts에서 변수 이름을 변경하여 가독성 향상 ([4eddcdd](https://github.com/K-Soo/hotel-job-api/commit/4eddcddb6f89c89cb90b928cbba52087f290f72f))
* certification.controller.ts에서 인증 관련 메서드 주석 처리 ([4349b2a](https://github.com/K-Soo/hotel-job-api/commit/4349b2ac55274fff0079697b43463a5d1dd3acb6))
* jwt.strategy.ts에서 불필요한 주석 제거 ([4da33b1](https://github.com/K-Soo/hotel-job-api/commit/4da33b15b259103d771173d6ca418c0edef1032b))
* seeder.ts에서 MEMBERSHIP_SEEDER 배열의 문법 오류 수정 ([42066c2](https://github.com/K-Soo/hotel-job-api/commit/42066c2e627bae0d0f67af3962dc3ac9626ec0dc))


### Refactors

* 이력서 엔티티에서 주석 제거 ([5677ed7](https://github.com/K-Soo/hotel-job-api/commit/5677ed7a0e08964b0cd4ede443c6e458d939ead0))
* findCertificationByUserUUid 메서드 이름 변경 및 인증 조회 로직 개선 ([66f9e61](https://github.com/K-Soo/hotel-job-api/commit/66f9e615857914ee3dfe858d35bf7aec21027b0f))
* recruit.controller.ts에서 불필요한 임포트 제거 ([e9d31a8](https://github.com/K-Soo/hotel-job-api/commit/e9d31a8d33fd7c839a8ce5822b176e0d077738f5))

### [0.0.12](https://github.com/K-Soo/hotel-job-api/compare/v0.0.11...v0.0.12) (2025-02-01)


### Features

* 고용주 멤버십 업데이트를 위한 시더 추가 ([d049e2d](https://github.com/K-Soo/hotel-job-api/commit/d049e2d8bcce3b5a65b3ab6ab9b87a994cfe92c5))
* 날짜 포맷 유틸리티에 다양한 포맷 추가 및 null 값 처리 개선 ([3eb33e4](https://github.com/K-Soo/hotel-job-api/commit/3eb33e4a09eac5728e2b335018705d9ad88edaec))
* 데이터 소스 구성 수정 및 로컬 환경에 따른 SSL 설정 추가 ([25cc4e9](https://github.com/K-Soo/hotel-job-api/commit/25cc4e982a4b87191dbbbb6999962b57eea3cb7f))
* 데이터 소스에 시더 옵션 추가 및 SSL 설정 수정 ([6cdfbaf](https://github.com/K-Soo/hotel-job-api/commit/6cdfbafc57aaf54617ef065ca166f72a04f39eb8))
* 로그아웃 시 refresh_token 쿠키 도메인 설정 추가 ([e0620e8](https://github.com/K-Soo/hotel-job-api/commit/e0620e8eb4bd98230956cbf2d4abacdd5202005c))
* 언어 열거형에 영어, 중국어, 독일어, 프랑스어, 러시아어 추가 ([40c2ac1](https://github.com/K-Soo/hotel-job-api/commit/40c2ac16f36cbb904d46e9e20e8ab9e0caad9195))
* 옵션 기간 가격 목록에 대한 즉시 로딩 설정 추가 ([659fb42](https://github.com/K-Soo/hotel-job-api/commit/659fb4215945d405604566c11c11cd74dbb05596))
* 유저 UUID 검색 시 유효성 검사 추가 ([2b3488b](https://github.com/K-Soo/hotel-job-api/commit/2b3488b4aaa421801413d959db0157abf1afd927))
* 이력서 프로필 이미지 업로드 및 조회 기능 추가 ([2741ea1](https://github.com/K-Soo/hotel-job-api/commit/2741ea18af226b393471a7ac51820ba7f1228d12))
* 이력서 필드의 기본값을 변경하는 마이그레이션 파일 이름 수정 ([fbcac72](https://github.com/K-Soo/hotel-job-api/commit/fbcac72f24cb447afc0b741933a5de1c0c3d4b8c))
* 이력서 필드의 기본값을 업데이트하는 마이그레이션 추가 ([ff20efe](https://github.com/K-Soo/hotel-job-api/commit/ff20efe255b1fb3eaab9dbb147195415284d281d))
* 제품 관련 데이터베이스 마이그레이션 추가 ([9642d4f](https://github.com/K-Soo/hotel-job-api/commit/9642d4ff6f96cd5101e38fb2e6f423817f9a5023))
* 제품 관련 데이터베이스 마이그레이션 파일 삭제 및 새로운 마이그레이션 파일 추가 ([ede4d0b](https://github.com/K-Soo/hotel-job-api/commit/ede4d0b78f2331ea14db22c9c1d80e4fef0ecc40))
* 제품 유형을 정의하는 ProductType 열거형 추가 ([3b31822](https://github.com/K-Soo/hotel-job-api/commit/3b3182296ebe83ba648163d15c0023046007adff))
* 지원서 상태 조회 및 업데이트 시 사용자 존재 여부 검사 추가 ([5ffaa35](https://github.com/K-Soo/hotel-job-api/commit/5ffaa359983ac3a6e6d8b862e4cf23191bcbc9bb))
* 채용 관련 제품 유형 및 옵션 정의를 위한 열거형 추가 ([2e16e52](https://github.com/K-Soo/hotel-job-api/commit/2e16e528d5c9ba5482844c5dd5984f1763951a81))
* 채용 상품 기간 엔티티 추가 ([8f5729d](https://github.com/K-Soo/hotel-job-api/commit/8f5729d44895b5feb80b5ac7237a7346a5cf63d4))
* 채용 상품 모듈에서 RecruitmentProduct 및 RecruitmentProductOption 엔티티 추가 ([9af562f](https://github.com/K-Soo/hotel-job-api/commit/9af562fdb7d80c76b6f9efabaddb021b3b5aa412))
* 채용 상품 목록 조회 기능 추가 ([899ec12](https://github.com/K-Soo/hotel-job-api/commit/899ec12d02d4b9b9c8a627b950041eb793ba02b4))
* 채용 상품 목록 API에 인증 및 권한 가드 추가 ([641801f](https://github.com/K-Soo/hotel-job-api/commit/641801facbc194eb833c84f466abf670368e06cf))
* 채용 상품 시더 추가하여 상품, 옵션 및 기간 데이터 생성 ([b5d0def](https://github.com/K-Soo/hotel-job-api/commit/b5d0deffd54bcfdb0fa7f947d01223bb62aa9628))
* 채용 상품 엔티티 추가 ([25dc4dc](https://github.com/K-Soo/hotel-job-api/commit/25dc4dc7883c895fba4befa81ac985d9731c6181))
* 채용 상품 옵션 기간 엔티티 추가 ([685cebd](https://github.com/K-Soo/hotel-job-api/commit/685cebdc3dfb2870a8fc60e54246bde92bd0e30c))
* 채용 상품 옵션 엔티티 추가 ([0e1179c](https://github.com/K-Soo/hotel-job-api/commit/0e1179c967ba53e7e1fa705ae4787a48e930e212))
* 채용 상품 옵션에 굵은 글씨 추가 ([cb78c22](https://github.com/K-Soo/hotel-job-api/commit/cb78c2246fb36497da1720ebd69855cc51600046))
* 채용 상품 쿼리 DTO 추가 및 상품 타입 검증 로직 구현 ([f1464d9](https://github.com/K-Soo/hotel-job-api/commit/f1464d9177979d93e7ee01c4575e54fe5becb825))
* 채용 생성 및 초안 작성 시 사용자 미존재 처리 추가 ([9b893ca](https://github.com/K-Soo/hotel-job-api/commit/9b893cac14ab5d3e11e46223960c71e8e2a59250))
* 채용 옵션 기간 엔티티에 보너스 일수 필드 추가 ([53d0b71](https://github.com/K-Soo/hotel-job-api/commit/53d0b712c44387cc4c9cd4972c354592e66029c5))
* 채용 제품 엔티티에서 할인율 필드 제거 ([844c78e](https://github.com/K-Soo/hotel-job-api/commit/844c78e9b85f4db89a79343eda2d1717572e5a0c))
* 프로필 이미지 업로드 시 파일 이름 포맷 변경 및 실패 처리 추가 ([59b481e](https://github.com/K-Soo/hotel-job-api/commit/59b481e3e9ce88bd3545ab6e81299d9d2df1b59c))
* 회사 등록 DTO의 상세주소 길이 제한 수정 ([d1dfdae](https://github.com/K-Soo/hotel-job-api/commit/d1dfdaeb09f3a87fd722973beb7e08e319dd4483))
* 회사 정보 등록 및 조회 시 사용자 UUID 처리 개선 ([d73f8cf](https://github.com/K-Soo/hotel-job-api/commit/d73f8cf04c3d3f674935169e211f7b3b7d39dc8d))
* 회원 마이그레이션 파일 이름 변경 및 기본값 수정 ([0f99fec](https://github.com/K-Soo/hotel-job-api/commit/0f99fec2b03d94fa4c6c840f4ec078953882e982))
* 회원 및 제품 관련 데이터베이스 마이그레이션 추가 ([adab79d](https://github.com/K-Soo/hotel-job-api/commit/adab79d21ad5c3164b7bd441eabdbce60e100807))
* ApplicationRecruitmentResponseDto 클래스 추가 ([1effceb](https://github.com/K-Soo/hotel-job-api/commit/1effceb3747126f75bdd922ba13ed30193add49a))
* DelayMiddleware를 모든 라우트에 적용 ([1dd80ec](https://github.com/K-Soo/hotel-job-api/commit/1dd80ec878296be179d1489f2b736284475dd0bd))
* Employer 엔티티에 Membership 관계 추가 및 score 필드 추가 ([881d768](https://github.com/K-Soo/hotel-job-api/commit/881d768885bb22af21e88a2ebbf6c3bb92894b84))
* EmployerResponseDto에 본인인증 정보 추가 ([e9aaae7](https://github.com/K-Soo/hotel-job-api/commit/e9aaae7f3c21875dbe0f9bc7aebff96c84b755a5))
* EmployersModule에 Membership 엔티티 추가 ([0884b67](https://github.com/K-Soo/hotel-job-api/commit/0884b6755c510105f35599567de535470157c8f8))
* EmployersService에 Membership 관련 기능 추가 및 리팩토링 ([eebf0c0](https://github.com/K-Soo/hotel-job-api/commit/eebf0c033c5bf52b744ff8a0090ac4cb57f1d576))
* Membership 시더 추가하여 다양한 멤버십 레벨 및 할인율 설정 ([960a8af](https://github.com/K-Soo/hotel-job-api/commit/960a8af7b068f3a7628b24ec1790f3cc4feb777b))
* Membership 엔티티 추가 ([6aa5550](https://github.com/K-Soo/hotel-job-api/commit/6aa5550f6bc5313d0f7fd822c99e1c437abe8cee))
* Membership 엔티티에 discountRate 필드 추가 ([e62b75b](https://github.com/K-Soo/hotel-job-api/commit/e62b75b92e340137a040c95e01c516b653d8ca52))
* membership seeder에서 불필요한 공백 제거 ([47bbbba](https://github.com/K-Soo/hotel-job-api/commit/47bbbba32a12eeed34ccf6be7d0578ecc31723da))
* MembershipController 추가 및 MembershipService 주입 ([6ed044d](https://github.com/K-Soo/hotel-job-api/commit/6ed044dc4c732d989e64c78b3b89c0f956f782f0))
* MembershipLevel 열거형 추가하여 다양한 멤버십 레벨 정의 ([3297e94](https://github.com/K-Soo/hotel-job-api/commit/3297e94c35b0475b9cc14337d2c63ab7fe348d64))
* MembershipModule 추가 및 MembershipService와 MembershipController 주입 ([aebef83](https://github.com/K-Soo/hotel-job-api/commit/aebef83c202c4a545d141c3decd1264852e9bacf))
* MembershipService 추가 ([c362d21](https://github.com/K-Soo/hotel-job-api/commit/c362d21aee0faa733c18e03602ba73ce839209b8))
* package.json에 seed 관련 스크립트 추가 및 typeorm-extension 의존성 추가 ([66fac45](https://github.com/K-Soo/hotel-job-api/commit/66fac45ac07b37a8c63aad4578e9655a444b03be))
* Product 엔티티 삭제 ([85d1b1f](https://github.com/K-Soo/hotel-job-api/commit/85d1b1fb190d9bd172733e311035c9c5f3ee565b))
* Product 엔티티 추가 ([b820480](https://github.com/K-Soo/hotel-job-api/commit/b820480229aefe85d381a592f70ab38fd0746c3f))
* ProductsController 추가 ([90316b8](https://github.com/K-Soo/hotel-job-api/commit/90316b864e5ab48f72f3b1d37344f29ffbfb83dd))
* ProductsModule 및 MembershipModule을 app.module.ts에 추가 ([dcc2f0d](https://github.com/K-Soo/hotel-job-api/commit/dcc2f0d6f6e3205ac5bdee57885db9dd4cc7ae5f))
* ProductsModule 추가 및 ProductsService와 ProductsController 주입 ([4c0a58d](https://github.com/K-Soo/hotel-job-api/commit/4c0a58d9258451c9f6e36f8960caacff1288897c))
* ProductsService 추가 ([ba534da](https://github.com/K-Soo/hotel-job-api/commit/ba534dab75598a5eeb5c3d4987a830a23ac006be))
* S3 서비스에 파일 스트리밍 기능 추가 및 오류 로깅 개선 ([629d776](https://github.com/K-Soo/hotel-job-api/commit/629d776f1e30aa0f06aeb60c58395cb0c4534afd))
* seed 명령어 간소화 및 DelayMiddleware 주석 처리 ([8137d25](https://github.com/K-Soo/hotel-job-api/commit/8137d2504c5c138c3437675ebc5e1c2b6f69ef05))


### Bug Fixes

* 데이터베이스 구성 파일에 공백 추가 ([ca19a4f](https://github.com/K-Soo/hotel-job-api/commit/ca19a4f62b0b8a08686514f671018e207e7899f8))
* 이력서 복사 시 경험 필드 복사 및 기본 이력서 처리 로직 개선 ([9c9416c](https://github.com/K-Soo/hotel-job-api/commit/9c9416cab45bfa94d8ea9d579586f87cd20d1eed))
* 이력서 테이블에서 불필요한 필드 제거 및 기본값 수정 ([50a38b6](https://github.com/K-Soo/hotel-job-api/commit/50a38b6dbd926af6934b878c0bf2e90b18e7e3fe))
* ApplicationResponseDto에 reviewStageStatus 및 recruitment 필드 추가 ([e0513be](https://github.com/K-Soo/hotel-job-api/commit/e0513be056904597738a6120daf3c964a432184d))
* EmployersController에서 직렬화 인터셉터 주석 처리 ([9492d3b](https://github.com/K-Soo/hotel-job-api/commit/9492d3bc289659aac03f1bfc86185a1224e2e534))
* Experience 엔티티에서 로그 삽입 메서드 주석 처리 ([60d9d19](https://github.com/K-Soo/hotel-job-api/commit/60d9d198c8b63240c2db3dac4544ac0ae76941b6))
* LanguageDto의 필드 이름을 수정하여 일관성 및 가독성 향상 ([a553e54](https://github.com/K-Soo/hotel-job-api/commit/a553e546efc4ed7dc9c6cc18701b5ced21b7e681))
* LicenseDto의 자격증 이름 길이 제한을 수정하여 유효성 향상 ([a8304fc](https://github.com/K-Soo/hotel-job-api/commit/a8304fcc5345f5b4c8c6861abe54508bdbf322a1))
* PaymentModule에서 imports 순서 수정 ([f733d43](https://github.com/K-Soo/hotel-job-api/commit/f733d4318a98f817d7aadcac5eee0c3f5ca49e4c))
* PublishResumeDto의 언어 필드 이름을 수정하여 일관성 향상 ([2a49fc0](https://github.com/K-Soo/hotel-job-api/commit/2a49fc0fa12ed437852961bc1eb0a41d652e1d85))
* RecruitmentModule에서 불필요한 Application 엔티티 임포트 제거 ([8f4873a](https://github.com/K-Soo/hotel-job-api/commit/8f4873ac313a3761931725655b7974336cbdd6e0))
* Resume 엔티티의 언어 필드 이름을 수정하여 가독성 향상 ([e216433](https://github.com/K-Soo/hotel-job-api/commit/e216433efb01db150eae78a8eb2cfff11473a4c3))


### Refactors

* Payment 엔티티에서 불필요한 import 제거 ([550a1f8](https://github.com/K-Soo/hotel-job-api/commit/550a1f80ec6053cc1e4cd46355550c6617f3a28f))

### [0.0.11](https://github.com/K-Soo/hotel-job-api/compare/v0.0.10...v0.0.11) (2025-01-21)


### Features

* 사용자 UUID 및 역할에 따라 인증 정보를 조회하는 findCertificationByUserUUid 메서드 추가 ([9475d80](https://github.com/K-Soo/hotel-job-api/commit/9475d80a2f9cbed2bbe903570589251445a3ff7e))
* 이력서 생성 및 게시 기능 개선, 인증 정보 기반으로 기본 프로필 데이터 설정 ([3512f17](https://github.com/K-Soo/hotel-job-api/commit/3512f17e3f7520f410263d82cc2f90d338adc617))
* 이력서 열람처리 기능 추가 ([8b331bf](https://github.com/K-Soo/hotel-job-api/commit/8b331bff52394498e2a665a110b19d9c6f530eac))
* 이력서 열람처리 기능 추가 및 관련 API 엔드포인트 구현 ([4bdfa0f](https://github.com/K-Soo/hotel-job-api/commit/4bdfa0f2632acdb6deea0d0d4e17bc11cb17998c))
* 인증 관련 로직에서 로그 메시지 개선 및 VerifyDto 필드에 선택적 데코레이터 추가 ([6d697ba](https://github.com/K-Soo/hotel-job-api/commit/6d697ba02bafe31ff432c8f205b2c0f34d7fa0ef))
* 인증 관련 로직에서 VerifyDto를 any로 변경하여 유연성 증가 ([2d29b28](https://github.com/K-Soo/hotel-job-api/commit/2d29b284569f49c5f1f1da3be26cea0d03d7f372))
* 인증 서비스에서 사업자 및 일반 유저 처리 로직 개선 및 DTO 필드 정리 ([61a3fb7](https://github.com/K-Soo/hotel-job-api/commit/61a3fb78a2a7cc26f16141b0f6a9c6439dbd71ba))
* 인증 엔티티에서 민감한 필드에 Exclude 데코레이터 추가 ([6199bfe](https://github.com/K-Soo/hotel-job-api/commit/6199bfe363b9e0da759bd6c48a9a239a127dbbee))
* 카카오 OAuth 전략에서 오류 로그 개선 ([1d89896](https://github.com/K-Soo/hotel-job-api/commit/1d8989636b693dc80d29ee98e30ba398b1eee4c0))
* applicants.service.ts에 유저 정보 및 uuid로 유저 찾기 주석 추가 ([f353512](https://github.com/K-Soo/hotel-job-api/commit/f353512cce3be2b73299dd3e783a551036125f1d))
* CertificationModule에서 CertificationService를 export하여 모듈 간 재사용성 증가 ([783acc4](https://github.com/K-Soo/hotel-job-api/commit/783acc47d07b343dcd7454f2e44879d0f1f741d3))
* CertificationModule을 이력서 모듈에 추가 ([7d88287](https://github.com/K-Soo/hotel-job-api/commit/7d8828702c8b39ac8d927cf7fee50ff37f3938f8))
* CreateExperienceDto에서 불필요한 필드 제거 및 코드 정리 ([a315f71](https://github.com/K-Soo/hotel-job-api/commit/a315f71e47ea6a3250d44e376399f197ed49faf2))
* Experience 엔티티에서 불필요한 필드 제거 및 Exclude 데코레이터 추가 ([8b44da8](https://github.com/K-Soo/hotel-job-api/commit/8b44da8e1a1945ac8a787432d56d903ab907d92a))
* Resume 엔티티에서 경험 및 병역사항 관계에 cascade 옵션 추가 ([ae5f3cd](https://github.com/K-Soo/hotel-job-api/commit/ae5f3cdb98445ec3bf6c0ea0a11ec7ac2bc97951))


### Bug Fixes

* Military 엔티티에서 Resume 관계의 필드 이름을 수정 ([99f86b2](https://github.com/K-Soo/hotel-job-api/commit/99f86b276044e1f80d497e1f3e59fdcce9842d95))
* PublishResumeDto에서 experiences 필드를 experience로 수정 ([072c391](https://github.com/K-Soo/hotel-job-api/commit/072c39174eb2ea48c9d0a5fd373f90c71f04b475))
* resumes.controller.ts 파일에 공백 추가 ([f9dbe5e](https://github.com/K-Soo/hotel-job-api/commit/f9dbe5ec1378bcffd5a5020f800e2c86df5d0039))

### [0.0.10](https://github.com/K-Soo/hotel-job-api/compare/v0.0.9...v0.0.10) (2025-01-20)


### Features

* 계정 삭제 요청 기능 추가 ([97bb126](https://github.com/K-Soo/hotel-job-api/commit/97bb126fb8d267d4fc5f14df6795891ed67607da))
* 계정 상태 상수에서 'DELETED'를 'DEACTIVATED'로 변경 ([2203ea0](https://github.com/K-Soo/hotel-job-api/commit/2203ea0f0c79fc556c90fcaaf1095035f52343bd))
* 계정 상태에 따른 예외 처리 로직 추가 ([7cfa221](https://github.com/K-Soo/hotel-job-api/commit/7cfa221341d0b6fc09ee3568a0c84a9da829edbd))
* 계정정보 조회 메서드 추가 및 인증 정보 포함 ([fda601f](https://github.com/K-Soo/hotel-job-api/commit/fda601f923bd5192dbbb48721f002451ad58bcdf))
* 고용주를 위한 채용 지원 조회 기능 추가 및 역할 필드 제거 ([4f9eaf8](https://github.com/K-Soo/hotel-job-api/commit/4f9eaf8daf5b42815a56faf6aeecc86067a8e8b4))
* 구글 커스텀 전략에서 디버깅 로그 제거 ([59283fe](https://github.com/K-Soo/hotel-job-api/commit/59283fe16f11400e56ecdc882d4137cb26408d2b))
* 국적 관련 DTO 설명 수정 ([5a988cc](https://github.com/K-Soo/hotel-job-api/commit/5a988cc5861d4da6e7a877d4e36a74a3ca1b54b9))
* 라이센스 관련 DTO 및 엔티티, 서비스, 컨트롤러 삭제 ([0d3064f](https://github.com/K-Soo/hotel-job-api/commit/0d3064fe1ba5d579eedc3c27877ea3af67ce802a))
* 라이센스 모듈 제거 및 지원서 모듈 추가 ([f0350cf](https://github.com/K-Soo/hotel-job-api/commit/f0350cf6bbd24faf6bf39db71ad7832deb20c252))
* 리뷰 단계 업데이트를 위한 DTO 추가 ([cc7bef1](https://github.com/K-Soo/hotel-job-api/commit/cc7bef10396453a5c4af631b4dbe2d5a9202781f))
* 사업자 번호 검증 로직 추가 및 서비스 개선 ([d3a2588](https://github.com/K-Soo/hotel-job-api/commit/d3a25880b135fb37860a4b48355e9866965705fa))
* 사업자 번호 검증 API 추가 ([d004aca](https://github.com/K-Soo/hotel-job-api/commit/d004acae9f8eec48b80d1722d2c3978e8c021926))
* 사업자 유저 계정정보 조회 API 추가 및 인증 가드 적용 ([c1e05b8](https://github.com/K-Soo/hotel-job-api/commit/c1e05b8cc7a0233f87fddaaf35f25206ca55ab40))
* 사업자 전용 전형 이동 단계 추가 및 전형 단계 주석 수정 ([439298d](https://github.com/K-Soo/hotel-job-api/commit/439298da93fa91466e6219442f45a96d80448de6))
* 사업자번호 DTO 클래스 추가 및 유효성 검사 설정 ([c99dd8d](https://github.com/K-Soo/hotel-job-api/commit/c99dd8db1f826dcc0bca63143b685b29f7f91f8b))
* 사용자 계정 상태에 대한 새로운 예외 메시지 추가 ([43c1fc0](https://github.com/K-Soo/hotel-job-api/commit/43c1fc0022c81d69e96a9b5bd611901726d0b6e2))
* 사용하지 않는 UpdateEmployerDto 임포트 제거 ([803f6c1](https://github.com/K-Soo/hotel-job-api/commit/803f6c118521c94a27d50ff63b062dd5dc66bd96))
* 응답 상태에 '사용 가능' 추가 ([26a60dc](https://github.com/K-Soo/hotel-job-api/commit/26a60dc045dea881f9d95707625036c367dce90a))
* 이력서 게시를 위한 DTO 추가 및 필드 정의 ([2f51339](https://github.com/K-Soo/hotel-job-api/commit/2f51339ed1cc1156c8f2ffc177bd7f6c10fcb751))
* 이력서 관련 API에서 사용자 UUID 직접 사용으로 코드 간소화 ([3ea91ed](https://github.com/K-Soo/hotel-job-api/commit/3ea91edb4598bf08537dfe063e40a5e584178f14))
* 이력서 삭제 기능 개선 및 접근 권한 검증 추가 ([8ec47a4](https://github.com/K-Soo/hotel-job-api/commit/8ec47a4faffbd6a8f7e9fcf08c0f068c463ada3d))
* 이력서 생성 및 게시 기능 개선, 기본 이력서 복사 및 조회 기능 추가 ([9694871](https://github.com/K-Soo/hotel-job-api/commit/96948716d592789fb91970254604abc1aaa81281))
* 이력서 생성 및 제출 기능 추가, 상세조회 및 리스트 조회 개선 ([794b06e](https://github.com/K-Soo/hotel-job-api/commit/794b06ef808d47e71aa8c485540fb8d91a4e551b))
* 이력서 엔티티 수정 및 자격증 DTO 통합, 필수 정보 추가 ([3ce60a3](https://github.com/K-Soo/hotel-job-api/commit/3ce60a379b00d3026d5177c7c3e7d628c6648b83))
* 이력서 응답 DTO 수정 및 애플리케이션 목록 추가 ([ff5e457](https://github.com/K-Soo/hotel-job-api/commit/ff5e457d7af8a7af543a81d274456abe8c539dbb))
* 인증 응답 DTO(CertificationResponseDto) 추가 ([523c70a](https://github.com/K-Soo/hotel-job-api/commit/523c70ade4184eef58e372fd9d01aabb8bec6010))
* 인증서 중복 생성 방지를 위한 충돌 예외 처리 추가 ([87a7803](https://github.com/K-Soo/hotel-job-api/commit/87a7803b1ed045b4210b6a07a0a39baa62eb05cc))
* 자격증 DTO 추가 및 유효성 검사 설정 ([64fd7df](https://github.com/K-Soo/hotel-job-api/commit/64fd7dfc51f1a41824998be32bf30765811deb4a))
* 지역 코드 및 성별 코드 추가, 이력서 상태 수정 ([d6922db](https://github.com/K-Soo/hotel-job-api/commit/d6922db02a02541bf003af607a349a7cdd83f23f))
* 지원서 상태 및 심사 단계 상태를 나타내는 상수 열거형 추가 ([897606b](https://github.com/K-Soo/hotel-job-api/commit/897606b1335eebe8127f9279cc73b30cec250b4f))
* 지원서 엔티티를 RecruitmentModule에 추가 ([a570fa6](https://github.com/K-Soo/hotel-job-api/commit/a570fa6d75ef6e679c2c8a8d4ae07c0371d50cb5))
* 지원서 엔티티에서 역할 필드 제거 및 날짜 필드 기본값 설정 ([531a7b8](https://github.com/K-Soo/hotel-job-api/commit/531a7b869fc956d4dac0428735cd133c501b5708))
* 지원서 제출 및 상태 확인을 위한 ApplicationsController 추가 ([c151831](https://github.com/K-Soo/hotel-job-api/commit/c151831e180b4b66e614ca9a727db55ae3d7a6a1))
* 지원서 제출을 위한 ApplyResumeDto 추가 ([ac4aa18](https://github.com/K-Soo/hotel-job-api/commit/ac4aa18b600eba444dbbd290cbb955ebcad283b4))
* 지원자 전형 상태 업데이트 및 통계 계산 기능 추가 ([80a6a39](https://github.com/K-Soo/hotel-job-api/commit/80a6a395f13466a00f13bfe0c82ddab650dadcba))
* 채용 공고 상세 조회 기능 개선 및 쿼리 로깅 추가 ([404ce07](https://github.com/K-Soo/hotel-job-api/commit/404ce07a5fb9dd2052ba977ac7027098d1a8dfcf))
* 채용 관련 열거형 추가 ([d1149cd](https://github.com/K-Soo/hotel-job-api/commit/d1149cdfbbcaeb7b0162c733aebf5eb4985f860e))
* 채용공고 관련 API 엔드포인트 추가 및 수정 ([f187112](https://github.com/K-Soo/hotel-job-api/commit/f1871121ff977d4645c87db4279fd90d5a267e73))
* 채용공고 상태별 지원자 통계 및 전형 상태 변경 기능 추가 ([6e8cffe](https://github.com/K-Soo/hotel-job-api/commit/6e8cffebc7d3b70712752f5d50a4e5845f5dec76))
* 채용공고 지원 관련 API 엔드포인트 추가 및 Swagger 문서화 ([69a9d50](https://github.com/K-Soo/hotel-job-api/commit/69a9d50ee0a184140b3fc75dfd9f2d764606bc2d))
* 채용공고의 지원서 통계 추가 및 응답 형식 개선 ([8f32d8b](https://github.com/K-Soo/hotel-job-api/commit/8f32d8b0470098b4192d3f00c33fb56108c3f430))
* 카카오 OAuth 전략에서 회원가입 요청 시 오류 처리 및 타임아웃 증가 ([1e2e921](https://github.com/K-Soo/hotel-job-api/commit/1e2e9211717913f22f56f0775f4dc7b740c407a3))
* 코드 변경 사항에 대한 설명 추가 ([30693b1](https://github.com/K-Soo/hotel-job-api/commit/30693b1bcc446031a3989630f03251791c36a508))
* AccountHistory 엔티티 추가 및 계정 상태 변경 이력 관리 기능 구현 ([30b566e](https://github.com/K-Soo/hotel-job-api/commit/30b566ec8b64d69e62b565432b524f273ccd993f))
* AccountHistoryController 추가 ([785e117](https://github.com/K-Soo/hotel-job-api/commit/785e117bd733b83f657606f469112fcb719b62d7))
* AccountHistoryModule 추가 및 의존성 주입 설정 ([e433339](https://github.com/K-Soo/hotel-job-api/commit/e4333392b9bd7186a548443aa5b79b0f421efa78))
* AccountHistoryModule을 ApplicantsModule에 추가하여 의존성 주입 구현 ([ead2b2b](https://github.com/K-Soo/hotel-job-api/commit/ead2b2be2ef808b788c8ec7cd33e3985c2e1474c))
* AccountHistoryService 추가 및 계정 상태 변경 이력 관리 메서드 구현 ([668ae79](https://github.com/K-Soo/hotel-job-api/commit/668ae79f40df5fe621e54e4bcd61527c0a1318c3))
* Add hotelName to locationInfo in RecruitmentService ([01e6fc6](https://github.com/K-Soo/hotel-job-api/commit/01e6fc639ea148d98dce3c8d83a80a5218dd74df))
* Amazon ECS 배포 작업 정의를 v2로 업데이트 ([9f37d4b](https://github.com/K-Soo/hotel-job-api/commit/9f37d4bf7326c8e7f3de8fe4f075739e37f10ed3))
* Applicant 엔티티에 AccountHistory 관계 추가 ([0d78a24](https://github.com/K-Soo/hotel-job-api/commit/0d78a24fcc2f849c309ebdd57aa7d381b4094fcf))
* Applicant 엔티티에서 User 관계 제거 및 이메일 필드 추가 ([6ee25a5](https://github.com/K-Soo/hotel-job-api/commit/6ee25a518cba121c29580b8e4f1032637a66436d))
* ApplicantsController에서 사용자 생성 기능 제거 ([74b9042](https://github.com/K-Soo/hotel-job-api/commit/74b90422f1952837d78467ac0a70b9cb32d0d39d))
* ApplicantsService에 계정 비활성화 기능 추가 및 계정 상태 처리 로직 개선 ([4c387a6](https://github.com/K-Soo/hotel-job-api/commit/4c387a69e29aa8494f8c9956ca0266bc1b912066))
* ApplicantsService에 이메일 및 제공자 추가, findOne 메서드에 인증 관계 포함 ([b979e6c](https://github.com/K-Soo/hotel-job-api/commit/b979e6c77de20bebcee68e9a8f37201a14985875))
* Application 엔티티 추가 및 지원 관련 속성 정의 ([29e1724](https://github.com/K-Soo/hotel-job-api/commit/29e172417dfb113749422bd830023581b3a9cead))
* Application 엔티티에 viewAt 필드 추가 및 날짜 열 속성 수정 ([0b0dbf7](https://github.com/K-Soo/hotel-job-api/commit/0b0dbf7bc3fdce7ad5d259903f744997f1c14a9b))
* ApplicationResponseDto 추가 및 응답 데이터 구조 정의 ([b1dd30c](https://github.com/K-Soo/hotel-job-api/commit/b1dd30cf24f6b8eff52421f7e3a7e6eea29f23a7))
* ApplicationResponseDto에 applyAt 필드 추가 ([d1dea81](https://github.com/K-Soo/hotel-job-api/commit/d1dea81cefc8dd7898bb50746f083866b2af52c7))
* ApplicationsController에 지원 내역 조회 메서드 추가 및 역할 수정 ([41a5193](https://github.com/K-Soo/hotel-job-api/commit/41a51935382cb8f02cf47c30dc0896e9c035c60b))
* ApplicationsController에서 사용자 UUID 필드 변경 ([eaee78f](https://github.com/K-Soo/hotel-job-api/commit/eaee78fef066006ea4fc971bc9e28e60048e2e73))
* ApplicationsModule 추가 및 관련 서비스, 컨트롤러 설정 ([9a8f370](https://github.com/K-Soo/hotel-job-api/commit/9a8f3706886e12c0bde92485c66ab5b93b6e164e))
* ApplicationsModule에 EmployersModule 추가 ([381d870](https://github.com/K-Soo/hotel-job-api/commit/381d870bf5e43d222695be534d480fc8f9bafa21))
* ApplicationsService 추가 및 이력서 지원 기능 구현 ([430fbae](https://github.com/K-Soo/hotel-job-api/commit/430fbae38640b8b11c3ff1c84294dd464d5864c6))
* ApplicationsService에 지원 내역 계산 메서드 추가 ([bc4bb5a](https://github.com/K-Soo/hotel-job-api/commit/bc4bb5af222e6011dc270fb50e81d1f2b2bf1711))
* Benefits 열거형 추가 ([52e76c6](https://github.com/K-Soo/hotel-job-api/commit/52e76c6969ea2f365bb610e33b05eed3c9fa4bae))
* certification.service.ts에 공백 추가 ([33de8d2](https://github.com/K-Soo/hotel-job-api/commit/33de8d2b6661678707b409cf6b8dcdcce14a77bf))
* CompanyModule에서 CompanyService를 내보내도록 수정 ([5c26213](https://github.com/K-Soo/hotel-job-api/commit/5c2621313706bd061803351173066f01e6778d0a))
* CompanyService에 사업자 등록번호 조회 메서드 추가 ([2b34c3f](https://github.com/K-Soo/hotel-job-api/commit/2b34c3f6ab28b3417270cd9ac21e1890c425a2d4))
* ConditionInfoDto 클래스 추가 및 필드 정의 ([4b38d5a](https://github.com/K-Soo/hotel-job-api/commit/4b38d5ad54f36f2648d02a679a4b54193e212411))
* CreateRecruitmentDto 클래스 추가 ([3b4e98f](https://github.com/K-Soo/hotel-job-api/commit/3b4e98f42ddec81b749ec2cca56782edee94bf78))
* CreateRecruitmentDto 클래스에 필드 및 유효성 검사 추가 ([9778cb4](https://github.com/K-Soo/hotel-job-api/commit/9778cb4d560a122b0fc5157eb9e7f8bce1dd7abc))
* CryptoModule 추가 및 CryptoService 제공 ([564aef6](https://github.com/K-Soo/hotel-job-api/commit/564aef66246bee7bc63f69253ae7f114fa31558a))
* CryptoService 추가 및 AES 암호화/복호화 기능 구현 ([dd43cec](https://github.com/K-Soo/hotel-job-api/commit/dd43cec694efadbb1754a69e8126a975a499d001))
* custom-http-exception에 NOT_MODIFIED 및 BAD_REQUEST_REMOVE 추가 ([839e01e](https://github.com/K-Soo/hotel-job-api/commit/839e01e82e07855427f8603d023d54dd6cb8a982))
* dateFormat 유틸리티 추가하여 현재 날짜 포맷팅 기능 구현 ([95c1f0c](https://github.com/K-Soo/hotel-job-api/commit/95c1f0c6d1a2259d549083e71da01302ff042ecb))
* DelayMiddleware 적용 주석 처리 ([bb1e62f](https://github.com/K-Soo/hotel-job-api/commit/bb1e62f62b52be4bdcbe252654007a80ac105303))
* DelayMiddleware 추가 및 전역 미들웨어에 적용 ([2a3458a](https://github.com/K-Soo/hotel-job-api/commit/2a3458a3e8ab201be9292dff334228211e87ece9))
* DelayMiddleware 추가하여 요청 처리 지연 기능 구현 ([f4bf856](https://github.com/K-Soo/hotel-job-api/commit/f4bf8566abae0f94d0b58ea75a93cfa33cffee2b))
* DelayMiddleware를 모든 라우트에 적용 ([4969be8](https://github.com/K-Soo/hotel-job-api/commit/4969be8719ef3e79d282b665f8f2fe133a5dd071))
* DraftRecruitmentDto 클래스 추가 및 필드 정의 ([7717937](https://github.com/K-Soo/hotel-job-api/commit/771793787c8ac50d96be636cb15c7415f70de8a7))
* Employer 엔티티에 AccountHistory 관계 추가 ([3440e79](https://github.com/K-Soo/hotel-job-api/commit/3440e7966578f6e48234b945e0dfd4b10303af81))
* Employer 엔티티에 Recruitment와의 일대다 관계 추가 ([4f98b5f](https://github.com/K-Soo/hotel-job-api/commit/4f98b5f6354ba01dfdc07f45c648575af769bc48))
* EmployerResponseDto 클래스 추가 및 API 문서화 ([5326ecd](https://github.com/K-Soo/hotel-job-api/commit/5326ecd50c1b672a4496b4241f8960b675414446))
* EmployerResponseDto 파일 삭제 ([5cb417e](https://github.com/K-Soo/hotel-job-api/commit/5cb417eb3a12612868ae0a7d932384665d41fa88))
* EmployerResponseDto에 본인인증 정보 필드 추가 ([3719618](https://github.com/K-Soo/hotel-job-api/commit/3719618ea07731783fae571ea78de92d529fdcf2))
* EmployerResponseDto에서 인증정보 및 닉네임 필드 수정 및 주석 처리 ([92d7e6c](https://github.com/K-Soo/hotel-job-api/commit/92d7e6c451bfbc23f89cafc844231feed127ad53))
* EmployersController에서 불필요한 의존성 제거 ([3802272](https://github.com/K-Soo/hotel-job-api/commit/3802272358f89e00cec5998836d9d9c90a56b586))
* EmployersController에서 사용자 UUID 필드를 서브로 변경 ([2db45da](https://github.com/K-Soo/hotel-job-api/commit/2db45da2fe4fd651d6dcd61ac40d80c4fb81892b))
* findByUserId에서 사용자 존재 여부 확인 후 계정 상태 처리 추가 ([e07f00c](https://github.com/K-Soo/hotel-job-api/commit/e07f00c22e1e06500ccb2a1dbf8a7e308c5fa2c9))
* Google OAuth 인터페이스 추가 ([8686ce6](https://github.com/K-Soo/hotel-job-api/commit/8686ce63fa5643b0981ae1226c140be0cb2c1dd9))
* GoogleCustomStrategy 추가 및 OAuth 사용자 인증 로직 구현 ([a815753](https://github.com/K-Soo/hotel-job-api/commit/a815753b7e1ea7e9844a5f0941e48f4cf543c976))
* Job 열거형 이름 변경 및 EducationConditionLevel 열거형 제거 ([6e683f8](https://github.com/K-Soo/hotel-job-api/commit/6e683f882ba60eca3bb34e74b2f73b6cea39d049))
* Job enum 이름을 Jobs로 변경하여 일관성 유지 ([21b0fd7](https://github.com/K-Soo/hotel-job-api/commit/21b0fd7b62ad0e5a9bc7a695c337f24366d12041))
* JWT 전략에서 액세스 토큰 로그 추가 ([2726e6f](https://github.com/K-Soo/hotel-job-api/commit/2726e6f462cdfb3f184de6686d66226720a5d39d))
* JWT 전략에서 payload.sub을 verifyToken.sub으로 변경 ([1f71d30](https://github.com/K-Soo/hotel-job-api/commit/1f71d306beae3d76dd2d9cce1c094f5482ead14c))
* JwtStrategy에서 디버그 로그 및 주석 제거 ([2ab727f](https://github.com/K-Soo/hotel-job-api/commit/2ab727f25bca978373ea6bec324dcbe2f524efe8))
* KakaoCustomStrategy에서 OAuth 데이터 변수명 변경 및 사용자 생성 로직 수정 ([572986d](https://github.com/K-Soo/hotel-job-api/commit/572986df1ea99d6547ad064b67e11ea51e54f8b7))
* locationInfo.dto에 hotelName 속성 추가 ([b50b113](https://github.com/K-Soo/hotel-job-api/commit/b50b113ce1fcc1450059561b460483669bd83280))
* LocationInfoDto 클래스 추가 및 필드 정의 ([4a4fabc](https://github.com/K-Soo/hotel-job-api/commit/4a4fabc2acec1a70ea91934bdbe4b0be488f5a12))
* lodash 타입 정의 추가 ([c664347](https://github.com/K-Soo/hotel-job-api/commit/c6643470c81bbeae7bd193ec1179c01fd4134c5a))
* lodash 타입 정의 추가 ([fe372fa](https://github.com/K-Soo/hotel-job-api/commit/fe372fa3c3509519625536b0680a66b758f0b54a))
* ManagerInfoDto 클래스 추가 및 필드 정의 ([02a7582](https://github.com/K-Soo/hotel-job-api/commit/02a7582629429a5b820db22d1e6fb174434dde86))
* Nationality 엔티티 추가 및 필드 정의 ([4583bfc](https://github.com/K-Soo/hotel-job-api/commit/4583bfcb91bb7a031f6a3d9bdf1bbe499591b6b6))
* OAuth 사용자 정보 가져오기 실패에 대한 사용자 정의 예외 추가 ([fe06bd0](https://github.com/K-Soo/hotel-job-api/commit/fe06bd0ed02a9b7caeb26729f83d536f87955bc0))
* OauthController에 Google 로그인 기능 추가 및 불필요한 로그 제거 ([61b6ed7](https://github.com/K-Soo/hotel-job-api/commit/61b6ed7170a0017ddaa23c4f2c7017b3a3d89016))
* OauthModule에 GoogleCustomStrategy 추가 ([570f691](https://github.com/K-Soo/hotel-job-api/commit/570f69163d4d6592895eddcefd3deee39de9126c))
* package.json 및 pnpm-lock.yaml에 crypto-js, lodash, moment 추가 ([2ecd0a2](https://github.com/K-Soo/hotel-job-api/commit/2ecd0a29e455909d0ee361425c17a44320886d72))
* pagination.helper.ts 파일 추가 및 페이징 결과 포맷팅 함수 구현 ([30be3ef](https://github.com/K-Soo/hotel-job-api/commit/30be3eff9f4df90bfaa4d2bbe04fd82bc2d177b9))
* Payment 엔티티 추가 ([b8af6bd](https://github.com/K-Soo/hotel-job-api/commit/b8af6bdf9fa5f76fb0822c78f652d03f80dbd79c))
* PaymentController 추가 ([3e9fabf](https://github.com/K-Soo/hotel-job-api/commit/3e9fabf59ce08cb569a4e4b8a1d4be0142f4226d))
* PaymentJump 엔티티 추가 ([063efa8](https://github.com/K-Soo/hotel-job-api/commit/063efa806b3850b8f6bbe719778acf866cf31935))
* PaymentJumpController 추가 ([a3a8e30](https://github.com/K-Soo/hotel-job-api/commit/a3a8e30410044b5603536345aa8d853f85175c12))
* PaymentJumpModule 추가 및 관련 서비스와 컨트롤러 설정 ([859362c](https://github.com/K-Soo/hotel-job-api/commit/859362c4dddebf0bf548fe56befbe50512fd4bbd))
* PaymentJumpService 추가 ([775f391](https://github.com/K-Soo/hotel-job-api/commit/775f39166a1180a2f7c5a656c43e844277082433))
* PaymentModule 및 RecruitModule 추가 ([a6c6d56](https://github.com/K-Soo/hotel-job-api/commit/a6c6d56e18454087737d41d989ee46a46d05afdf))
* PaymentModule 추가 및 관련 모듈 설정 ([0543d01](https://github.com/K-Soo/hotel-job-api/commit/0543d012a24d55ce423eb2499c0b035115cf6fb5))
* PaymentRecruitment 엔티티 추가 ([4888ece](https://github.com/K-Soo/hotel-job-api/commit/4888ece872a0ca56e52d3adebf3f1de85526f5cc))
* PaymentRecruitmentController 추가 ([daaf183](https://github.com/K-Soo/hotel-job-api/commit/daaf183e908fdd06e8c5916e45b6b7d4f707726e))
* PaymentRecruitmentModule 추가 및 서비스와 컨트롤러 설정 ([62b5bf6](https://github.com/K-Soo/hotel-job-api/commit/62b5bf62e468964e1576e0034682c885cab4a36a))
* PaymentRecruitmentService 추가 ([2c68923](https://github.com/K-Soo/hotel-job-api/commit/2c68923b508bfad26366f97fa8ffefb60809939b))
* PaymentResumeView 엔티티 추가 ([92686d0](https://github.com/K-Soo/hotel-job-api/commit/92686d0c215f008222239c14770c0f166d9b36fd))
* PaymentResumeViewController 추가 ([2c3205a](https://github.com/K-Soo/hotel-job-api/commit/2c3205a2e37349508ce12fbdf41145b21e007a2a))
* PaymentResumeViewModule 추가 및 서비스와 컨트롤러 설정 ([fae5450](https://github.com/K-Soo/hotel-job-api/commit/fae5450754f65325522e8863aacdcdbd530ebede))
* PaymentResumeViewService 추가 ([b8ca96e](https://github.com/K-Soo/hotel-job-api/commit/b8ca96eb0be61c78247ecd3aeb2f987e958b094c))
* PaymentService 추가 ([c046bb0](https://github.com/K-Soo/hotel-job-api/commit/c046bb08728b0ca428340df93e12ee74e6e3a86e))
* PostgreSQL 설정에서 UTC 및 타임존 옵션 주석 처리 ([c28e956](https://github.com/K-Soo/hotel-job-api/commit/c28e95655ca8ecfbe1e6d95aed29f5c50fdbf047))
* Preferences 열거형 추가 ([292a948](https://github.com/K-Soo/hotel-job-api/commit/292a9483db62c309289cecd2af8ebaa691617b0c))
* RecruitController 추가 및 채용 공고 관련 API 엔드포인트 구현 ([fb4f50b](https://github.com/K-Soo/hotel-job-api/commit/fb4f50bd993ebc73abc34f0066db6255c3eb35a3))
* RecruitDetailDto 클래스 추가 ([d05f65d](https://github.com/K-Soo/hotel-job-api/commit/d05f65df3964861a6c25af79017c62fb34440bf5))
* RecruitMainController 클래스 추가 및 메인 공고 조회 API 구현 ([6ca9f28](https://github.com/K-Soo/hotel-job-api/commit/6ca9f2895d0c3a33215acb1dc8a59145297d2f4f))
* RecruitMainService 클래스 추가 ([eba8fa6](https://github.com/K-Soo/hotel-job-api/commit/eba8fa682f8c5b7ec9c00f4a211ba8e2f88b7e1a))
* Recruitment 모듈에 TypeOrm 및 Crypto 모듈 추가, Employers 모듈과의 순환 참조 설정 ([ff5bb45](https://github.com/K-Soo/hotel-job-api/commit/ff5bb456b3011a1ecd056556be05a17874ca61c8))
* Recruitment 엔티티 추가 및 필드 정의 ([5966b63](https://github.com/K-Soo/hotel-job-api/commit/5966b63426157c279b024de40715141df0efb766))
* Recruitment 엔티티 클래스 추가 ([e479d1d](https://github.com/K-Soo/hotel-job-api/commit/e479d1d98544c657d5c7e43c32f655fc4b7e579f))
* Recruitment 엔티티에 Application 및 Nationality 관계 추가 ([914b46f](https://github.com/K-Soo/hotel-job-api/commit/914b46ff62c3907785c641e91fc669e0280996b8))
* Recruitment 엔티티에 payments 및 hotelName 속성 추가 ([507de80](https://github.com/K-Soo/hotel-job-api/commit/507de809f08842b37e2c8259e3ac75e75b0c2315))
* RecruitmentController 추가 및 이력서 관련 CRUD 메서드 구현 ([1d57ccd](https://github.com/K-Soo/hotel-job-api/commit/1d57ccdb40d41550372f83d86f96bc772ef4b05f))
* RecruitmentDetailResponseDto 클래스 추가 및 필드 정의 ([84f7a4d](https://github.com/K-Soo/hotel-job-api/commit/84f7a4de162459bc256a04cd6b3b3e617cab98dc))
* RecruitmentInfoDto 및 NationalityDto 클래스 추가 및 필드 정의 ([40445e9](https://github.com/K-Soo/hotel-job-api/commit/40445e90536452a4e057b09a8807b3af182060d6))
* RecruitmentModule 추가 및 RecruitmentService와 RecruitmentController 설정 ([e9a4c88](https://github.com/K-Soo/hotel-job-api/commit/e9a4c88f73115146a2062bd7193cb6cb96d7fe99))
* RecruitmentModule을 EmployersModule에 추가 ([3fc7c66](https://github.com/K-Soo/hotel-job-api/commit/3fc7c665d53b112981cb5c01bb1369d0f5af4f56))
* RecruitmentQueryDto 클래스 추가 및 필드 정의 ([c25c057](https://github.com/K-Soo/hotel-job-api/commit/c25c0574884b27ba3b13d3851e363495fd67616f))
* RecruitmentService 추가 및 기본 CRUD 메서드 구현 ([6275900](https://github.com/K-Soo/hotel-job-api/commit/6275900ac39e5dc47ae10b72272897f53a0d7c2f))
* RecruitmentStatusResponseDto 클래스 추가 및 필드 정의 ([aad5f02](https://github.com/K-Soo/hotel-job-api/commit/aad5f02daf4546dfc6b025ce3fa5eadd30dc8ec6))
* RecruitModule 추가 및 RecruitService, RecruitController 설정 ([a4adaf8](https://github.com/K-Soo/hotel-job-api/commit/a4adaf842ca323b3a4995880d089540d21e83b59))
* RecruitQueryDto 클래스 추가 및 채용 공고 검색 쿼리 파라미터 정의 ([a035a50](https://github.com/K-Soo/hotel-job-api/commit/a035a50d541dcd3748217e1e484d8363c78057d5))
* RecruitResponseDto 클래스 추가 ([a23db01](https://github.com/K-Soo/hotel-job-api/commit/a23db01ef5f96ff70e6a31e89b0f021dd41b7d08))
* RecruitService 추가 및 채용 공고 조회 기능 구현 ([9e9254b](https://github.com/K-Soo/hotel-job-api/commit/9e9254becb8c54d5a6ad5c548abd04e718471ac2))
* RecruitService에 상세 조회 기능 추가 및 잘못된 요청 처리 개선 ([d8ee57d](https://github.com/K-Soo/hotel-job-api/commit/d8ee57d1b1a77383c63bffaf53676e15ab6d43ab))
* ResumesController에서 사용자 UUID 필드를 서브로 변경 ([7ee3330](https://github.com/K-Soo/hotel-job-api/commit/7ee33305e25c295524ab1a7f7be14ca29665372f))
* ResumesModule에서 LicensesModule 제거 ([2c31e19](https://github.com/K-Soo/hotel-job-api/commit/2c31e19e037a19e749a7b9351204292dd742e327))
* ResumesService에서 불필요한 로그 제거 ([8762145](https://github.com/K-Soo/hotel-job-api/commit/87621454a7906c04aad61b32e6ea5d9643224929))
* ReviewStageStatus에서 최종 합격 상태 이름 변경 ([8ea163e](https://github.com/K-Soo/hotel-job-api/commit/8ea163e00cd16f51a2dc76b345ceb58b41c1c40d))
* SerializeInterceptor에 그룹 옵션 추가하여 계정 정보 직렬화 개선 ([1f811b4](https://github.com/K-Soo/hotel-job-api/commit/1f811b451f7476c9f20be52497727f251898a11b))
* SerializeInterceptor에 옵션 추가 및 그룹화 기능 구현 ([16ac83f](https://github.com/K-Soo/hotel-job-api/commit/16ac83fbe92f375ee950952d43c433865a545dfd))
* UpdateRecruitmentDto 클래스 추가 ([d1b4618](https://github.com/K-Soo/hotel-job-api/commit/d1b4618aef57ce617344cb8d1028f17769f2c0f8))
* UsersModule 및 관련 엔티티, 서비스, 컨트롤러 삭제 ([33109cd](https://github.com/K-Soo/hotel-job-api/commit/33109cd0ef02777103c32da3bdb37b7abb44b4ad))
* UsersModule 임포트 제거 ([97ee1aa](https://github.com/K-Soo/hotel-job-api/commit/97ee1aa0431552118412bfdf6961fe77b8d9cc16))
* ValidationPipe 주석 추가로 DTO 유효성 검사 설명 개선 ([77f9b36](https://github.com/K-Soo/hotel-job-api/commit/77f9b36fb4628d0701ce2af20ed39417a952a90b))
* VerificationsModule에 CompanyModule 및 HttpModule 추가 ([e82f749](https://github.com/K-Soo/hotel-job-api/commit/e82f74996499ca8944ced33ef0382ba417d2b88d))


### Bug Fixes

* '근무형태' 설명을 '고용형태'로 수정 ([3ff4405](https://github.com/K-Soo/hotel-job-api/commit/3ff4405c8994e8c6aadd178af9b50f480531d67a))
* 이력서 조회 시 UUID 대신 ID 사용으로 수정 ([c0da429](https://github.com/K-Soo/hotel-job-api/commit/c0da429e2badda28857610f51b5bc4c2acb90726))
* 인증 서비스에서 중복 인증 확인 로직 개선 ([8438a99](https://github.com/K-Soo/hotel-job-api/commit/8438a997b26a559b6462a4c1e966eb1217389713))
* ApplicationStatus의 주석에서 '지원 완료'를 '지원완료'로 수정 ([2bc08b7](https://github.com/K-Soo/hotel-job-api/commit/2bc08b7bc7909ea1426c0d7726a285b1b1c89f5c))
* migration:generate 스크립트에서 불필요한 명령어 제거 ([ad5b8b9](https://github.com/K-Soo/hotel-job-api/commit/ad5b8b9721bfa7d8bb9d1ce0c307318b1f5be69f))
* TalentsService에서 findAll 메서드의 관계 로드 제거 ([7de3c3f](https://github.com/K-Soo/hotel-job-api/commit/7de3c3f10632553bcda62b575aa196b377f51c4a))
* Update import path for PartialType in UpdateRecruitmentDto ([805eca5](https://github.com/K-Soo/hotel-job-api/commit/805eca52a61615988f75bb2f2d70bcf46665fe86))
* Update Job enum import and type in CreateExperienceDto ([63cc527](https://github.com/K-Soo/hotel-job-api/commit/63cc527d67019a58761b1c7eb8d4548bb4d4dfbf))
* Update Job enum import in Experience entity ([df66440](https://github.com/K-Soo/hotel-job-api/commit/df664406d104ef8402e8a3917f8d6e18f1cc031b))
* Update recruitment property type in Employer entity to support multiple recruitments ([6510d85](https://github.com/K-Soo/hotel-job-api/commit/6510d8578848b5258507fdbfbfe4627d67f4682f))


### Chore

* curl 설치 명령어 주석 처리 ([0ea568b](https://github.com/K-Soo/hotel-job-api/commit/0ea568b5b56063cfe529bde6f0f1925ca0627b48))


### Refactors

* 마이그레이션 파일 이름 변경 및 기본값 수정 ([b6811d0](https://github.com/K-Soo/hotel-job-api/commit/b6811d0e6463a6d3a1f21871d09d32fd9b25fe43))

### [0.0.9](https://github.com/K-Soo/hotel-job-api/compare/v0.0.8...v0.0.9) (2025-01-07)


### Features

* 요청에서 사용자 정보 가져오는 주석 제거 ([28cee66](https://github.com/K-Soo/hotel-job-api/commit/28cee66312db9f0f7f0868253e6e19e755e05dfd))
* 인증 모듈에 TypeORM 및 관련 엔티티 추가 ([1538ec7](https://github.com/K-Soo/hotel-job-api/commit/1538ec7af81c551aae6eb85df4a58337bba4c881))
* 인증 상태 및 유형을 정의하는 CertificationStatus, CertificationType, CommType 열거형 추가 ([50a134f](https://github.com/K-Soo/hotel-job-api/commit/50a134f3066cb165c23a78be7c0456126ec9e1e3))
* 인증 서비스에 인증 저장 및 처리 로직 추가 ([4b09ff5](https://github.com/K-Soo/hotel-job-api/commit/4b09ff549c39c95c08d66bd92a771e14c5a5f104))
* 인증 엔티티에 Applicant 및 Employer와의 관계 추가 및 certificationType, comm_id 필드 추가 ([21e0639](https://github.com/K-Soo/hotel-job-api/commit/21e0639fc251bcb39e9d8f6d51425db0cd17fbdc))
* 인증 컨트롤러에 본인인증 복호화 및 계정/비밀번호 찾기 인증 메서드 추가 ([c52c2be](https://github.com/K-Soo/hotel-job-api/commit/c52c2be1001707483d14059b1bcd90a4e02958c5))
* 인증 테이블 및 관련 열거형 추가, 지원자 및 고용주 테이블에 인증 상태 및 닉네임 필드 추가 ([068ca06](https://github.com/K-Soo/hotel-job-api/commit/068ca0670e98a98ac3e3487d5be928227a3d6a57))
* 인증서 저장 로직을 반환값으로 변경 ([133439a](https://github.com/K-Soo/hotel-job-api/commit/133439a36bc3442088199903df42310e6fbaad45))
* Applicant 엔티티에 인증 상태 및 계정 상태 필드 추가, 고유한 닉네임 생성 로직 구현 ([5edf2b7](https://github.com/K-Soo/hotel-job-api/commit/5edf2b7df0915457beb6a516d120cc93b64f82b7))
* Applicant 엔티티의 닉네임 필드에 기본값으로 고유한 10자리 랜덤 값 생성 로직 추가 ([55df784](https://github.com/K-Soo/hotel-job-api/commit/55df784aaef82f015e8ad24aee75338f719c94b2))
* AuthController에서 req.user 타입을 Employer로 변경 ([d70fa02](https://github.com/K-Soo/hotel-job-api/commit/d70fa0221955e465908fab1cbbf87b78c41f9528))
* DecryptCertResponse 인터페이스 추가 및 필드 정의 ([964ed21](https://github.com/K-Soo/hotel-job-api/commit/964ed2161b40e5bf6f6387625f22afc4b9e285ba))
* Employer 엔티티에 인증 관련 필드 추가 및 닉네임 생성 로직 수정 ([fec23cf](https://github.com/K-Soo/hotel-job-api/commit/fec23cfcb39c46ab880d8c80471d030bb1b40657))
* EmployersController의 create 메서드에서 주석 제거 및 빈 구현으로 변경 ([4e532c9](https://github.com/K-Soo/hotel-job-api/commit/4e532c9055b3915c990dec1b98d5fd966c3b559e))
* MeResponseDto에 certificationStatus 필드 추가 ([daed526](https://github.com/K-Soo/hotel-job-api/commit/daed526b4701cced5ffbb7d66ddbf89e308d3be9))
* OauthController에서 RequestUser를 Applicant로 변경 및 추가 필드 포함 ([af53c00](https://github.com/K-Soo/hotel-job-api/commit/af53c00af5fad9b1225b7b8ad0474c2cacf3d8e3))
* ResponseSignUpDto에 certificationStatus 및 companyVerificationStatus 필드 추가 ([4903e54](https://github.com/K-Soo/hotel-job-api/commit/4903e5446504b773e248fac52f7f37e27a1dd5d6))
* SignInResponseDto에 certificationStatus 및 companyVerificationStatus 필드 추가 ([0656fc1](https://github.com/K-Soo/hotel-job-api/commit/0656fc1c20037af6222f67115e23a046162a2c06))
* VerifyDto에 선택적 필드 추가 및 기존 필드의 유효성 검사 수정 ([17db5d3](https://github.com/K-Soo/hotel-job-api/commit/17db5d3c5a05075b6984d6029047d9cab30a7c46))
* VerifyDto에 선택적 필드 추가 및 기존 필드의 유효성 검사 수정 ([019fa2d](https://github.com/K-Soo/hotel-job-api/commit/019fa2d3aa3333f3f3cf088f396e570d59078de9))
* VerifyDto에 comm_id 필드를 Enum으로 변경 및 class-validator 추가 ([124ae38](https://github.com/K-Soo/hotel-job-api/commit/124ae38c72ad4d1d563004b91ca20e7b7111e2b6))

### [0.0.8](https://github.com/K-Soo/hotel-job-api/compare/v0.0.7...v0.0.8) (2025-01-07)


### Features

* 인증 서비스에 지원자 인증 검증 메서드 추가 ([644e9c7](https://github.com/K-Soo/hotel-job-api/commit/644e9c7673bc7989d8adc7d9fe9893d704986b0e))
* VerifyDto에 선택적 필드(param_opt_1, param_opt_2, param_opt_3) 추가 ([2dcb509](https://github.com/K-Soo/hotel-job-api/commit/2dcb509e90041b9c270062bba900156f892827ce))

### [0.0.7](https://github.com/K-Soo/hotel-job-api/compare/v0.0.6...v0.0.7) (2025-01-07)


### Features

* 인증 서비스에 인증 관련 HTTP 예외 추가 ([f0c3c7e](https://github.com/K-Soo/hotel-job-api/commit/f0c3c7eb554e00dd3e38d98cda89cd74ff0d0896))
* 인증 서비스에 VerifyDto 추가 및 데이터 검증을 위한 클래스-validator 적용 ([c9eeb62](https://github.com/K-Soo/hotel-job-api/commit/c9eeb6254abb53021e9e6782acf87b5a7b59396f))
* 인증 서비스에서 인증 데이터에 cert_no 추가 및 응답 코드 검증 로직 추가 ([fb0d0f1](https://github.com/K-Soo/hotel-job-api/commit/fb0d0f11a8481981864950b3d94face28131c578))
* 인증 서비스에서 인증 엔티티 추가 및 불필요한 주석 제거 ([0eb009a](https://github.com/K-Soo/hotel-job-api/commit/0eb009ae117aafaab1ece5b876c6d0db80469423))
* 인증 서비스의 해시 데이터 구성에 dn_hash 추가 ([6cedfac](https://github.com/K-Soo/hotel-job-api/commit/6cedfacaa77c199f789f624f64d33abf71572f42))
* 인증 서비스의 verify 메서드 이름을 verifyDnHash로 변경 ([f456803](https://github.com/K-Soo/hotel-job-api/commit/f45680311b79731f25ad317eeebc60f159ec12c6))
* 인증 서비스의 verify 메서드에 데이터 검증 로직 추가 및 decryptCertData 메서드 구현 ([ae766e9](https://github.com/K-Soo/hotel-job-api/commit/ae766e9b45cdb189473bd1231b066ebf1328b171))
* 인증 서비스의 verify 메서드에서 요청 본문 검증 추가 및 응답 처리 로직 수정 ([9c1e100](https://github.com/K-Soo/hotel-job-api/commit/9c1e100e19ee3e5005d4c7c719052b6a2b2c5c17))
* 인증 서비스의 verify 메서드에서 응답을 반환하도록 수정 및 요청 본문 로깅 추가 ([da58446](https://github.com/K-Soo/hotel-job-api/commit/da58446367e87e7b8469e35195f1b66e99b6d995))
* 인증 서비스의 verify 및 decryptCertData 메서드 수정, 데이터 검증 로직 추가 ([89ec290](https://github.com/K-Soo/hotel-job-api/commit/89ec29053c68e0ce22ac97ee5d6dc2045a46ac9f))
* 인증 서비스의 verifyDnHash 및 decryptCert 메서드에서 DTO 사용으로 코드 개선 및 오류 처리 로직 수정 ([08cbf72](https://github.com/K-Soo/hotel-job-api/commit/08cbf729e2a0808a6bde27420e03c24ecc543f4a))
* CreateOAuthDto에서 requestType 필드의 유효성 검사 조건 수정 ([90edb2f](https://github.com/K-Soo/hotel-job-api/commit/90edb2f21ba8e0f5564e51c8413a623114aa8579))
* DecryptCertDto 클래스 추가 및 VerifyDto에서 필드 선택 ([031515a](https://github.com/K-Soo/hotel-job-api/commit/031515af86190a6dfe4f36717c7a2094a4152c8c))

### [0.0.6](https://github.com/K-Soo/hotel-job-api/compare/v0.0.5...v0.0.6) (2025-01-06)


### Features

* 로컬 환경에서 인증 서비스의 설정 값 추가 및 수정 ([b856d87](https://github.com/K-Soo/hotel-job-api/commit/b856d871c38af43c846bd439e088b56c8c9a9042))
* 응답 상태를 정의하는 ResponseStatus 열거형 추가 ([4ae305e](https://github.com/K-Soo/hotel-job-api/commit/4ae305e72de5a2cc21b6564e1fb90bb5483a7e85))
* 인증 서비스에서 요청 및 응답 로깅 메시지 수정 ([a46caef](https://github.com/K-Soo/hotel-job-api/commit/a46caeffce20dc3187eecadaf641b15b957be0cc))
* 인증 서비스에서 KCP API 호출 시 오류 처리 개선 및 응답 구조 수정 ([8907bad](https://github.com/K-Soo/hotel-job-api/commit/8907bad61bae75e9ad0d108eaba751d060efd685))
* 인증 서비스의 메서드 이름 변경 및 검증 메서드 추가 ([3471687](https://github.com/K-Soo/hotel-job-api/commit/3471687b154ae29b37f941c1f8a108e1eb4c2a43))
* 인증 서비스의 인증 시작 및 검증 메서드 추가 ([97b24bf](https://github.com/K-Soo/hotel-job-api/commit/97b24bfe498ecc21834ebc0875c956747cac44ea))
* 인증 서비스의 verify 메서드에 데이터 검증 요청 로직 추가 ([09cee05](https://github.com/K-Soo/hotel-job-api/commit/09cee0584529282b4d226c0d9e6a44bc709d5031))
* hashUp 메서드에 응답 로깅 추가 및 비동기 처리로 변경 ([a558a9e](https://github.com/K-Soo/hotel-job-api/commit/a558a9e5e870c825016d1f4f1b718edb32cec0de))
* hashUp 메서드에서 응답 로깅 제거 ([c996957](https://github.com/K-Soo/hotel-job-api/commit/c99695722f16feb243b599c410d8ef65d4f020cf))


### Bug Fixes

* conflict ([03c9bf5](https://github.com/K-Soo/hotel-job-api/commit/03c9bf5ab2a19e65441a090e497d76dd0828edad))


### Chore

* **release:** 0.0.5 ([81e2db1](https://github.com/K-Soo/hotel-job-api/commit/81e2db102b8499affb46ffdb43c78e5378dd2316))
* **release:** 0.0.5 ([befa4a8](https://github.com/K-Soo/hotel-job-api/commit/befa4a8e8a0904c4f907d406796cfaf5e5f01614))

### [0.0.4](https://github.com/K-Soo/hotel-job-api/compare/v0.0.3...v0.0.4) (2025-01-05)


### Chore

* **release:** 0.0.4 ([e9fe832](https://github.com/K-Soo/hotel-job-api/commit/e9fe832d9faff68fffd4348a5601eeb7d8e56f55))
* resolve merge conflicts ([1d349d3](https://github.com/K-Soo/hotel-job-api/commit/1d349d3cf06b00ca99a82f0bf50b66d7719c3c03))

### [0.0.4](https://github.com/K-Soo/hotel-job-api/compare/v0.0.3...v0.0.4) (2025-01-05)


### Chore

* **release:** 0.0.4 ([e9fe832](https://github.com/K-Soo/hotel-job-api/commit/e9fe832d9faff68fffd4348a5601eeb7d8e56f55))
* resolve merge conflicts ([1d349d3](https://github.com/K-Soo/hotel-job-api/commit/1d349d3cf06b00ca99a82f0bf50b66d7719c3c03))

### [0.0.4](https://github.com/K-Soo/hotel-job-api/compare/v0.0.3...v0.0.4) (2025-01-05)


### Chore

* **release:** 0.0.4 ([e9fe832](https://github.com/K-Soo/hotel-job-api/commit/e9fe832d9faff68fffd4348a5601eeb7d8e56f55))
* resolve merge conflicts ([1d349d3](https://github.com/K-Soo/hotel-job-api/commit/1d349d3cf06b00ca99a82f0bf50b66d7719c3c03))

### [0.0.4](https://github.com/K-Soo/hotel-job-api/compare/v0.0.3...v0.0.4) (2025-01-05)

### Features

- 데이터베이스 마이그레이션 파일 삭제 및 migration 명령어 수정 ([3d824e7](https://github.com/K-Soo/hotel-job-api/commit/3d824e7fd7a9f59cf2bd9deceef8fd9986e654e7))
- 인증 서비스에서 KCP API 호출 관련 코드 주석 처리 ([ce8607e](https://github.com/K-Soo/hotel-job-api/commit/ce8607e4a6b9efcbfc8ec7ea6e4c87e5b5cf7bcc))
- CORS 설정에서 allowedHeaders 주석 해제 ([59a31cf](https://github.com/K-Soo/hotel-job-api/commit/59a31cf609301c715baa00fa854e7adf9da647ef))
- KCP API 호출 관련 코드 주석 해제 및 요청 데이터 구성 추가 ([7beb261](https://github.com/K-Soo/hotel-job-api/commit/7beb261bd08554f6e622aceda502915ec6fd184d))
- OAuth 컨트롤러에서 refresh_token 쿠키 설정 변경 및 만료 시간 파싱 기능 추가 ([cb90455](https://github.com/K-Soo/hotel-job-api/commit/cb904552797aeb30ddf11dd67cca815ffb260bcd))
- refresh_token 쿠키에 domain 속성을 'dev.hotel-job-connect.com'으로 추가 ([096ad77](https://github.com/K-Soo/hotel-job-api/commit/096ad77543db21382fc2afdf972740f7f29ac839))
- refresh_token 쿠키의 domain 속성을 '.hotel-job-connect.com'으로 변경 ([3a04c9a](https://github.com/K-Soo/hotel-job-api/commit/3a04c9a0990c175a0d0c25c1485bd83fb15e53d9))
- refresh_token 쿠키의 domain 속성을 환경에 따라 동적으로 설정 ([0f05a04](https://github.com/K-Soo/hotel-job-api/commit/0f05a04a24c445d1ba0c55c4b6e441946ad64784))
- refresh_token 쿠키의 sameSite 속성을 'none'으로 변경하고, OAuth 컨트롤러에서 secure 속성을 true로 설정 ([cb312cb](https://github.com/K-Soo/hotel-job-api/commit/cb312cb2e3115780dae22899d486d7f1a223432a))
- refresh_token 쿠키의 sameSite 속성을 환경에 따라 동적으로 설정하고, domain 속성을 '.hotel-job-connect.com'으로 추가 ([8d90a66](https://github.com/K-Soo/hotel-job-api/commit/8d90a6607c3dc159a3314b685a6292601de2fa2b))
- refresh_token 쿠키의 sameSite 속성을 환경에 따라 동적으로 설정하고, secure 속성 조정 ([0d82093](https://github.com/K-Soo/hotel-job-api/commit/0d820932545d1ca2a5b73cc4e9a3cd6e03720899))
- SecretsManagerClient 초기화 시 logger 옵션 제거 ([e0151c9](https://github.com/K-Soo/hotel-job-api/commit/e0151c9ddbf7125d8a2ca3cac1696f13f24e7afa))

### Bug Fixes

- .gitattributes에서 migration 경로 수정 및 main.ts에 주석 추가 ([3f5de2f](https://github.com/K-Soo/hotel-job-api/commit/3f5de2f1e81f621d4bde3908eb061c202a3530d3))
- KCP API 호출 시 timeout 값을 5000으로 수정하고 성공 메시지 반환 방식 변경 ([2f5ce13](https://github.com/K-Soo/hotel-job-api/commit/2f5ce135a85dc3a1be228b36a9306c32d6a7f6a3))

<<<<<<< HEAD

### Chore

- # resolve merge conflicts ([1d349d3](https://github.com/K-Soo/hotel-job-api/commit/1d349d3cf06b00ca99a82f0bf50b66d7719c3c03))

### Updates

- docs ([4ba398b](https://github.com/K-Soo/hotel-job-api/commit/4ba398b1b6f41092906b8f1b48614e9d7bcd7e23))

### Chore

- **release:** 0.0.4 ([b4371f0](https://github.com/K-Soo/hotel-job-api/commit/b4371f063d9d17ff4be6605bfeecd05910484618))

### [0.0.4](https://github.com/K-Soo/hotel-job-api/compare/v0.0.3...v0.0.4) (2025-01-06)

### Features

- 데이터베이스 마이그레이션 파일 삭제 및 migration 명령어 수정 ([3d824e7](https://github.com/K-Soo/hotel-job-api/commit/3d824e7fd7a9f59cf2bd9deceef8fd9986e654e7))
- 인증 서비스에 PEM 키 및 인증서 정보 추가, 요청 데이터 수정 ([c5c5a88](https://github.com/K-Soo/hotel-job-api/commit/c5c5a885dbec6fd47e385320ec4df3922d41b559))
- 인증 서비스에서 환경 변수 설정을 위한 주석 추가 및 코드 정리 ([bbc6c45](https://github.com/K-Soo/hotel-job-api/commit/bbc6c45dfb60d2b9db5661b06cf4821e231a35cd))
- 인증 서비스에서 KCP API 호출 관련 코드 주석 처리 ([ce8607e](https://github.com/K-Soo/hotel-job-api/commit/ce8607e4a6b9efcbfc8ec7ea6e4c87e5b5cf7bcc))
- CORS 설정에서 allowedHeaders 주석 해제 ([59a31cf](https://github.com/K-Soo/hotel-job-api/commit/59a31cf609301c715baa00fa854e7adf9da647ef))
- KCP API 호출 관련 코드 주석 해제 및 요청 데이터 구성 추가 ([7beb261](https://github.com/K-Soo/hotel-job-api/commit/7beb261bd08554f6e622aceda502915ec6fd184d))
- OAuth 컨트롤러에서 refresh_token 쿠키 설정 변경 및 만료 시간 파싱 기능 추가 ([cb90455](https://github.com/K-Soo/hotel-job-api/commit/cb904552797aeb30ddf11dd67cca815ffb260bcd))
- refresh_token 쿠키에 domain 속성을 'dev.hotel-job-connect.com'으로 추가 ([096ad77](https://github.com/K-Soo/hotel-job-api/commit/096ad77543db21382fc2afdf972740f7f29ac839))
- refresh_token 쿠키의 domain 속성을 '.hotel-job-connect.com'으로 변경 ([3a04c9a](https://github.com/K-Soo/hotel-job-api/commit/3a04c9a0990c175a0d0c25c1485bd83fb15e53d9))
- refresh_token 쿠키의 domain 속성을 환경에 따라 동적으로 설정 ([0f05a04](https://github.com/K-Soo/hotel-job-api/commit/0f05a04a24c445d1ba0c55c4b6e441946ad64784))
- refresh_token 쿠키의 sameSite 속성을 'none'으로 변경하고, OAuth 컨트롤러에서 secure 속성을 true로 설정 ([cb312cb](https://github.com/K-Soo/hotel-job-api/commit/cb312cb2e3115780dae22899d486d7f1a223432a))
- refresh_token 쿠키의 sameSite 속성을 환경에 따라 동적으로 설정하고, domain 속성을 '.hotel-job-connect.com'으로 추가 ([8d90a66](https://github.com/K-Soo/hotel-job-api/commit/8d90a6607c3dc159a3314b685a6292601de2fa2b))
- refresh_token 쿠키의 sameSite 속성을 환경에 따라 동적으로 설정하고, secure 속성 조정 ([0d82093](https://github.com/K-Soo/hotel-job-api/commit/0d820932545d1ca2a5b73cc4e9a3cd6e03720899))
- SecretsManagerClient 초기화 시 logger 옵션 제거 ([e0151c9](https://github.com/K-Soo/hotel-job-api/commit/e0151c9ddbf7125d8a2ca3cac1696f13f24e7afa))

### Bug Fixes

- .gitattributes에서 migration 경로 수정 및 main.ts에 주석 추가 ([3f5de2f](https://github.com/K-Soo/hotel-job-api/commit/3f5de2f1e81f621d4bde3908eb061c202a3530d3))
- KCP API 호출 시 timeout 값을 5000으로 수정하고 성공 메시지 반환 방식 변경 ([2f5ce13](https://github.com/K-Soo/hotel-job-api/commit/2f5ce135a85dc3a1be228b36a9306c32d6a7f6a3))
  > > > > > > > develop

### Updates

- docs ([4ba398b](https://github.com/K-Soo/hotel-job-api/commit/4ba398b1b6f41092906b8f1b48614e9d7bcd7e23))

### [0.0.3](https://github.com/K-Soo/hotel-job-api/compare/v0.0.2...v0.0.3) (2025-01-04)

### Features

- 데이터베이스 오류 로깅 개선 및 CORS 설정 수정, 아이디 중복체크 API 문서화 ([2beaf47](https://github.com/K-Soo/hotel-job-api/commit/2beaf477199dc7bdb3fd47a6ed8acdddf5fd38b5))
- CORS 설정 개선 및 origin 처리 방식 변경 ([d41cd55](https://github.com/K-Soo/hotel-job-api/commit/d41cd5552d2d868f33554b6764062003fd36a865))
- Dockerfile에 curl 설치 추가 및 인증 서비스의 타임아웃을 3000ms로 변경, 비밀 관리 클라이언트에 로거 추가 ([2cc3295](https://github.com/K-Soo/hotel-job-api/commit/2cc329546d68c469045ec6a0b3e235ac419dc3b8))
- Dockerfile에서 curl 설치 방식을 apt-get에서 apk로 변경 ([31ee927](https://github.com/K-Soo/hotel-job-api/commit/31ee927ed02fd143309e74b5255bcca5e5f215e4))
- originUrls 로깅 추가 ([fea127a](https://github.com/K-Soo/hotel-job-api/commit/fea127a525c067e07f40f2edacf0bb97d251c657))

### Updates

- 쿠키설정 변경 ([7e81fc3](https://github.com/K-Soo/hotel-job-api/commit/7e81fc321626b0a0330bc32c439adb86a2aba00f))
- kakao axios timeout ([3fc9b64](https://github.com/K-Soo/hotel-job-api/commit/3fc9b64bc38669ed58ae6161dcc2ed16a902315d))
- package.json [skip ci] ([9fc7ade](https://github.com/K-Soo/hotel-job-api/commit/9fc7adeb0c1cd29d79cee65a2ec8d1fe3252e2f7))

### 0.0.2 (2025-01-04)

### Features

- @aws-sdk/client-secrets-manager 추가 ([75acd28](https://github.com/K-Soo/hotel-job-api/commit/75acd28133277ccedf2fad48983d4d9b660c0bee))
- 검증 모듈 및 서비스, 컨트롤러 추가 ([a0c1a35](https://github.com/K-Soo/hotel-job-api/commit/a0c1a3568bc65a3712147186c32db4a3129ac86d))
- 검증 서비스 추가 및 사업자 아이디 조회 기능 구현 ([c890978](https://github.com/K-Soo/hotel-job-api/commit/c890978e9fcd232f32248626ee1e2cb8ea411dda))
- 경험 생성 DTO의 재직중 설명 수정 ([caaf4e3](https://github.com/K-Soo/hotel-job-api/commit/caaf4e360edf0e2a51f4cca96ed370555ee04676))
- 계정 및 인증 상태를 나타내는 AccountStatus 및 VerificationStatus 열거형 추가 ([17bf511](https://github.com/K-Soo/hotel-job-api/commit/17bf511891f6eeb21fbfdd4f60a2de9989710447))
- 고용주 동의 생성 메서드 추가 및 EntityManager 사용 ([09050ca](https://github.com/K-Soo/hotel-job-api/commit/09050ca8ead226865da34682510a29bcd20ec9c5))
- 고용주 생성 메서드에 EntityManager 추가 및 유저 ID 중복 검사 개선 ([309db01](https://github.com/K-Soo/hotel-job-api/commit/309db01653beb7dda40f4093cb5ada103618e8d5))
- 고용주 생성 DTO의 사용자 ID 길이 및 비밀번호 규칙 수정 ([5894885](https://github.com/K-Soo/hotel-job-api/commit/589488509ced280e83c911ea7ea6ad501d573f03))
- 고용주 엔티티에 회사 및 동의 관계 추가, 고유한 닉네임 생성 로직 구현 ([956405b](https://github.com/K-Soo/hotel-job-api/commit/956405bace1bdbbcb57515ac65971056cac5597e))
- 날짜 생성 헬퍼 함수 추가 ([8e77e73](https://github.com/K-Soo/hotel-job-api/commit/8e77e73adb449f4f5ce0e29e93e459092b09570f))
- 동의 엔티티에 고용주 및 지원자 관계 추가, 동의 속성 수정 ([14e0e7d](https://github.com/K-Soo/hotel-job-api/commit/14e0e7d62c0c57992279353681eb36f2b831f6f7))
- 동의 DTO에 나이 및 마케팅 관련 속성 추가 ([245035d](https://github.com/K-Soo/hotel-job-api/commit/245035d5ca4519f1a395ec7612850cdb95eae688))
- 로깅 미들웨어 및 비밀 관리 서비스 오류 로깅 개선 ([b5d0d7c](https://github.com/K-Soo/hotel-job-api/commit/b5d0d7c512dc15e3fd0092027f7a4e4aca966aac))
- 로깅 미들웨어에 환경에 따른 로그 레벨 추가 ([caa0cc5](https://github.com/K-Soo/hotel-job-api/commit/caa0cc5fb1463a8510556a417cc8066a5bf2a0f5))
- 비밀 관리 모듈 및 서비스 추가 ([8d4efe0](https://github.com/K-Soo/hotel-job-api/commit/8d4efe04e5f8b819dfc68c784e9d32bf1fd8b246))
- 비밀 관리 서비스 추가 ([921c2a7](https://github.com/K-Soo/hotel-job-api/commit/921c2a74b615dbf1190ecbe806cc29f834dbd28a))
- 사업자 사용자 아이디 DTO 추가 ([dff8b09](https://github.com/K-Soo/hotel-job-api/commit/dff8b09c5abd39f7be8944c95544feb5b95ab5e0))
- 사업자 사용자 회원가입 기능 추가 및 예외 처리 개선 ([fbd68b8](https://github.com/K-Soo/hotel-job-api/commit/fbd68b8c89dee4cd1622678cc894eece508e74a7))
- 사업자 아이디 검증을 위한 검증 컨트롤러 추가 ([6018f73](https://github.com/K-Soo/hotel-job-api/commit/6018f735a77e7ee7fbfea0bf4d4c42a4c90fddc0))
- 사용자 관련 예외 처리 메시지 및 코드 추가 ([0fc10f3](https://github.com/K-Soo/hotel-job-api/commit/0fc10f314f1801aa26e20e9e76e53d09699e32d0))
- 사용자 생성 시 이메일 필드 추가 ([c38ca68](https://github.com/K-Soo/hotel-job-api/commit/c38ca68228cf938c884817ae8df56e31b6559e5e))
- 사용자 ID 및 비밀번호 정규 표현식 수정, 추가 정규 표현식 정의 ([fefe1d2](https://github.com/K-Soo/hotel-job-api/commit/fefe1d221e38a2633814685db615e15c8f1a6a11))
- 서비스단 수정 ([8b5c6fa](https://github.com/K-Soo/hotel-job-api/commit/8b5c6fa9768df48725193b837a7819a84fb56450))
- 인증 모듈 추가 ([15b5a58](https://github.com/K-Soo/hotel-job-api/commit/15b5a5864865db22353bad5816ec4e965c676a96))
- 인증 모듈을 추가하여 CertificationController 및 CertificationService 포함 ([23b1636](https://github.com/K-Soo/hotel-job-api/commit/23b1636401702d1601e1b39dffb7c00416a7be46))
- 인증 요청을 처리하는 CertificationController 추가 ([083159c](https://github.com/K-Soo/hotel-job-api/commit/083159c64495104859ac555fb8b1361d2b364756))
- 회사 모듈을 고용주 모듈에 추가 ([222a359](https://github.com/K-Soo/hotel-job-api/commit/222a3594fc54ca718e8a1deebebd576d97c178ed))
- 회사 모듈을 추가하고 관련 서비스 및 컨트롤러 설정 ([c74d52e](https://github.com/K-Soo/hotel-job-api/commit/c74d52e6d400bbc88e23a0159cf15dacd0a71b2a))
- 회사 생성 DTO 추가 ([3f9a121](https://github.com/K-Soo/hotel-job-api/commit/3f9a121003e4be1192e16e151ccd608e8d98c63f))
- 회사 서비스 추가 및 회사 생성 및 조회 기능 구현 ([aeac6b1](https://github.com/K-Soo/hotel-job-api/commit/aeac6b1e4094251be4db9830af68f877e6356af8))
- 회사 엔티티 추가 및 고용주와의 관계 설정 ([26e27fd](https://github.com/K-Soo/hotel-job-api/commit/26e27fdf8fcab45c5e8ae0b0733117a7c507db8a))
- 회사 응답 DTO 추가 ([7791944](https://github.com/K-Soo/hotel-job-api/commit/7791944f23cdbe031a4a796132c8afe3656cb9ad))
- 회사 정보를 등록하고 요청하는 CompanyController 추가 ([724eb5f](https://github.com/K-Soo/hotel-job-api/commit/724eb5fc81d11e995583fc727916dc237d677dcd))
- 회원가입 API에 대한 설명 추가 및 불필요한 코드 주석 처리 ([af3fe41](https://github.com/K-Soo/hotel-job-api/commit/af3fe41d76794799245e1290382523fbc417c349))
- Add .gitattributes to specify merge strategy for database migrations ([cf582b8](https://github.com/K-Soo/hotel-job-api/commit/cf582b8ba01d0954ad6b04b79cb043a920239714))
- add 'timestamptz' to cSpell dictionary in VSCode settings ([a2bd171](https://github.com/K-Soo/hotel-job-api/commit/a2bd171e5d9464fca6298a558cc382be620402c2))
- add AWS SDK for S3 and additional dependencies for improved functionality ([57fddd3](https://github.com/K-Soo/hotel-job-api/commit/57fddd343148de7ee865ea1e849cf172b06c830b))
- add City and District enums for location constants ([6edd817](https://github.com/K-Soo/hotel-job-api/commit/6edd817ab2a24f472a0283986a06e1cbb0f47f46))
- add ClassSerializerInterceptor and enable transformation in ValidationPipe ([5c6c340](https://github.com/K-Soo/hotel-job-api/commit/5c6c3402ffdb05316c702dfb9f10178be52922c8))
- add Company, Upload, Conditions, and Talents modules to app imports ([b10c456](https://github.com/K-Soo/hotel-job-api/commit/b10c456ec45ac4164d8b96c2743181e9b527f23a))
- add conditions module with controller, service, DTOs, and entity for managing job conditions ([ed56985](https://github.com/K-Soo/hotel-job-api/commit/ed5698533f229feb0948eef9301056e94015cab2))
- add consents module with controller and service ([094e081](https://github.com/K-Soo/hotel-job-api/commit/094e0812a4c4e4b25b9ecfd412762f3a594abeee))
- add cookie-parser ([7f6e246](https://github.com/K-Soo/hotel-job-api/commit/7f6e246f60e153ed3c4d350c308d0ac61b97808a))
- add CreateOAuthDto with validation for code and isInitialRequest fields ([46955f6](https://github.com/K-Soo/hotel-job-api/commit/46955f6ddbbf58724581609c5b388e8561952913))
- add custom HTTP exception codes for access and refresh token errors ([e848339](https://github.com/K-Soo/hotel-job-api/commit/e848339b82995dc7801571fbb8e64aac639bf840))
- add custom HTTP exception codes for creation limit and database operation errors ([65bd455](https://github.com/K-Soo/hotel-job-api/commit/65bd455254222e6c63c742db87cfd0f34c84d5c2))
- add custom HTTP exception for invalid user role and update refresh token error messages ([c161799](https://github.com/K-Soo/hotel-job-api/commit/c1617991c455d4755d7333f290a246fcc735d5dd))
- add custom validation decorator to check if a value is true ([ce169b5](https://github.com/K-Soo/hotel-job-api/commit/ce169b5b288346ef8dc679750ba1217892cfabec))
- add endpoints for user profile retrieval and update in UsersController ([01822f6](https://github.com/K-Soo/hotel-job-api/commit/01822f65e07001a66b26c64fff0cb11e80190a3a))
- add enums for ResumeStatus, SanctionReason, Position, Job, and SalaryType ([6ad6584](https://github.com/K-Soo/hotel-job-api/commit/6ad658459331c1865f30d2add084e70c66fc4cba))
- add ExperiencesModule and integrate helmet for enhanced security ([8341339](https://github.com/K-Soo/hotel-job-api/commit/8341339292f80beaa09d41da706cb4ac26c25786))
- add Gender, CareerLevel, EmploymentType, and Benefits enums to app constants ([c6be027](https://github.com/K-Soo/hotel-job-api/commit/c6be0273f5ec0d61c2bc7f233fe104fe95f7e2dd))
- add health ([8e9020f](https://github.com/K-Soo/hotel-job-api/commit/8e9020f1cdaf3b3cbb75fbfb65d4797c0b8f1eb7))
- add helmet package for enhanced security ([a4527ac](https://github.com/K-Soo/hotel-job-api/commit/a4527acb3c64d92e3313ef1322bb8622345a41bd))
- add LanguageDto for language and proficiency validation in resumes ([d46f346](https://github.com/K-Soo/hotel-job-api/commit/d46f34608b2100df294c946757cecaa1ecd0906d))
- add licenses module with DTOs, controller, service, and entity for managing licenses ([a0a5b30](https://github.com/K-Soo/hotel-job-api/commit/a0a5b30e460ec14dccaf24bb9a6173fa263397a6))
- add logging middleware to track HTTP requests and responses ([b5520fc](https://github.com/K-Soo/hotel-job-api/commit/b5520fccd841759fdb2d6f9a3590c09a0cf9dfa2))
- add migration file ([fd63673](https://github.com/K-Soo/hotel-job-api/commit/fd63673b10206833c9e840a9262df69d1ae6c042))
- Add migration to create employer table ([86159ee](https://github.com/K-Soo/hotel-job-api/commit/86159ee1f313b908d4420fd2c3f5e088201e2079))
- add Military entity with validation for military status and reason ([00b6ffb](https://github.com/K-Soo/hotel-job-api/commit/00b6ffb6b6ed0ff8c1a83856aabe439f081ec915))
- add military module with DTOs, controller, and service for managing military status ([b6ec7fb](https://github.com/K-Soo/hotel-job-api/commit/b6ec7fb71f942e4c86b47343bbb77e1db66e5a75))
- add new Consents and Applicants tables with updated schema ([377e603](https://github.com/K-Soo/hotel-job-api/commit/377e603808151a18e0f94b29f5aeb00ed286058d))
- add new enums for Region, Language, Proficiency, LicenseStage, MilitaryStatus, EducationLevel, and ResumeType to enhance application functionality ([3a0f2a9](https://github.com/K-Soo/hotel-job-api/commit/3a0f2a931dfaa77a4b82b639a9af65e8ff15b6a0))
- add partners module with controller, service, and DTOs ([a746c1e](https://github.com/K-Soo/hotel-job-api/commit/a746c1eefbaa8ba1613d227115d1c640f4b63e5a))
- add passport-jwt ([1dcc102](https://github.com/K-Soo/hotel-job-api/commit/1dcc10251ff79d21a2ee2c0d4df73590bb320614))
- add PassportJwtGuard for JWT authentication and improve JWT config service ([1ada2c3](https://github.com/K-Soo/hotel-job-api/commit/1ada2c34949f46cffbe8c413f4edc7a56436bab1))
- Add password hashing and comparison utility functions ([1d12386](https://github.com/K-Soo/hotel-job-api/commit/1d12386a38d4478881da884b5120ec1981bc796d))
- add payload interface for authentication token ([e4dc0b9](https://github.com/K-Soo/hotel-job-api/commit/e4dc0b9c3924b9d4fbbd8121a541106f7ea7ce91))
- add ProficiencyType to common types ([821d4a0](https://github.com/K-Soo/hotel-job-api/commit/821d4a0fae7cdedf492c9ca4257f6d343f67ac17))
- add profile endpoint to ApplicantsController with JWT authentication and enhance findOne method in ApplicantsService ([7a1e6f7](https://github.com/K-Soo/hotel-job-api/commit/7a1e6f7694b0ddbadb6d38b7db2c5a7f9b21110c))
- Add ProviderType and UserRoleType types to common types ([4be01d8](https://github.com/K-Soo/hotel-job-api/commit/4be01d82eb927d874e789eb813026d6718450b53))
- add refresh token middleware for token verification and error handling ([33e8edd](https://github.com/K-Soo/hotel-job-api/commit/33e8edda4d93d9c51c97cf3adf41e2033e7202f2))
- add regex for time format validation with units (s, m, h, d) ([1852cf3](https://github.com/K-Soo/hotel-job-api/commit/1852cf31f516f99e5c768cd697b389c792e7bdfc))
- add regex for validating image file types ([5e0b609](https://github.com/K-Soo/hotel-job-api/commit/5e0b6099eca125ab1fe327c9f534e03f4fa440ee))
- add resume and experience tables with related enums and constraints ([34744ad](https://github.com/K-Soo/hotel-job-api/commit/34744ad8ac98df7cda2bfd8f3b2af75e09be5baa))
- add Roles decorator and RolesGuard for role-based access control ([ad30c7a](https://github.com/K-Soo/hotel-job-api/commit/ad30c7a027adea80e4eaf0f77112549764a5b785))
- add S3 module with provider and service for file handling and management ([decd651](https://github.com/K-Soo/hotel-job-api/commit/decd6516db9260e51d4afda950032588121d9a79))
- Add safeQuery helper for error handling in database queries ([1b68fa3](https://github.com/K-Soo/hotel-job-api/commit/1b68fa32f8362e7bbc8ed31cd5230a4859f77110))
- Add serialization interceptor to employer creation and update employer entity with provider and role fields ([67aeedb](https://github.com/K-Soo/hotel-job-api/commit/67aeedb4ae7f0ed5c986c543e6cd55cad769e444))
- add signUpEmployer method and error handling in userMe method ([27e949a](https://github.com/K-Soo/hotel-job-api/commit/27e949af56bbfaac6d141e46c7c6953619faad20))
- Add Swagger documentation and update DTOs for API endpoints ([008f3f9](https://github.com/K-Soo/hotel-job-api/commit/008f3f9639096d4553ad8b7503403aa3132541ec))
- add talents module with controller, service, DTO, and entity for managing talent information ([b5a7d5c](https://github.com/K-Soo/hotel-job-api/commit/b5a7d5c384b569834207da7a1b24394bf79769df))
- add upload module for profile image handling with validation and S3 integration ([de761d2](https://github.com/K-Soo/hotel-job-api/commit/de761d222432d4d50649c72790e4d7ff9e18fee4))
- Add user role enum ([1401f11](https://github.com/K-Soo/hotel-job-api/commit/1401f11eaa83b20a917aeaad6473310c1ccc4d49))
- Add UserRole enum for user role management ([029831c](https://github.com/K-Soo/hotel-job-api/commit/029831cacec1ae0cf78863434744668205008290))
- Applicant 엔티티에 User와의 관계 추가 및 일부 속성 제외 ([730580b](https://github.com/K-Soo/hotel-job-api/commit/730580b8fc6e2bd6688b30090c3180a3e2be0d3a))
- Auth 클래스 삭제 ([d55d398](https://github.com/K-Soo/hotel-job-api/commit/d55d39820a278d399d2d5c981920181ab1f7e94c))
- auth modules ([50703cb](https://github.com/K-Soo/hotel-job-api/commit/50703cba2314a92b01e792d75e11494d4cc5981e))
- CertificationService 추가하여 KCP API 호출 및 서명 데이터 생성 기능 구현 ([f59b61c](https://github.com/K-Soo/hotel-job-api/commit/f59b61c5946fe95d1f4ac31c44512f5371a63f5e))
- Configure Swagger documentation setup ([ca9c1ae](https://github.com/K-Soo/hotel-job-api/commit/ca9c1ae72a7474aae3b59ad0de763ea24f93870f))
- ConsentsModule 추가 ([16ef206](https://github.com/K-Soo/hotel-job-api/commit/16ef2066da17dddb8754e16c5c00e7411d166d00))
- CreateOAuthDto에서 isInitialRequest를 requestType으로 변경하여 로그인 및 회원가입 요청 구분 ([9fbf3ea](https://github.com/K-Soo/hotel-job-api/commit/9fbf3eacf1f5a4d5b4bd7b2ca4360abbcdb35cd8))
- CreateSignupDto를 추가하여 CreateConsentDto와 CreateEmployerDto를 결합 ([80e61df](https://github.com/K-Soo/hotel-job-api/commit/80e61dfa493646925205d0b3b5d5d7a5151532fe))
- define Verification entity with relationships and enum for verification types ([b1e56f0](https://github.com/K-Soo/hotel-job-api/commit/b1e56f0d393ed1227703bbd144db39cf320ff433))
- EmployerUser 인터페이스에서 name 속성 제거 ([28dac82](https://github.com/K-Soo/hotel-job-api/commit/28dac82afa9215ea8d7832f3f938aa5cfea7589a))
- enable persistAuthorization in Swagger configuration for improved API security ([e6c0820](https://github.com/K-Soo/hotel-job-api/commit/e6c0820d4b39cda8082e1695cd76a8ac50eb6f7e))
- enhance authentication tokens to include user role and improve refresh token expiration handling ([4317c90](https://github.com/K-Soo/hotel-job-api/commit/4317c903e5e96cbc0eb031ce53ff527de6565ef5))
- enhance CreateTestDto with consent agreement fields and add id property ([7159da3](https://github.com/K-Soo/hotel-job-api/commit/7159da390047ac68828cc93ff63f48996b9dd26f))
- enhance database connection with logging and error handling; update employer entity to use new role and provider enums ([8f23fa5](https://github.com/K-Soo/hotel-job-api/commit/8f23fa577bf67e3e4f4eb082901dc7c0474924bb))
- enhance experience module with detailed DTO and entity definitions, including validation and new properties ([48e39c6](https://github.com/K-Soo/hotel-job-api/commit/48e39c6244a5c418a8fb0c4f16071f57ac1d1ee7))
- Enhance HttpExceptionFilter to handle specific custom error codes ([3fbce6b](https://github.com/K-Soo/hotel-job-api/commit/3fbce6bd5e89341b7db45f2b847ffeeacf143345))
- enhance JWT strategy to handle missing access token and update OAuth controller for provider-specific token generation ([7ea3de6](https://github.com/K-Soo/hotel-job-api/commit/7ea3de61c6fae5ab2f1b3c7ef27a5f4afc74b372))
- enhance JWT strategy to validate refresh token presence and log token expiration ([874d753](https://github.com/K-Soo/hotel-job-api/commit/874d75302fd42c63f3f057fa65959bd5c83b426b))
- Enhance Kakao OAuth strategy with user info retrieval and error handling ([64d1028](https://github.com/K-Soo/hotel-job-api/commit/64d1028996f425748bc7d6dcc3997e7e32af182a))
- enhance safeQuery to throw BadRequestException for database operation errors ([e14ae4a](https://github.com/K-Soo/hotel-job-api/commit/e14ae4acfebdeba710df2b5af7cd18cdb5bef0cf))
- enhance serialization in interceptor to handle array of items ([8e8bbc4](https://github.com/K-Soo/hotel-job-api/commit/8e8bbc48208574e21479bb3c4badc9e37a08e69f))
- enhance Swagger configuration with custom CSS and improved model expansion options ([88f4cb9](https://github.com/K-Soo/hotel-job-api/commit/88f4cb9336865e09a3242d4453c67cf91395fa9f))
- enhance Tests module with improved create method and add service export ([df2478b](https://github.com/K-Soo/hotel-job-api/commit/df2478b60e65eb7118f14d5ebda5483d56ebeb89))
- enhance user entity with detailed fields and relationships, update user controller for profile retrieval ([d74ca27](https://github.com/K-Soo/hotel-job-api/commit/d74ca278db91a02d80f86a8f5b2f67fbf667f4cb))
- exclude sensitive fields from Consent entity using Exclude decorator ([2adb0cc](https://github.com/K-Soo/hotel-job-api/commit/2adb0ccff5f7810bb8fa836b9c693e8f10e8781d))
- extend CreateResumeDto with additional fields and validation, update ResumesController and ResumesService for enhanced resume management ([10053ac](https://github.com/K-Soo/hotel-job-api/commit/10053acd7da7f8fa06ce5c732b3da256211d3a42))
- global interceptor ([7dff024](https://github.com/K-Soo/hotel-job-api/commit/7dff024a92b6d4f8f523fd081322322f4f887a8a))
- HttpExceptionFilter에 요청 정보 로깅 추가 ([ca9f936](https://github.com/K-Soo/hotel-job-api/commit/ca9f936e1809d5515567ab1cfa9331b58c1d2d39))
- implement access token middleware and enhance refresh token middleware for better error handling ([7ec10ec](https://github.com/K-Soo/hotel-job-api/commit/7ec10ec8a74f4d260b289b880babc7f10bfa9802))
- implement CreateOAuthDto for Kakao custom strategy validation and error handling ([47f74d9](https://github.com/K-Soo/hotel-job-api/commit/47f74d9e5983e4e2aea740492d918adddbb718ad))
- Implement employer creation with password hashing and add serialization interceptor ([638d48c](https://github.com/K-Soo/hotel-job-api/commit/638d48cc9a5c30be75f35e65bac525c51d40dc88))
- Implement employer user validation and existence check ([ba33433](https://github.com/K-Soo/hotel-job-api/commit/ba334339801b4fb9020dd1a0534949ce1c164dfd))
- implement experiences module with DTOs, entity, controller, and service ([2f21d22](https://github.com/K-Soo/hotel-job-api/commit/2f21d22f43c985bb597b316f889846c36828ccbc))
- implement JWT strategy for authentication with refresh token validation ([a84d489](https://github.com/K-Soo/hotel-job-api/commit/a84d489dba8d87acfee8163aadbb348a61f63b70))
- Implement Kakao OAuth strategy and update authentication flow ([7ee3dfe](https://github.com/K-Soo/hotel-job-api/commit/7ee3dfe7623f990b2f9e6ec4a39979f3ac1dde86))
- Implement local authentication strategy ([4de8d91](https://github.com/K-Soo/hotel-job-api/commit/4de8d9125620b1657651e4259009e3b1f0375f62))
- Implement local authentication strategy with Passport and update sign-in DTO ([6dd09ff](https://github.com/K-Soo/hotel-job-api/commit/6dd09ffaaea09f01453b3ab1dee66b83e0b26097))
- implement resume creation and retrieval with enhanced DTOs and entity structure ([0eea977](https://github.com/K-Soo/hotel-job-api/commit/0eea9775a428deb3c7dc28e00e2feb9626aa76ed))
- implement Resumes module with CRUD operations and DTOs ([3231922](https://github.com/K-Soo/hotel-job-api/commit/323192215d22e371bd4291d003cfb218e842783e))
- Implement sign-in and sign-out functionality with response DTOs ([df52d07](https://github.com/K-Soo/hotel-job-api/commit/df52d07b36d0c71efd2a527cc35c15efc47dbf81))
- implement verification module with controller, service, and DTOs ([183ad2f](https://github.com/K-Soo/hotel-job-api/commit/183ad2fa138423e705f76536323c85e480d0c2f1))
- import ResumesModule in AppModule for integration ([ff510b4](https://github.com/K-Soo/hotel-job-api/commit/ff510b4d4a2b4ab81eb6987ed9fa6d089b17b1d5))
- integrate access token middleware and enhance JWT verification methods ([52d2c2d](https://github.com/K-Soo/hotel-job-api/commit/52d2c2d253027b9cc137ffa1298534588a4bdc62))
- integrate consents module ([3045bda](https://github.com/K-Soo/hotel-job-api/commit/3045bda02b2ce4038d031e0f3e86fac99f313596))
- integrate LoggingMiddleware and enhance error handling in AuthService; ([b55fa30](https://github.com/K-Soo/hotel-job-api/commit/b55fa3049d737b16ad2d16c1df7038fbfee9d500))
- integrate UsersService in KakaoCustomStrategy for user creation ([456d7c7](https://github.com/K-Soo/hotel-job-api/commit/456d7c7b377376e8e6e97eddca80653beb42da06))
- JWT 전략에서 액세스 토큰 만료 시간 로깅 제거 ([1b44a9c](https://github.com/K-Soo/hotel-job-api/commit/1b44a9c055adc64c234e5aa5a63c7a7aefeefd4c))
- kakao OAuth integration ([7b79838](https://github.com/K-Soo/hotel-job-api/commit/7b79838eecff9bc5e1a72eef33a213f02ba825f8))
- KakaoCustomStrategy에서 requestType을 사용하여 회원가입 및 로그인 요청 처리 로직 수정 ([1259c62](https://github.com/K-Soo/hotel-job-api/commit/1259c62ad5220dcce91043385d805910d5c8e829))
- KakaoPayload 인터페이스에 email 필드 추가 ([a6f5a46](https://github.com/K-Soo/hotel-job-api/commit/a6f5a469c4412eb86fa29d57497b65e22371d35a))
- makeSignature 헬퍼 함수 추가 및 서명 생성 로직 구현 ([0ceebfd](https://github.com/K-Soo/hotel-job-api/commit/0ceebfdc0a0e9cc606e4ccd0306a52d3d2e67070))
- MeResponseDto에 역할, 제공자, 계정 상태 및 닉네임 필드 추가 ([c74300f](https://github.com/K-Soo/hotel-job-api/commit/c74300f091df4226cdf2f747f25d7447a1022c3f))
- migration files ([9a6a529](https://github.com/K-Soo/hotel-job-api/commit/9a6a529efd147af24a1ad42b3488a67d1b79b3f9))
- Refactor authentication logic and update user role handling ([e698d33](https://github.com/K-Soo/hotel-job-api/commit/e698d33617de19b56af2e75c41377d628d4555c0))
- refactor user interface and types to use updated role and provider types ([0eab774](https://github.com/K-Soo/hotel-job-api/commit/0eab774a6e9a60fc93b10400bffdac313045f84d))
- Remove debug logging from PostgreSQL configuration ([aecd081](https://github.com/K-Soo/hotel-job-api/commit/aecd081d62a1bb7723beec7e97c2d29ebdfa4e7b))
- remove unused Payload interface from authentication module ([cad6042](https://github.com/K-Soo/hotel-job-api/commit/cad6042c6338d9a8eb6ecb0952169c85cb2b6158))
- remove verifications module and related DTOs, controller, and service ([8b34dfd](https://github.com/K-Soo/hotel-job-api/commit/8b34dfdeb9d881cd619aac05fd39d21c1395c5da))
- ResponseSignUpDto 추가하여 역할, 제공자, 계정 상태, 닉네임 및 회사 인증 상태 필드 정의 ([84d1e90](https://github.com/K-Soo/hotel-job-api/commit/84d1e907b1e3544ab2d7a085c187818d705e879f))
- Resume entity to include career level and agreement fields ([dfe2c70](https://github.com/K-Soo/hotel-job-api/commit/dfe2c70bde3ae47963f7817da799d762f808de7b))
- SignInResponseDto에 계정 상태 및 닉네임 필드 추가 ([c05c3c1](https://github.com/K-Soo/hotel-job-api/commit/c05c3c15259a1fc0be9abb88b7b4cdafa6a1ddfe))
- update API title in Swagger configuration to reflect Hotel Job Connect ([108af1e](https://github.com/K-Soo/hotel-job-api/commit/108af1eaf9c6dc421c8352f4f0616224b7a16ce3))
- update applicants module to use string for userId; enhance role-based access control and add findByUuid method ([c0209fe](https://github.com/K-Soo/hotel-job-api/commit/c0209fea7d99e73c226dbba53850df0efecd77d0))
- update authentication module with JWT payload interface, response DTO, and improved user retrieval logic ([7684da2](https://github.com/K-Soo/hotel-job-api/commit/7684da25b2c37796b3a7c8c9117c21e534acbe8f))
- update authentication payload to include role type and refactor user ID handling in Kakao strategy ([8db1bf4](https://github.com/K-Soo/hotel-job-api/commit/8db1bf461296b701dc85b697ca4d437eb0756ddf))
- update cookie-parser import syntax and modify CORS methods configuration ([69f797d](https://github.com/K-Soo/hotel-job-api/commit/69f797dad4b538de9a00488882d592e0c276ea83))
- update CORS configuration to log allowed origins and set default origin ([b4f3f30](https://github.com/K-Soo/hotel-job-api/commit/b4f3f3047d1ec32579c0520d56e54cf845e1eb6f))
- Update Employer entity to use ProviderType and UserRole enums ([7e909f3](https://github.com/K-Soo/hotel-job-api/commit/7e909f33dbffc16d71d74af3a9d378318d0d89c8))
- update employer entity to use UUID for id ([8455f43](https://github.com/K-Soo/hotel-job-api/commit/8455f43a65c1947fa667e8d6d7c478bf8f9ae118))
- update employers controller API tag and remove verification entity ([1a2891b](https://github.com/K-Soo/hotel-job-api/commit/1a2891b85ab01baad475da7f6f75e3e1e14cb7d5))
- update experience DTO and entity to use City enum for location ([019e81c](https://github.com/K-Soo/hotel-job-api/commit/019e81c744af5d540f5b4bcccc4923cbad78e59c))
- Update password validation regex and add password hashing in employer creation ([f2f3157](https://github.com/K-Soo/hotel-job-api/commit/f2f31572cd7b08437fa0a0869fbe71cad526c158))
- update refresh token handling to use configurable expiration time and remove debug logs ([02e5e9e](https://github.com/K-Soo/hotel-job-api/commit/02e5e9e3f5621a900a14a63b1f6fe0a86f36adb2))
- update Resume entity to include additional fields and relationships for improved resume management ([54715d7](https://github.com/K-Soo/hotel-job-api/commit/54715d7439e8f6f28cc114569632a2d76212234b))
- update Roles decorator to use RoleType and enhance error handling in RolesGuard ([c5a5d80](https://github.com/K-Soo/hotel-job-api/commit/c5a5d80095c1b46346d7aeeddfec38b9082875d2))
- update user interface to use string for userId and refactor provider and role types ([40ae677](https://github.com/K-Soo/hotel-job-api/commit/40ae6773dd14152ff0e936940768abc62f5d270e))
- update user interfaces and applicant entity to use string IDs; add consent DTOs ([eb29c7c](https://github.com/K-Soo/hotel-job-api/commit/eb29c7c020cc4f8ed6b4359f90c5313686e21572))
- UsersModule을 추가하여 OAuth 모듈의 의존성 확장 ([6678701](https://github.com/K-Soo/hotel-job-api/commit/6678701b3088cf2dc74473f6f92d190c51da75e3))

### Bug Fixes

- 헬스 컨트롤러의 상태 메시지를 소문자로 수정 ([b728626](https://github.com/K-Soo/hotel-job-api/commit/b7286267811b2745014eea1c9a68621ea531085c))
- downgrade chalk package to version 4.1.2 for compatibility ([9d4cf11](https://github.com/K-Soo/hotel-job-api/commit/9d4cf1194825a7d98c4fc7201c20c375d18fcc62))
- enhance error logging in safeQuery function to include context ([d45810a](https://github.com/K-Soo/hotel-job-api/commit/d45810ae1de04a70c659cfedb66cbbbace68fd95))
- implement refresh token generation ([9144c56](https://github.com/K-Soo/hotel-job-api/commit/9144c569c0144e5a90088edbe91a577c82985f67))
- Refactor database configuration ([d47e1db](https://github.com/K-Soo/hotel-job-api/commit/d47e1dbf789a5337e983fc2ff5beaffa5a630b95))
- Update database configuration to conditionally disable SSL for non-local environments ([25397d2](https://github.com/K-Soo/hotel-job-api/commit/25397d2f39d6b34ed3ed85d1676c915158bdddf0))
- Update database configuration to conditionally enable SSL for local environment ([eb4201d](https://github.com/K-Soo/hotel-job-api/commit/eb4201d692c93b3ada673aeabc898af3787b00e9))
- update error logging to use exception message and streamline error responses ([e6f0c1e](https://github.com/K-Soo/hotel-job-api/commit/e6f0c1ed06824f0bcefaf5690e45b8063e53abf3))
- update refresh token error message for clarity ([227e89e](https://github.com/K-Soo/hotel-job-api/commit/227e89e36bfcdfbd54735ad8784b4d5acb8cf501))

### Chore

- Add configuration files for ESLint, NVM, and Prettier ([9803534](https://github.com/K-Soo/hotel-job-api/commit/98035345836aaa210851f640d540d8666d54e171))
- Update merge strategy for database migrations to apply globally ([6fb47ce](https://github.com/K-Soo/hotel-job-api/commit/6fb47cebd962fa3638145ccd9685bc1607751413))

### Styles

- Refactor code formatting and indentation across multiple files ([ef35f83](https://github.com/K-Soo/hotel-job-api/commit/ef35f8352e3e4bf2f85030dc04b8d3d68dcb39bb))
- Update code formatting and adjust tab settings in configuration files ([017d014](https://github.com/K-Soo/hotel-job-api/commit/017d014d018b6e256537e309447b96120bb8de41))
- Update ESLint configuration to ignore unused vars with leading underscores ([a128b1e](https://github.com/K-Soo/hotel-job-api/commit/a128b1ea0c4d1a085518416a95d2482c0b23ade6))
- update printWidth in Prettier configuration from 140 to 120 ([eddf8ea](https://github.com/K-Soo/hotel-job-api/commit/eddf8ea8cc9e0d71495d3fc93f49b7db9bd04790))

### Refactors

- Clean up authentication DTOs and update app service response structure ([656f020](https://github.com/K-Soo/hotel-job-api/commit/656f020f13e2775e38e40ce4666692f7896d64bf))
- enhance JWT strategy validation logic and error handling ([425f20c](https://github.com/K-Soo/hotel-job-api/commit/425f20c13a2112491fad6c21db00ef2a22a497a7))
- format ResponseInterceptor for improved readability ([bc0554c](https://github.com/K-Soo/hotel-job-api/commit/bc0554c0f602799d0d55c1c6f0402793f6afb2eb))
- Remove unused database error constants from custom HTTP exception ([75067aa](https://github.com/K-Soo/hotel-job-api/commit/75067aa7011f1e9bee49e7b81563fb9efdf6f114))
- remove unused DTO and test files for tests module ([f8eabda](https://github.com/K-Soo/hotel-job-api/commit/f8eabda9594f76bc84e0aa60dc80a147a25e265d))
- remove unused GeneratedColumn function and clean up imports in Applicant entity ([ef58b2c](https://github.com/K-Soo/hotel-job-api/commit/ef58b2c2639bf9b9f51c75aef2f405aaef8339dc))
- remove unused import for customHttpException in database helper ([6167801](https://github.com/K-Soo/hotel-job-api/commit/6167801522892d20938c255803a5f2db0ea60c96))
- remove unused migration for Test table ([a14ebda](https://github.com/K-Soo/hotel-job-api/commit/a14ebdaa56fc956a9ac7239b1959375a7413b7cf))
- remove unused variable 'lat' from JWT strategy payload ([b8fc5ab](https://github.com/K-Soo/hotel-job-api/commit/b8fc5abf2a24daeac128c6eab9d6a581251fea38))
- rename id field to sub in Payload interface for clarity ([ab6614e](https://github.com/K-Soo/hotel-job-api/commit/ab6614e0e15b89067f8f69884564819785181625))
- rename KakaoUser interface to KakaoPayload and update its structure for improved clarity ([e0c365e](https://github.com/K-Soo/hotel-job-api/commit/e0c365e9e23e527870be598df7cc446c70c74488))
- rename ProviderRole to Provider and UserRole to Role for clarity ([de8b76b](https://github.com/K-Soo/hotel-job-api/commit/de8b76b54e8cff5ace96c980fb5ffd02c164b045))
- simplify access and refresh token middleware by removing unused imports and logging ([fd2600b](https://github.com/K-Soo/hotel-job-api/commit/fd2600ba7ff46a33b7dc1862325a04fec1f22ec5))
- simplify ConsentsController by removing unused methods and enhance ConsentsService with TypeORM integration ([461ebcd](https://github.com/K-Soo/hotel-job-api/commit/461ebcd3dbb6a773c17cd56e100d8ba78d075eac))
- streamline JWT strategy by removing commented code and enhancing error handling ([3a66a8a](https://github.com/K-Soo/hotel-job-api/commit/3a66a8a59880727e5ad4099f47ae6c84669d45fd))
- streamline OauthController by removing unused check method and enhance module imports for JWT and Consents integration ([53b0b46](https://github.com/K-Soo/hotel-job-api/commit/53b0b46d4fe8d5d4e6515976d5d3a484d6a10904))
- update findOne method to use id instead of userId and prepare Employer entity for future consent integration ([d07ba9d](https://github.com/K-Soo/hotel-job-api/commit/d07ba9d9895b0f1c338efab8864c51c12b853018))

### Updates

- aws load ([a6b7d06](https://github.com/K-Soo/hotel-job-api/commit/a6b7d064b405ac127264a459eedb8c52d867d59c))
- branch ([eba368a](https://github.com/K-Soo/hotel-job-api/commit/eba368a33282dcd1197342ce8d4da31f3918e590))
- branch params ([b00414b](https://github.com/K-Soo/hotel-job-api/commit/b00414bd576ada3ded64394b66049f53571272fe))
- branch steps ([b70a866](https://github.com/K-Soo/hotel-job-api/commit/b70a86687a5da742c32c7047844009aa0f805870))
- branch test ([4314045](https://github.com/K-Soo/hotel-job-api/commit/431404508f01a8b4399d6da1e67d4f66a3f05999))
- branch test ([1e91e54](https://github.com/K-Soo/hotel-job-api/commit/1e91e542716a5c1ef77708970a17c6d54a657b42))
- branch.outputs.stage ([964b215](https://github.com/K-Soo/hotel-job-api/commit/964b21572e5e44dda27be718d04d52078ccf1f67))
- build test ([7029e52](https://github.com/K-Soo/hotel-job-api/commit/7029e52f9b9cf85ebd0c470606329c405b55d51b))
- env ([4403ad5](https://github.com/K-Soo/hotel-job-api/commit/4403ad5ed8c22e1ee7818882307ca64f5935dd81))
- env file test ([5310009](https://github.com/K-Soo/hotel-job-api/commit/53100091b0d5f043787fac61daefe30f436b4707))
- env file test2 ([278e518](https://github.com/K-Soo/hotel-job-api/commit/278e518b137ef99dd09cc489f5bd7d743abc7b49))
- env file test3 ([ae12d6b](https://github.com/K-Soo/hotel-job-api/commit/ae12d6ba65e8762ba97aa8b7e8e2aef745f4d22f))
- env file test4 ([d29dc1e](https://github.com/K-Soo/hotel-job-api/commit/d29dc1eb46f9c4591afc53c03b46501dcdf8ffa0))
- env file test5 ([44602c9](https://github.com/K-Soo/hotel-job-api/commit/44602c9aac356b61a0b58fa5122c75ddacfbd2ae))
- git env ([17c5ba8](https://github.com/K-Soo/hotel-job-api/commit/17c5ba86d9621ad3b3d33b70d36c8a9803efaf47))
- git workflow aws-region ([2f4a606](https://github.com/K-Soo/hotel-job-api/commit/2f4a6062660800bc1ad762e6510f180dbb3d7e16))
- implement Kakao OAuth strategy enhancements ([55ca103](https://github.com/K-Soo/hotel-job-api/commit/55ca103ca591de2a67baa0af0ba91cb31eae3550))
- migration ([35db311](https://github.com/K-Soo/hotel-job-api/commit/35db311cd5275b5efefef5b8fae483fba424aab7))
- migration ([1e45d6a](https://github.com/K-Soo/hotel-job-api/commit/1e45d6a9632624375f6bc06a1a87fe4d356bd886))
- origin ([5aa765f](https://github.com/K-Soo/hotel-job-api/commit/5aa765facf0b5d4af461fbbdb7b62ac37a800d2a))
- outputs ([079e38d](https://github.com/K-Soo/hotel-job-api/commit/079e38dcdb6e3c1f4a99fa44a78ed321c817d352))
- package ([746a5d2](https://github.com/K-Soo/hotel-job-api/commit/746a5d285ab1eaf1720f78eb874f954ffbce5cbe))
- remove art ([01632a0](https://github.com/K-Soo/hotel-job-api/commit/01632a0f6ce7102d40bad23a747932323d18e33f))
- standard-version ([9578682](https://github.com/K-Soo/hotel-job-api/commit/95786827e5a24fe6b626e62631f52c586767933e))
- task definition ([f1628df](https://github.com/K-Soo/hotel-job-api/commit/f1628df62377dd82ad6697ff722c2546a4479be7))
- task definition debug ([d665cda](https://github.com/K-Soo/hotel-job-api/commit/d665cdada1b300e9da1f498a95f1d922dc849f73))
- task definition debug2 ([1af266d](https://github.com/K-Soo/hotel-job-api/commit/1af266dfae79908ee9e9f1eb5b069f2128ff6d92))
- task definition debug3 ([8fd0930](https://github.com/K-Soo/hotel-job-api/commit/8fd09303766b9ebf71860c7a1a3e7ba0d310f9dc))
- task definition debug4 ([3268a11](https://github.com/K-Soo/hotel-job-api/commit/3268a1110c76d56be81e8992e2fb3a0291ac322d))
- task definition debug5 ([29ca8c3](https://github.com/K-Soo/hotel-job-api/commit/29ca8c3b456ddfa2e33cdee72c078bfa0b5ee175))
- task definition debug6 ([62a3dcb](https://github.com/K-Soo/hotel-job-api/commit/62a3dcb83671c4c348174481631dff1589d0be6a))
- task definition debug7 ([6451a38](https://github.com/K-Soo/hotel-job-api/commit/6451a38477f6cd9d1d5f888f990a0e3d2c8a1df8))
- task download test ([37a1eaa](https://github.com/K-Soo/hotel-job-api/commit/37a1eaa22e064b712dd7f8a471cdb2cac073cc12))
- task update ([39e49c0](https://github.com/K-Soo/hotel-job-api/commit/39e49c0f613a889bdfd2129cb86a18d4afd41144))
- task update hi ([3578757](https://github.com/K-Soo/hotel-job-api/commit/35787573ad8e7aa4a5f293551a422e32b0fcf272))
- test ([96dbaae](https://github.com/K-Soo/hotel-job-api/commit/96dbaaeda8d6eb79fdd583bebb1beed4eead7c80))
- update error messages for OAuth sign-in exceptions for clarity ([d1866fc](https://github.com/K-Soo/hotel-job-api/commit/d1866fc3d97c0ee7f5e2d6d4e628b0c04ad595e0))
- workflows ([8e76a91](https://github.com/K-Soo/hotel-job-api/commit/8e76a91c3958008528545e7a10b1be8e2d02ab85))
- workflows branc test ([6119c7d](https://github.com/K-Soo/hotel-job-api/commit/6119c7ddf269a398d0acd7c5f5fa8105204b7bb1))
- workflows ls ([ff26326](https://github.com/K-Soo/hotel-job-api/commit/ff26326d5404b30cf7ae8964a4f6f55605564e36))
- workflows update ([81c9d99](https://github.com/K-Soo/hotel-job-api/commit/81c9d9997a5935060846ee57b883f4dfb83ffa37))
