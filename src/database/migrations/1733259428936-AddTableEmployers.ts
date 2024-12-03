import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableEmployers1733259428936 implements MigrationInterface {
    name = 'AddTableEmployers1733259428936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employer" ("id" SERIAL NOT NULL, "provider" character varying NOT NULL DEFAULT 'local', "role" character varying NOT NULL DEFAULT 'user', "userId" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_74029e6b1f17a4c7c66d43cfd34" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "employer"`);
    }

}
