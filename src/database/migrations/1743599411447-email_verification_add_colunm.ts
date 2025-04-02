import { MigrationInterface, QueryRunner } from "typeorm";

export class EmailVerificationAddColunm1743599411447 implements MigrationInterface {
    name = 'EmailVerificationAddColunm1743599411447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_verification" ADD "used" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_verification" DROP COLUMN "used"`);
    }

}
