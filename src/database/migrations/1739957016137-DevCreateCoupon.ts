import { MigrationInterface, QueryRunner } from "typeorm";

export class DevCreateCoupon1739957016137 implements MigrationInterface {
    name = 'DevCreateCoupon1739957016137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_recruitment" DROP CONSTRAINT "FK_2d629dbdbed075f082566becfc2"`);
        await queryRunner.query(`ALTER TABLE "payment_recruitment" RENAME COLUMN "recruit_id" TO "recruitment_id"`);
        await queryRunner.query(`ALTER TABLE "application" RENAME COLUMN "final_decision_status" TO "applicant_id"`);
        await queryRunner.query(`ALTER TYPE "public"."application_final_decision_status_enum" RENAME TO "application_applicant_id_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."application_announcement_announcement_type_enum" AS ENUM('ACCEPT', 'REJECT')`);
        await queryRunner.query(`CREATE TYPE "public"."application_announcement_result_notification_status_enum" AS ENUM('DOCUMENT_PASS', 'INTERVIEW_PASS', 'FINAL_PASS', 'DOCUMENT_FAIL', 'INTERVIEW_FAIL', 'FAIL')`);
        await queryRunner.query(`CREATE TABLE "application_announcement" ("id" SERIAL NOT NULL, "announcement_type" "public"."application_announcement_announcement_type_enum" NOT NULL, "result_notification_status" "public"."application_announcement_result_notification_status_enum" NOT NULL, "message" text NOT NULL, "title" character varying(255) NOT NULL, "announced_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "is_sent" boolean NOT NULL DEFAULT false, "sent_at" TIMESTAMP(0) WITH TIME ZONE, "recruitment_id" uuid, CONSTRAINT "PK_3ea5bcad539fe4ee3004091a76c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "application_announcement_recipient" ("id" SERIAL NOT NULL, "application_id" integer, "announcement_id" integer, CONSTRAINT "PK_77533e343a8a7d66b15c31eb317" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "expires_at"`);
        await queryRunner.query(`ALTER TABLE "employer_coupon" ADD "description" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "employer_coupon" ADD "is_expired" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "employer_coupon" ADD "issued_at" TIMESTAMP(6) WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "coupon_discount_amount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "total_discount_amount" integer NOT NULL DEFAULT '0'`);

        await queryRunner.query(`CREATE TYPE "public"."payment_payment_type_enum" AS ENUM('RECRUITMENT', 'RESUME_VIEW', 'ETC')`);
        // 기본값을 설정하면서 컬럼 추가
        await queryRunner.query(`ALTER TABLE "payment" ADD "payment_type" "public"."payment_payment_type_enum" DEFAULT 'RECRUITMENT'`);

        // 기존 NULL 값을 기본값으로 업데이트
        await queryRunner.query(`UPDATE "payment" SET "payment_type" = 'RECRUITMENT' WHERE "payment_type" IS NULL`);

        // 이제 NOT NULL 적용
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "payment_type" SET NOT NULL`);

        // await queryRunner.query(`ALTER TABLE "payment" ADD "payment_type" "public"."payment_payment_type_enum" NOT NULL`);


        await queryRunner.query(`ALTER TABLE "payment_recruitment_options" ADD "bonus_days" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "payment_recruitment_options" ADD "posting_start_date" TIMESTAMP(0) WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "payment_recruitment_options" ADD "posting_end_date" TIMESTAMP(3) WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "recruitment" ADD "priority_date" TIMESTAMP(6) WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "recruitment" ADD "list_up_count" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "recruitment" ADD "is_list_up" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "employer_coupon" ALTER COLUMN "used_at" TYPE TIMESTAMP(6) WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "employer_coupon" ALTER COLUMN "expires_at" TYPE TIMESTAMP(6) WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "application" DROP COLUMN "applicant_id"`);
        await queryRunner.query(`ALTER TABLE "application" ADD "applicant_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."application_review_stage_status_enum" RENAME TO "application_review_stage_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."application_review_stage_status_enum" AS ENUM('DOCUMENT', 'INTERVIEW', 'INTERVIEW_PASS', 'ACCEPT', 'REJECT')`);
        await queryRunner.query(`ALTER TABLE "application" ALTER COLUMN "review_stage_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "application" ALTER COLUMN "review_stage_status" TYPE "public"."application_review_stage_status_enum" USING "review_stage_status"::"text"::"public"."application_review_stage_status_enum"`);
        await queryRunner.query(`ALTER TABLE "application" ALTER COLUMN "review_stage_status" SET DEFAULT 'DOCUMENT'`);
        await queryRunner.query(`DROP TYPE "public"."application_review_stage_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '4586901303'`);
        await queryRunner.query(`CREATE INDEX "IDX_d5736529a3f056ce58fc988279" ON "payment" ("payment_status") `);
        await queryRunner.query(`CREATE INDEX "IDX_c8fe15b063428d7ccc99a6e048" ON "recruitment" ("recruitment_status") `);
        await queryRunner.query(`CREATE INDEX "IDX_90ef32dd66631fecd1f240384e" ON "recruitment" ("priority_date") `);
        await queryRunner.query(`ALTER TABLE "payment_recruitment" ADD CONSTRAINT "FK_b5c0c7d15af1f4da0770ed9cd7b" FOREIGN KEY ("recruitment_id") REFERENCES "recruitment"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_announcement" ADD CONSTRAINT "FK_c52e5c29c0855ca4af607874b7d" FOREIGN KEY ("recruitment_id") REFERENCES "recruitment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_announcement_recipient" ADD CONSTRAINT "FK_63af13c45d1d1a8ad1d492470ef" FOREIGN KEY ("application_id") REFERENCES "application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_announcement_recipient" ADD CONSTRAINT "FK_afc512b500169b18146becdbec4" FOREIGN KEY ("announcement_id") REFERENCES "application_announcement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application_announcement_recipient" DROP CONSTRAINT "FK_afc512b500169b18146becdbec4"`);
        await queryRunner.query(`ALTER TABLE "application_announcement_recipient" DROP CONSTRAINT "FK_63af13c45d1d1a8ad1d492470ef"`);
        await queryRunner.query(`ALTER TABLE "application_announcement" DROP CONSTRAINT "FK_c52e5c29c0855ca4af607874b7d"`);
        await queryRunner.query(`ALTER TABLE "payment_recruitment" DROP CONSTRAINT "FK_b5c0c7d15af1f4da0770ed9cd7b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_90ef32dd66631fecd1f240384e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c8fe15b063428d7ccc99a6e048"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d5736529a3f056ce58fc988279"`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '3931489523'`);
        await queryRunner.query(`CREATE TYPE "public"."application_review_stage_status_enum_old" AS ENUM('DOCUMENT', 'INTERVIEW', 'ACCEPT', 'REJECT')`);
        await queryRunner.query(`ALTER TABLE "application" ALTER COLUMN "review_stage_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "application" ALTER COLUMN "review_stage_status" TYPE "public"."application_review_stage_status_enum_old" USING "review_stage_status"::"text"::"public"."application_review_stage_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "application" ALTER COLUMN "review_stage_status" SET DEFAULT 'DOCUMENT'`);
        await queryRunner.query(`DROP TYPE "public"."application_review_stage_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."application_review_stage_status_enum_old" RENAME TO "application_review_stage_status_enum"`);
        await queryRunner.query(`ALTER TABLE "application" DROP COLUMN "applicant_id"`);
        await queryRunner.query(`ALTER TABLE "application" ADD "applicant_id" "public"."application_applicant_id_enum" NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "employer_coupon" ALTER COLUMN "expires_at" TYPE TIMESTAMP(0) WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "employer_coupon" ALTER COLUMN "used_at" TYPE TIMESTAMP(0) WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "recruitment" DROP COLUMN "is_list_up"`);
        await queryRunner.query(`ALTER TABLE "recruitment" DROP COLUMN "list_up_count"`);
        await queryRunner.query(`ALTER TABLE "recruitment" DROP COLUMN "priority_date"`);
        await queryRunner.query(`ALTER TABLE "payment_recruitment_options" DROP COLUMN "posting_end_date"`);
        await queryRunner.query(`ALTER TABLE "payment_recruitment_options" DROP COLUMN "posting_start_date"`);
        await queryRunner.query(`ALTER TABLE "payment_recruitment_options" DROP COLUMN "bonus_days"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "payment_type"`);
        await queryRunner.query(`DROP TYPE "public"."payment_payment_type_enum"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "total_discount_amount"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "coupon_discount_amount"`);
        await queryRunner.query(`ALTER TABLE "employer_coupon" DROP COLUMN "issued_at"`);
        await queryRunner.query(`ALTER TABLE "employer_coupon" DROP COLUMN "is_expired"`);
        await queryRunner.query(`ALTER TABLE "employer_coupon" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD "expires_at" TIMESTAMP(0) WITH TIME ZONE`);
        await queryRunner.query(`DROP TABLE "application_announcement_recipient"`);
        await queryRunner.query(`DROP TABLE "application_announcement"`);
        await queryRunner.query(`DROP TYPE "public"."application_announcement_result_notification_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_announcement_announcement_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."application_applicant_id_enum" RENAME TO "application_final_decision_status_enum"`);
        await queryRunner.query(`ALTER TABLE "application" RENAME COLUMN "applicant_id" TO "final_decision_status"`);
        await queryRunner.query(`ALTER TABLE "payment_recruitment" RENAME COLUMN "recruitment_id" TO "recruit_id"`);
        await queryRunner.query(`ALTER TABLE "payment_recruitment" ADD CONSTRAINT "FK_2d629dbdbed075f082566becfc2" FOREIGN KEY ("recruit_id") REFERENCES "recruitment"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
