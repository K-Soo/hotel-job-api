import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateResume1737656259711 implements MigrationInterface {
    name = 'UpdateResume1737656259711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '5759670237'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '6596726307'`);
    }

}
