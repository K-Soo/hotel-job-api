import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTable1736114199116 implements MigrationInterface {
    name = 'InitTable1736114199116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "business_registration_number" character varying NOT NULL, "company_name" character varying NOT NULL, "business_owner" character varying NOT NULL, "address" character varying NOT NULL, "address_detail" character varying NOT NULL, "manager_name" character varying NOT NULL, "manager_email" character varying NOT NULL, "manager_number" character varying NOT NULL, "employer_id" uuid, CONSTRAINT "REL_0301efca2c4d6ccc7ba4db5a39" UNIQUE ("employer_id"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."employer_provider_enum" AS ENUM('LOCAL', 'KAKAO')`);
        await queryRunner.query(`CREATE TYPE "public"."employer_role_enum" AS ENUM('ADMIN', 'EMPLOYER', 'JOB_SEEKER')`);
        await queryRunner.query(`CREATE TYPE "public"."employer_account_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'BLOCKED', 'SUSPENDED', 'LOCKED', 'DELETED', 'PENDING', 'RECOVERY', 'ANONYMIZED', 'WAITING_APPROVAL')`);
        await queryRunner.query(`CREATE TYPE "public"."employer_company_verification_status_enum" AS ENUM('NOT_REQUESTED', 'PENDING', 'VERIFIED', 'REJECTED')`);
        await queryRunner.query(`CREATE TABLE "employer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "password" character varying NOT NULL, "provider" "public"."employer_provider_enum" NOT NULL DEFAULT 'LOCAL', "role" "public"."employer_role_enum" NOT NULL DEFAULT 'EMPLOYER', "account_status" "public"."employer_account_status_enum" NOT NULL DEFAULT 'ACTIVE', "company_verification_status" "public"."employer_company_verification_status_enum" NOT NULL DEFAULT 'NOT_REQUESTED', "nickname" character varying NOT NULL, "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "password_changed_at" TIMESTAMP(0) WITH TIME ZONE, CONSTRAINT "UQ_089d8e683bd7db21b45abc92509" UNIQUE ("nickname"), CONSTRAINT "PK_74029e6b1f17a4c7c66d43cfd34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consent" ("id" SERIAL NOT NULL, "age_agree" boolean NOT NULL DEFAULT false, "personal_info_agree" boolean NOT NULL DEFAULT false, "service_terms_agree" boolean NOT NULL DEFAULT false, "sms_marketing_agree" boolean NOT NULL DEFAULT false, "email_marketing_agree" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "employer_id" uuid, "applicant_id" uuid, CONSTRAINT "REL_001277a5e6265d6fcc6d6dd2ef" UNIQUE ("employer_id"), CONSTRAINT "REL_c7bb556e83eddfd004f57b3322" UNIQUE ("applicant_id"), CONSTRAINT "PK_9115e8d6b082d4fc46d56134d29" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."experience_job_enum" AS ENUM('MAINTENANCE', 'SECURITY', 'MANAGEMENT', 'MARKETING', 'IT_SUPPORT', 'ADMIN_SUPPORT', 'FACILITY_CLEANER', 'PARKING_ATTENDANT', 'OTHER', 'CLEANING', 'CLEANING_TEAM', 'BEDDING', 'CASHIER', 'DUTY_OFFICER', 'DUTY_ASSISTANT', 'CHEF', 'KITCHEN_ASSISTANT', 'MANAGER', 'GENERAL_MANAGER', 'ROOM_MANAGER', 'BANQUET_MANAGER', 'FOOD_BEVERAGE_MANAGER', 'OTHER_MANAGER', 'HOUSEKEEPING', 'ROOM_ATTENDANT', 'FRONT_DESK', 'CONCIERGE', 'VALET_PARKING', 'BELLBOY', 'EVENT_COORDINATOR', 'SPA_THERAPIST', 'SPA_MANAGER', 'FITNESS_TRAINER', 'RESTAURANT_MANAGER', 'BARTENDER', 'HEAD_CHEF', 'TOUR_COORDINATOR', 'CASINO_DEALER', 'GIFT_SHOP_ATTENDANT', 'POOL_ATTENDANT', 'KIDS_CLUB_STAFF')`);
        await queryRunner.query(`CREATE TYPE "public"."experience_position_enum" AS ENUM('NONE', 'INTERN', 'PART_TIME', 'STAFF', 'ASSISTANT_MANAGER', 'MANAGER', 'TEAM_LEADER', 'DIRECTOR', 'GENERAL_MANAGER', 'EXECUTIVE', 'CEO')`);
        await queryRunner.query(`CREATE TYPE "public"."experience_location_enum" AS ENUM('NONE', '전국', '서울특별시', '부산광역시', '강원도', '경기도', '경상남도', '경상북도', '광주광역시', '대구광역시', '대전광역시', '세종특별자치시', '울산광역시', '인천광역시', '전라남도', '전라북도', '제주특별자치도', '충청남도', '충청북도')`);
        await queryRunner.query(`CREATE TYPE "public"."experience_salary_type_enum" AS ENUM('NONE', 'ANNUAL', 'MONTHLY', 'DAILY', 'HOURLY')`);
        await queryRunner.query(`CREATE TABLE "experience" ("id" SERIAL NOT NULL, "company_name" character varying(255) NOT NULL, "is_employed" boolean NOT NULL DEFAULT false, "responsibility" text NOT NULL DEFAULT '', "job" "public"."experience_job_enum" NOT NULL, "position" "public"."experience_position_enum" NOT NULL DEFAULT 'NONE', "start_date" TIMESTAMP(0) WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP(0) WITH TIME ZONE, "location" "public"."experience_location_enum" NOT NULL DEFAULT 'NONE', "reason_for_leaving" character varying(255) DEFAULT '', "salary_type" "public"."experience_salary_type_enum" NOT NULL DEFAULT 'NONE', "base_salary" integer NOT NULL DEFAULT '0', "allowance" integer NOT NULL DEFAULT '0', "total_salary" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "resume_id" integer, CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."license_license_stage_enum" AS ENUM('FIRST', 'SECOND', 'WRITTEN', 'PRACTICAL', 'FINAL')`);
        await queryRunner.query(`CREATE TABLE "license" ("id" SERIAL NOT NULL, "license_name" character varying(100) NOT NULL, "license_stage" "public"."license_license_stage_enum" NOT NULL, "date_of_completion" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "resume_id" integer, CONSTRAINT "UQ_16591ed2ce33a008f78016ebd31" UNIQUE ("resume_id", "license_name"), CONSTRAINT "PK_f168ac1ca5ba87286d03b2ef905" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."military_military_status_enum" AS ENUM('NONE', 'NOT_APPLICABLE', 'COMPLETED', 'NOT_COMPLETED', 'EXEMPTED', 'MEDICALLY_DISCHARGED')`);
        await queryRunner.query(`CREATE TABLE "military" ("id" SERIAL NOT NULL, "military_status" "public"."military_military_status_enum" NOT NULL, "reason" character varying(255) NOT NULL DEFAULT '', "enlistment_date" TIMESTAMP(0) WITH TIME ZONE, "discharge_date" TIMESTAMP(0) WITH TIME ZONE, "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "resume_id" integer, CONSTRAINT "REL_2100c9bfbfb9ba5abd37afa682" UNIQUE ("resume_id"), CONSTRAINT "PK_8cec15e30cb876f84c78d58fbc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."condition_job_enum" AS ENUM('MAINTENANCE', 'SECURITY', 'MANAGEMENT', 'MARKETING', 'IT_SUPPORT', 'ADMIN_SUPPORT', 'FACILITY_CLEANER', 'PARKING_ATTENDANT', 'OTHER', 'CLEANING', 'CLEANING_TEAM', 'BEDDING', 'CASHIER', 'DUTY_OFFICER', 'DUTY_ASSISTANT', 'CHEF', 'KITCHEN_ASSISTANT', 'MANAGER', 'GENERAL_MANAGER', 'ROOM_MANAGER', 'BANQUET_MANAGER', 'FOOD_BEVERAGE_MANAGER', 'OTHER_MANAGER', 'HOUSEKEEPING', 'ROOM_ATTENDANT', 'FRONT_DESK', 'CONCIERGE', 'VALET_PARKING', 'BELLBOY', 'EVENT_COORDINATOR', 'SPA_THERAPIST', 'SPA_MANAGER', 'FITNESS_TRAINER', 'RESTAURANT_MANAGER', 'BARTENDER', 'HEAD_CHEF', 'TOUR_COORDINATOR', 'CASINO_DEALER', 'GIFT_SHOP_ATTENDANT', 'POOL_ATTENDANT', 'KIDS_CLUB_STAFF')`);
        await queryRunner.query(`CREATE TYPE "public"."condition_employment_type_enum" AS ENUM('FULL_TIME', 'CONTRACT', 'PART_TIME', 'DAILY_WORKER', 'INTERN')`);
        await queryRunner.query(`CREATE TYPE "public"."condition_salary_type_enum" AS ENUM('NONE', 'ANNUAL', 'MONTHLY', 'DAILY', 'HOURLY')`);
        await queryRunner.query(`CREATE TYPE "public"."condition_benefit_enum" AS ENUM('HEALTH_INSURANCE', 'MEAL_SUPPORT', 'TRANSPORTATION_SUPPORT', 'HOUSING_SUPPORT', 'BONUS', 'PAID_LEAVE', 'FLEXIBLE_WORK', 'CHILDCARE_SUPPORT', 'RETIREMENT_PLAN')`);
        await queryRunner.query(`CREATE TABLE "condition" ("id" SERIAL NOT NULL, "job" "public"."condition_job_enum" NOT NULL, "employment_type" "public"."condition_employment_type_enum" NOT NULL, "salary_type" "public"."condition_salary_type_enum" NOT NULL, "base_salary" integer NOT NULL DEFAULT '0', "allowance" integer NOT NULL DEFAULT '0', "total_salary" integer NOT NULL DEFAULT '0', "benefit" "public"."condition_benefit_enum" array NOT NULL DEFAULT '{}', "location" json NOT NULL DEFAULT '[]', "resume_id" integer, CONSTRAINT "REL_59de1c6c53acb130853172e589" UNIQUE ("resume_id"), CONSTRAINT "PK_f0f824897e3acf880a6e488b632" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."resume_status_enum" AS ENUM('DRAFT', 'SUBMITTED', 'HIDDEN', 'DELETED')`);
        await queryRunner.query(`CREATE TYPE "public"."resume_sanction_reason_enum" AS ENUM('NONE', 'INAPPROPRIATE_LANGUAGE', 'FALSE_INFORMATION', 'ILLEGAL_CONTENT', 'POLICY_VIOLATION')`);
        await queryRunner.query(`CREATE TYPE "public"."resume_career_level_enum" AS ENUM('NEWBIE', 'EXPERIENCED')`);
        await queryRunner.query(`CREATE TYPE "public"."resume_resume_type_enum" AS ENUM('FILE', 'GENERAL')`);
        await queryRunner.query(`CREATE TYPE "public"."resume_education_enum" AS ENUM('ELEMENTARY', 'MIDDLE_SCHOOL', 'HIGH_SCHOOL', 'COLLEGE_2_3_YEAR', 'COLLEGE_4_YEAR', 'MASTER', 'DOCTORATE')`);
        await queryRunner.query(`CREATE TABLE "resume" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_visible" boolean NOT NULL DEFAULT false, "is_default" boolean NOT NULL DEFAULT false, "status" "public"."resume_status_enum" NOT NULL DEFAULT 'SUBMITTED', "sanction_reason" "public"."resume_sanction_reason_enum" NOT NULL DEFAULT 'NONE', "career_level" "public"."resume_career_level_enum" NOT NULL, "resume_type" "public"."resume_resume_type_enum" NOT NULL DEFAULT 'GENERAL', "title" character varying(255) NOT NULL, "summary" character varying(500) DEFAULT '', "education" "public"."resume_education_enum" NOT NULL, "is_graduated" boolean NOT NULL DEFAULT true, "languages" json NOT NULL DEFAULT '[]', "introduction" text NOT NULL DEFAULT '', "career_detail" text NOT NULL DEFAULT '', "is_required_agreement" boolean NOT NULL DEFAULT false, "is_optional_agreement" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "applicant_id" uuid, CONSTRAINT "UQ_19b4c58aadb0dcba0c453f43ec6" UNIQUE ("uuid"), CONSTRAINT "PK_7ff05ea7599e13fac01ac812e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_resume_uuid" ON "resume" ("uuid") `);
        await queryRunner.query(`CREATE TYPE "public"."applicant_provider_enum" AS ENUM('LOCAL', 'KAKAO')`);
        await queryRunner.query(`CREATE TYPE "public"."applicant_role_enum" AS ENUM('ADMIN', 'EMPLOYER', 'JOB_SEEKER')`);
        await queryRunner.query(`CREATE TABLE "applicant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "provider" "public"."applicant_provider_enum" NOT NULL, "role" "public"."applicant_role_enum" NOT NULL DEFAULT 'JOB_SEEKER', "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_1c33583f19967b0e56ee23bafce" UNIQUE ("user_id"), CONSTRAINT "PK_f4a6e907b8b17f293eb073fc5ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('NONE', 'MAIL', 'FEMALE')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL DEFAULT '', "gender" "public"."user_gender_enum" NOT NULL DEFAULT 'NONE', "date_of_birth" TIMESTAMP(0) WITH TIME ZONE, "profile_image" character varying NOT NULL DEFAULT '', "email" character varying(255) NOT NULL DEFAULT '', "is_email_verified" boolean NOT NULL DEFAULT false, "email_verification_code" character varying(255), "phone" character varying(11) NOT NULL DEFAULT '', "is_overseas_phone" boolean NOT NULL DEFAULT false, "phone_verification_code" character varying(255), "address" character varying(255) NOT NULL DEFAULT '', "address_detail" character varying(255) NOT NULL DEFAULT '', "is_overseas_resident" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "applicant_id" uuid, CONSTRAINT "REL_52b0e8ed3202f5cdc36f7da279" UNIQUE ("applicant_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5417af0062cf987495b611b59c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_0301efca2c4d6ccc7ba4db5a393" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consent" ADD CONSTRAINT "FK_001277a5e6265d6fcc6d6dd2ef8" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consent" ADD CONSTRAINT "FK_c7bb556e83eddfd004f57b33229" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_6b65e2a85c9838ca97137e4ef5b" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_a78bf47cb7c48e5fba9aeb83f17" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "military" ADD CONSTRAINT "FK_2100c9bfbfb9ba5abd37afa6829" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "condition" ADD CONSTRAINT "FK_59de1c6c53acb130853172e589a" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resume" ADD CONSTRAINT "FK_5b19ae7262b795819b4d8dd1d30" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_52b0e8ed3202f5cdc36f7da2791" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_52b0e8ed3202f5cdc36f7da2791"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP CONSTRAINT "FK_5b19ae7262b795819b4d8dd1d30"`);
        await queryRunner.query(`ALTER TABLE "condition" DROP CONSTRAINT "FK_59de1c6c53acb130853172e589a"`);
        await queryRunner.query(`ALTER TABLE "military" DROP CONSTRAINT "FK_2100c9bfbfb9ba5abd37afa6829"`);
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_a78bf47cb7c48e5fba9aeb83f17"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_6b65e2a85c9838ca97137e4ef5b"`);
        await queryRunner.query(`ALTER TABLE "consent" DROP CONSTRAINT "FK_c7bb556e83eddfd004f57b33229"`);
        await queryRunner.query(`ALTER TABLE "consent" DROP CONSTRAINT "FK_001277a5e6265d6fcc6d6dd2ef8"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_0301efca2c4d6ccc7ba4db5a393"`);
        await queryRunner.query(`DROP TABLE "test"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`DROP TABLE "applicant"`);
        await queryRunner.query(`DROP TYPE "public"."applicant_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."applicant_provider_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_resume_uuid"`);
        await queryRunner.query(`DROP TABLE "resume"`);
        await queryRunner.query(`DROP TYPE "public"."resume_education_enum"`);
        await queryRunner.query(`DROP TYPE "public"."resume_resume_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."resume_career_level_enum"`);
        await queryRunner.query(`DROP TYPE "public"."resume_sanction_reason_enum"`);
        await queryRunner.query(`DROP TYPE "public"."resume_status_enum"`);
        await queryRunner.query(`DROP TABLE "condition"`);
        await queryRunner.query(`DROP TYPE "public"."condition_benefit_enum"`);
        await queryRunner.query(`DROP TYPE "public"."condition_salary_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."condition_employment_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."condition_job_enum"`);
        await queryRunner.query(`DROP TABLE "military"`);
        await queryRunner.query(`DROP TYPE "public"."military_military_status_enum"`);
        await queryRunner.query(`DROP TABLE "license"`);
        await queryRunner.query(`DROP TYPE "public"."license_license_stage_enum"`);
        await queryRunner.query(`DROP TABLE "experience"`);
        await queryRunner.query(`DROP TYPE "public"."experience_salary_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."experience_location_enum"`);
        await queryRunner.query(`DROP TYPE "public"."experience_position_enum"`);
        await queryRunner.query(`DROP TYPE "public"."experience_job_enum"`);
        await queryRunner.query(`DROP TABLE "consent"`);
        await queryRunner.query(`DROP TABLE "employer"`);
        await queryRunner.query(`DROP TYPE "public"."employer_company_verification_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."employer_account_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."employer_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."employer_provider_enum"`);
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
