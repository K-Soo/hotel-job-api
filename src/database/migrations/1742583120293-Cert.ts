import { MigrationInterface, QueryRunner } from "typeorm";

export class Cert1742583120293 implements MigrationInterface {
    name = 'Cert1742583120293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certification" DROP CONSTRAINT "FK_0e75e1dabe9f20110554c52a2ed"`);
        await queryRunner.query(`ALTER TABLE "account_history" DROP COLUMN "changed_by"`);
        await queryRunner.query(`ALTER TABLE "account_history" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "account_history" ADD "reason" text`);
        await queryRunner.query(`ALTER TYPE "public"."certification_certification_type_enum" RENAME TO "certification_certification_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."certification_certification_type_enum" AS ENUM('FIND_ID', 'RESET_PASSWORD', 'EMPLOYER', 'APPLICANT', 'SIGN_UP', 'RECOVER_PASSWORD')`);
        await queryRunner.query(`ALTER TABLE "certification" ALTER COLUMN "certification_type" TYPE "public"."certification_certification_type_enum" USING "certification_type"::"text"::"public"."certification_certification_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."certification_certification_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."account_history_status_enum" RENAME TO "account_history_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."account_history_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'BLOCKED', 'SUSPENDED', 'LOCKED', 'DEACTIVATED', 'WITHDRAW', 'PENDING', 'RECOVERY', 'ANONYMIZED', 'WAITING_APPROVAL')`);
        await queryRunner.query(`ALTER TABLE "account_history" ALTER COLUMN "status" TYPE "public"."account_history_status_enum" USING "status"::"text"::"public"."account_history_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."account_history_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."employer_account_status_enum" RENAME TO "employer_account_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."employer_account_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'BLOCKED', 'SUSPENDED', 'LOCKED', 'DEACTIVATED', 'WITHDRAW', 'PENDING', 'RECOVERY', 'ANONYMIZED', 'WAITING_APPROVAL')`);
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "account_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "account_status" TYPE "public"."employer_account_status_enum" USING "account_status"::"text"::"public"."employer_account_status_enum"`);
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "account_status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`DROP TYPE "public"."employer_account_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."applicant_account_status_enum" RENAME TO "applicant_account_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."applicant_account_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'BLOCKED', 'SUSPENDED', 'LOCKED', 'DEACTIVATED', 'WITHDRAW', 'PENDING', 'RECOVERY', 'ANONYMIZED', 'WAITING_APPROVAL')`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "account_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "account_status" TYPE "public"."applicant_account_status_enum" USING "account_status"::"text"::"public"."applicant_account_status_enum"`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "account_status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`DROP TYPE "public"."applicant_account_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "certification" ADD CONSTRAINT "FK_0e75e1dabe9f20110554c52a2ed" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certification" DROP CONSTRAINT "FK_0e75e1dabe9f20110554c52a2ed"`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '2215698361'`);
        await queryRunner.query(`CREATE TYPE "public"."applicant_account_status_enum_old" AS ENUM('ACTIVE', 'ANONYMIZED', 'BLOCKED', 'DEACTIVATED', 'INACTIVE', 'LOCKED', 'PENDING', 'RECOVERY', 'SUSPENDED', 'WAITING_APPROVAL')`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "account_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "account_status" TYPE "public"."applicant_account_status_enum_old" USING "account_status"::"text"::"public"."applicant_account_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "account_status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`DROP TYPE "public"."applicant_account_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."applicant_account_status_enum_old" RENAME TO "applicant_account_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."employer_account_status_enum_old" AS ENUM('ACTIVE', 'ANONYMIZED', 'BLOCKED', 'DEACTIVATED', 'INACTIVE', 'LOCKED', 'PENDING', 'RECOVERY', 'SUSPENDED', 'WAITING_APPROVAL')`);
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "account_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "account_status" TYPE "public"."employer_account_status_enum_old" USING "account_status"::"text"::"public"."employer_account_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "account_status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`DROP TYPE "public"."employer_account_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."employer_account_status_enum_old" RENAME TO "employer_account_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."account_history_status_enum_old" AS ENUM('ACTIVE', 'ANONYMIZED', 'BLOCKED', 'DEACTIVATED', 'INACTIVE', 'LOCKED', 'PENDING', 'RECOVERY', 'SUSPENDED', 'WAITING_APPROVAL')`);
        await queryRunner.query(`ALTER TABLE "account_history" ALTER COLUMN "status" TYPE "public"."account_history_status_enum_old" USING "status"::"text"::"public"."account_history_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."account_history_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."account_history_status_enum_old" RENAME TO "account_history_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."certification_certification_type_enum_old" AS ENUM('APPLICANT', 'EMPLOYER', 'FIND_ID', 'RECOVER_PASSWORD', 'RESET_PASSWORD')`);
        await queryRunner.query(`ALTER TABLE "certification" ALTER COLUMN "certification_type" TYPE "public"."certification_certification_type_enum_old" USING "certification_type"::"text"::"public"."certification_certification_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."certification_certification_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."certification_certification_type_enum_old" RENAME TO "certification_certification_type_enum"`);
        await queryRunner.query(`ALTER TABLE "account_history" DROP COLUMN "reason"`);
        await queryRunner.query(`ALTER TABLE "account_history" ADD "note" text`);
        await queryRunner.query(`ALTER TABLE "account_history" ADD "changed_by" character varying`);
        await queryRunner.query(`ALTER TABLE "certification" ADD CONSTRAINT "FK_0e75e1dabe9f20110554c52a2ed" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
