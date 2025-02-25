import { MigrationInterface, QueryRunner } from "typeorm";

export class Push1740475758416 implements MigrationInterface {
    name = 'Push1740475758416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."notification_provider_enum" AS ENUM('LOCAL', 'KAKAO', 'GOOGLE')`);
        await queryRunner.query(`CREATE TYPE "public"."notification_notification_type_enum" AS ENUM('PUSH', 'EMAIL', 'IN_APP')`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" "public"."notification_provider_enum" NOT NULL, "title" character varying(255) NOT NULL, "message" text NOT NULL, "notification_type" "public"."notification_notification_type_enum" array NOT NULL, "is_read" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "applicant_id" uuid, "employer_id" uuid, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification_push" ("id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "token" character varying(255) NOT NULL, "os" character varying, "device" character varying, "is_active_permission" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_02e6b4732c9e71d134644e035a4" UNIQUE ("token"), CONSTRAINT "PK_0755c4aeb3a6032eb0a0d8c86f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '1421819314'`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_6c5caf08822a9bce6444149f67e" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_738d303ce9a7b1e8a2870b3772f" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_738d303ce9a7b1e8a2870b3772f"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_6c5caf08822a9bce6444149f67e"`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '2825106350'`);
        await queryRunner.query(`DROP TABLE "notification_push"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TYPE "public"."notification_notification_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."notification_provider_enum"`);
    }

}
