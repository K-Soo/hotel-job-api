import { MigrationInterface, QueryRunner } from "typeorm";

export class WebSocket1741190756751 implements MigrationInterface {
    name = 'WebSocket1741190756751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_738d303ce9a7b1e8a2870b3772f"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_6c5caf08822a9bce6444149f67e"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "provider"`);
        await queryRunner.query(`DROP TYPE "public"."notification_provider_enum"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "is_read"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "applicant_id"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "employer_id"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "user_ids" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "read_by_user_ids" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`CREATE TYPE "public"."notification_category_enum" AS ENUM('NOTICE', 'EVENT', 'RECRUIT', 'WELCOME', 'APPLICANT', 'RECRUITMENT')`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "category" "public"."notification_category_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "link" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '2215698361'`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "title" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "title" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '1421819314'`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "link"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "category"`);
        await queryRunner.query(`DROP TYPE "public"."notification_category_enum"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "read_by_user_ids"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "user_ids"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "employer_id" uuid`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "applicant_id" uuid`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "is_read" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`CREATE TYPE "public"."notification_provider_enum" AS ENUM('GOOGLE', 'KAKAO', 'LOCAL')`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "provider" "public"."notification_provider_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_6c5caf08822a9bce6444149f67e" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_738d303ce9a7b1e8a2870b3772f" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
