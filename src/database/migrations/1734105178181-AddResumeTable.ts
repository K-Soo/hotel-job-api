import { MigrationInterface, QueryRunner } from "typeorm";

export class AddResumeTable1734105178181 implements MigrationInterface {
    name = 'AddResumeTable1734105178181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."resume_status_enum" AS ENUM('DRAFT', 'SUBMITTED', 'HIDDEN', 'DELETED')`);
        await queryRunner.query(`CREATE TYPE "public"."resume_sanctionreason_enum" AS ENUM('NONE', 'INAPPROPRIATE_LANGUAGE', 'FALSE_INFORMATION', 'ILLEGAL_CONTENT', 'POLICY_VIOLATION')`);
        await queryRunner.query(`CREATE TABLE "resume" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "applicantId" uuid NOT NULL, "isVisible" boolean NOT NULL DEFAULT false, "isDefault" boolean NOT NULL DEFAULT false, "status" "public"."resume_status_enum" NOT NULL DEFAULT 'DRAFT', "sanctionReason" "public"."resume_sanctionreason_enum" NOT NULL DEFAULT 'NONE', "createdAt" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "summary" character varying(500) DEFAULT '', "languageSkills" json DEFAULT '[]', "introduction" text DEFAULT '', "careerDetails" text DEFAULT '', CONSTRAINT "UQ_19b4c58aadb0dcba0c453f43ec6" UNIQUE ("uuid"), CONSTRAINT "PK_7ff05ea7599e13fac01ac812e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_resume_uuid" ON "resume" ("uuid") `);
        await queryRunner.query(`CREATE TYPE "public"."experience_job_enum" AS ENUM('MAINTENANCE', 'SECURITY', 'MANAGEMENT', 'MARKETING', 'IT_SUPPORT', 'ADMIN_SUPPORT', 'FACILITY_CLEANER', 'PARKING_ATTENDANT', 'OTHER', 'CLEANING', 'CLEANING_TEAM', 'BEDDING', 'CASHIER', 'DUTY_OFFICER', 'DUTY_ASSISTANT', 'CHEF', 'KITCHEN_ASSISTANT', 'MANAGER', 'GENERAL_MANAGER', 'ROOM_MANAGER', 'BANQUET_MANAGER', 'FOOD_BEVERAGE_MANAGER', 'OTHER_MANAGER', 'HOUSEKEEPING', 'ROOM_ATTENDANT', 'FRONT_DESK', 'CONCIERGE', 'VALET_PARKING', 'BELLBOY', 'EVENT_COORDINATOR', 'SPA_THERAPIST', 'SPA_MANAGER', 'FITNESS_TRAINER', 'RESTAURANT_MANAGER', 'BARTENDER', 'HEAD_CHEF', 'TOUR_COORDINATOR', 'CASINO_DEALER', 'GIFT_SHOP_ATTENDANT', 'POOL_ATTENDANT', 'KIDS_CLUB_STAFF')`);
        await queryRunner.query(`CREATE TYPE "public"."experience_position_enum" AS ENUM('INTERN', 'PART_TIME', 'STAFF', 'ASSISTANT_MANAGER', 'MANAGER', 'TEAM_LEADER', 'DIRECTOR', 'GENERAL_MANAGER', 'EXECUTIVE', 'CEO')`);
        await queryRunner.query(`CREATE TYPE "public"."experience_salarytype_enum" AS ENUM('NONE', 'ANNUAL', 'MONTHLY', 'DAILY')`);
        await queryRunner.query(`CREATE TABLE "experience" ("id" SERIAL NOT NULL, "isEmployed" boolean NOT NULL DEFAULT false, "companyName" character varying(255) NOT NULL, "job" "public"."experience_job_enum" NOT NULL, "position" "public"."experience_position_enum" NOT NULL, "startDate" TIMESTAMP(0) WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP(0) WITH TIME ZONE, "location" character varying(255) DEFAULT '', "reasonForLeaving" character varying(255) DEFAULT '', "salaryType" "public"."experience_salarytype_enum" NOT NULL DEFAULT 'NONE', "salaryAmount" integer NOT NULL DEFAULT '0', "allowance" integer NOT NULL DEFAULT '0', "totalSalary" integer NOT NULL DEFAULT '0', "resumeId" integer, CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "applicant" DROP CONSTRAINT "UQ_546a819aa07c196d7aa0f9d17db"`);
        await queryRunner.query(`ALTER TABLE "applicant" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "applicant" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applicant" ADD CONSTRAINT "UQ_546a819aa07c196d7aa0f9d17db" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "resume" ADD CONSTRAINT "FK_76dc2a925952542bc16de2142b5" FOREIGN KEY ("applicantId") REFERENCES "applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_9bfd4060e7f71a77c6b82b1745b" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_9bfd4060e7f71a77c6b82b1745b"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP CONSTRAINT "FK_76dc2a925952542bc16de2142b5"`);
        await queryRunner.query(`ALTER TABLE "applicant" DROP CONSTRAINT "UQ_546a819aa07c196d7aa0f9d17db"`);
        await queryRunner.query(`ALTER TABLE "applicant" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "applicant" ADD "userId" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applicant" ADD CONSTRAINT "UQ_546a819aa07c196d7aa0f9d17db" UNIQUE ("userId")`);
        await queryRunner.query(`DROP TABLE "experience"`);
        await queryRunner.query(`DROP TYPE "public"."experience_salarytype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."experience_position_enum"`);
        await queryRunner.query(`DROP TYPE "public"."experience_job_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_resume_uuid"`);
        await queryRunner.query(`DROP TABLE "resume"`);
        await queryRunner.query(`DROP TYPE "public"."resume_sanctionreason_enum"`);
        await queryRunner.query(`DROP TYPE "public"."resume_status_enum"`);
    }

}
