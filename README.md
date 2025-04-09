# Hotel Job - Backend

> 채용 플랫폼 | NestJS 기반 백엔드 서버
> **프로젝트 시작**: 2024년 12월 ~ 현재

<br>

## Project Overview

**Hotel Job**의 백엔드 서버는 구직자와 채용자를 연결하는 채용 플랫폼의 API를 제공합니다.

<br>

## Features

- JWT 기반 사용자 인증 (Access + Refresh, HTTP Only Cookie 방식)
- 소셜 로그인 (카카오/구글 OAuth)
- SMS 본인 인증 (KCP PASS 휴대폰 인증 연동)
- 채용 공고 / 이력서 / 결제 등 주요 도메인 API 제공
- 구직자-채용자 간 실시간 메시지 (WebSocket + Gateway)
- 관리자 통계, 포인트 시스템, 쿠폰 발급
- 결제 API 연동 (Toss Payments)
- PWA Push 알림 연동 (FCM 기반)
- 글로벌 예외 처리 필터 및 응답 포맷 통일
- Swagger API 문서 자동화
- 배포 환경별 설정 및 GitHub Actions + AWS ECS 배포 자동화

<br>

## Tech Stack

| 분류                  | 기술 / 설명                                               |
| --------------------- | --------------------------------------------------------- |
| **Framework**         | NestJS                                                    |
| **Database**          | PostgreSQL, TypeORM                                       |
| **Auth**              | JWT (Access/Refresh 토큰, HTTP Only Cookie 방식)          |
| **OAuth**             | Custom Passport + Kakao / Google 전략                     |
| **WebSocket**         | @nestjs/websockets + Socket.IO                            |
| **Docs**              | Swagger           |
| **Scheduling**        | @nestjs/schedule (정기 쿠폰, 주문서 등 백그라운드 작업) |
| **Payment**           | Toss Payments API 연동                                    |
| **Push Notification** | FCM + Firebase Admin SDK                                  |
| **AWS 연동**          | S3, Secrets Manager                      |
| **Email**             | @nestjs-modules/mailer (인증/알림 메일 발송)     |
| **Deployment**        | GitHub Actions + AWS ECS (배포 브랜치: main, develop)     |


<br>

## Infrastructure

이 프로젝트는 다음과 같은 AWS 기반 인프라에서 운영되고 있습니다

- 퍼블릭 서브넷 2개, 프라이빗 서브넷 2개로 구성된 VPC 내에서 서비스 운영
- 현재 ECS Fargate Task 및 NAT Gateway는 **요금 절감을 위해 하나의 가용 영역(AZ)만 사용** 중
- NAT Gateway 1개를 통해 프라이빗 서브넷의 외부 통신 처리
- Application Load Balancer (ALB)
  - dev-alb: 개발환경
  - prod-alb: 운영환경
- ECS Fargate Task
  - dev 환경 Task
  - prod 환경 Task
- CloudFront
   - 프로필 이미지 외부 접근 속도 개선 및 보안 강화 목적
- RDS (PostgreSQL)
  - 프라이빗 서브넷 내의 ECS Task들과 통신
- VPC 엔드포인트 구성
  - Interface 엔드포인트 (총 5개)
    - Secrets Manager
    - SSM Messages
    - ECR API
    - ECR Docker
    - CloudWatch Logs
  - Gateway 엔드포인트
    - S3

 



<br>

## Versioning
→ [CHANGELOG.md](./CHANGELOG.md)

<br>

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**.  
You may use, modify, and share this code for **non-commercial purposes only**.  
For more details, refer to the [LICENSE](./LICENSE) file.
