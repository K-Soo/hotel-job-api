import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateResumeField1737655693017 implements MigrationInterface {
    name = 'UpdateResumeField1737655693017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '3628169644'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '6596726307'`);
    }

}
