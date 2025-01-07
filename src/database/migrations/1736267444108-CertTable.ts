import { MigrationInterface, QueryRunner } from "typeorm";

export class CertTable1736267444108 implements MigrationInterface {
    name = 'CertTable1736267444108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."certification_certification_type_enum" AS ENUM('FIND_ID', 'RESET_PASSWORD', 'EMPLOYER', 'APPLICANT', 'RECOVER_PASSWORD')`);
        await queryRunner.query(`CREATE TYPE "public"."certification_comm_id_enum" AS ENUM('SKT', 'LGT', 'KTF', 'SKM', 'LGM', 'KTM')`);
        await queryRunner.query(`CREATE TABLE "certification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "certification_type" "public"."certification_certification_type_enum" NOT NULL, "birth_day" character varying NOT NULL, "ci" character varying NOT NULL, "ci_url" character varying NOT NULL, "comm_id" "public"."certification_comm_id_enum" NOT NULL, "di" character varying NOT NULL, "di_url" character varying NOT NULL, "local_code" character varying NOT NULL, "phone_no" character varying NOT NULL, "res_cd" character varying NOT NULL, "res_msg" character varying NOT NULL, "sex_code" character varying NOT NULL, "user_name" character varying NOT NULL, "web_siteid" character varying NOT NULL, "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "applicant_id" uuid, "employer_id" uuid, CONSTRAINT "REL_ad24b0036258e6a170ca13e884" UNIQUE ("applicant_id"), CONSTRAINT "REL_0e75e1dabe9f20110554c52a2e" UNIQUE ("employer_id"), CONSTRAINT "PK_a7364bd3e4a407f67d8165b820c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."employer_certification_status_enum" AS ENUM('PENDING', 'VERIFIED', 'REJECTED', 'UNVERIFIED')`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "certification_status" "public"."employer_certification_status_enum" NOT NULL DEFAULT 'UNVERIFIED'`);
        await queryRunner.query(`CREATE TYPE "public"."applicant_certification_status_enum" AS ENUM('PENDING', 'VERIFIED', 'REJECTED', 'UNVERIFIED')`);
        await queryRunner.query(`ALTER TABLE "applicant" ADD "certification_status" "public"."applicant_certification_status_enum" NOT NULL DEFAULT 'UNVERIFIED'`);
        await queryRunner.query(`CREATE TYPE "public"."applicant_account_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'BLOCKED', 'SUSPENDED', 'LOCKED', 'DELETED', 'PENDING', 'RECOVERY', 'ANONYMIZED', 'WAITING_APPROVAL')`);
        await queryRunner.query(`ALTER TABLE "applicant" ADD "account_status" "public"."applicant_account_status_enum" NOT NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "applicant" ADD "nickname" character varying NOT NULL DEFAULT '3463077247'`);
        await queryRunner.query(`ALTER TABLE "applicant" ADD CONSTRAINT "UQ_ef1bdbf691b6e4f69212279b219" UNIQUE ("nickname")`);
        await queryRunner.query(`ALTER TYPE "public"."employer_provider_enum" RENAME TO "employer_provider_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."employer_provider_enum" AS ENUM('LOCAL', 'KAKAO', 'GOOGLE')`);
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "provider" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "provider" TYPE "public"."employer_provider_enum" USING "provider"::"text"::"public"."employer_provider_enum"`);
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "provider" SET DEFAULT 'LOCAL'`);
        await queryRunner.query(`DROP TYPE "public"."employer_provider_enum_old"`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TYPE "public"."applicant_provider_enum" RENAME TO "applicant_provider_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."applicant_provider_enum" AS ENUM('LOCAL', 'KAKAO', 'GOOGLE')`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "provider" TYPE "public"."applicant_provider_enum" USING "provider"::"text"::"public"."applicant_provider_enum"`);
        await queryRunner.query(`DROP TYPE "public"."applicant_provider_enum_old"`);
        await queryRunner.query(`ALTER TABLE "certification" ADD CONSTRAINT "FK_ad24b0036258e6a170ca13e8848" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "certification" ADD CONSTRAINT "FK_0e75e1dabe9f20110554c52a2ed" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certification" DROP CONSTRAINT "FK_0e75e1dabe9f20110554c52a2ed"`);
        await queryRunner.query(`ALTER TABLE "certification" DROP CONSTRAINT "FK_ad24b0036258e6a170ca13e8848"`);
        await queryRunner.query(`CREATE TYPE "public"."applicant_provider_enum_old" AS ENUM('LOCAL', 'KAKAO')`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "provider" TYPE "public"."applicant_provider_enum_old" USING "provider"::"text"::"public"."applicant_provider_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."applicant_provider_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."applicant_provider_enum_old" RENAME TO "applicant_provider_enum"`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`CREATE TYPE "public"."employer_provider_enum_old" AS ENUM('LOCAL', 'KAKAO')`);
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "provider" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "provider" TYPE "public"."employer_provider_enum_old" USING "provider"::"text"::"public"."employer_provider_enum_old"`);
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "provider" SET DEFAULT 'LOCAL'`);
        await queryRunner.query(`DROP TYPE "public"."employer_provider_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."employer_provider_enum_old" RENAME TO "employer_provider_enum"`);
        await queryRunner.query(`ALTER TABLE "applicant" DROP CONSTRAINT "UQ_ef1bdbf691b6e4f69212279b219"`);
        await queryRunner.query(`ALTER TABLE "applicant" DROP COLUMN "nickname"`);
        await queryRunner.query(`ALTER TABLE "applicant" DROP COLUMN "account_status"`);
        await queryRunner.query(`DROP TYPE "public"."applicant_account_status_enum"`);
        await queryRunner.query(`ALTER TABLE "applicant" DROP COLUMN "certification_status"`);
        await queryRunner.query(`DROP TYPE "public"."applicant_certification_status_enum"`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "certification_status"`);
        await queryRunner.query(`DROP TYPE "public"."employer_certification_status_enum"`);
        await queryRunner.query(`DROP TABLE "certification"`);
        await queryRunner.query(`DROP TYPE "public"."certification_comm_id_enum"`);
        await queryRunner.query(`DROP TYPE "public"."certification_certification_type_enum"`);
    }

}
