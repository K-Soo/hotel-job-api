import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmailVerification1743616651919 implements MigrationInterface {
    name = 'CreateEmailVerification1743616651919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email_verification" ("id" SERIAL NOT NULL, "user_id" character varying, "user_name" character varying, "email" character varying NOT NULL, "code" character varying NOT NULL, "expired_at" TIMESTAMP NOT NULL, "verified" boolean NOT NULL DEFAULT false, "used" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b985a8362d9dac51e3d6120d40e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "email_verification"`);
    }

}
