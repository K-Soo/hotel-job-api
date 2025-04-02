import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableEmailVerification1743532838290 implements MigrationInterface {
    name = 'UpdateTableEmailVerification1743532838290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_verification" ADD "user_name" character varying`);
        await queryRunner.query(`ALTER TABLE "email_verification" ADD "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "email_verification" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "email_verification" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "email_verification" ADD "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_verification" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "email_verification" ADD "created_at" TIMESTAMP(6) NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "email_verification" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "email_verification" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "email_verification" DROP COLUMN "user_name"`);
    }

}
