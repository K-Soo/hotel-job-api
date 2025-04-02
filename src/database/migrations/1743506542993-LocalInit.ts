import { MigrationInterface, QueryRunner } from "typeorm";

export class LocalInit1743506542993 implements MigrationInterface {
    name = 'LocalInit1743506542993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email_verification" ("id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "email" character varying NOT NULL, "code" character varying NOT NULL, "expired_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "verified" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b985a8362d9dac51e3d6120d40e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "email_verification"`);
    }

}
