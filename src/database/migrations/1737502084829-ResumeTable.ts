import { MigrationInterface, QueryRunner } from "typeorm";

export class ResumeTable1737502084829 implements MigrationInterface {
    name = 'ResumeTable1737502084829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experience" DROP COLUMN "location"`);
        await queryRunner.query(`DROP TYPE "public"."experience_location_enum"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP COLUMN "salary_type"`);
        await queryRunner.query(`DROP TYPE "public"."experience_salary_type_enum"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP COLUMN "base_salary"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP COLUMN "allowance"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP COLUMN "total_salary"`);
        await queryRunner.query(`ALTER TABLE "experience" ALTER COLUMN "position" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "experience" ALTER COLUMN "position" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '6596726307'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '4887731980'`);
        await queryRunner.query(`ALTER TABLE "experience" ALTER COLUMN "position" SET DEFAULT 'NONE'`);
        await queryRunner.query(`ALTER TABLE "experience" ALTER COLUMN "position" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "experience" ADD "total_salary" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "experience" ADD "allowance" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "experience" ADD "base_salary" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE TYPE "public"."experience_salary_type_enum" AS ENUM('NONE', 'ANNUAL', 'MONTHLY', 'DAILY', 'HOURLY')`);
        await queryRunner.query(`ALTER TABLE "experience" ADD "salary_type" "public"."experience_salary_type_enum" NOT NULL DEFAULT 'NONE'`);
        await queryRunner.query(`CREATE TYPE "public"."experience_location_enum" AS ENUM('NONE', '전국', '서울특별시', '부산광역시', '강원도', '경기도', '경상남도', '경상북도', '광주광역시', '대구광역시', '대전광역시', '세종특별자치시', '울산광역시', '인천광역시', '전라남도', '전라북도', '제주특별자치도', '충청남도', '충청북도')`);
        await queryRunner.query(`ALTER TABLE "experience" ADD "location" "public"."experience_location_enum" NOT NULL DEFAULT 'NONE'`);
    }

}
