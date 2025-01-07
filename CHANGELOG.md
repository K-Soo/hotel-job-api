# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
