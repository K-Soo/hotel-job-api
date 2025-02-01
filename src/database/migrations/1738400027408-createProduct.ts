import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProduct1738400027408 implements MigrationInterface {
    name = 'CreateProduct1738400027408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."recruitment_product_duration_duration_enum" AS ENUM('3', '5', '7', '10', '14', '21')`);
        await queryRunner.query(`CREATE TABLE "recruitment_product_duration" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "duration" "public"."recruitment_product_duration_duration_enum" NOT NULL, "bonus_days" integer NOT NULL DEFAULT '0', "price" integer NOT NULL DEFAULT '0', "discount_rate" numeric(4,3) NOT NULL DEFAULT '0', "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "recruitment_product_id" uuid, CONSTRAINT "PK_e90d683b5c90f55988716561131" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."recruitment_product_name_enum" AS ENUM('PREMIUM', 'SPECIAL', 'URGENT', 'BASIC')`);
        await queryRunner.query(`CREATE TYPE "public"."recruitment_product_type_enum" AS ENUM('RECRUIT', 'MAIN')`);
        await queryRunner.query(`CREATE TABLE "recruitment_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."recruitment_product_name_enum" NOT NULL, "type" "public"."recruitment_product_type_enum" NOT NULL, "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_51a08d1e0f389a43ef85969aa72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."recruitment_product_option_duration_duration_enum" AS ENUM('3', '5', '7', '10', '14', '21')`);
        await queryRunner.query(`CREATE TABLE "recruitment_product_option_duration" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bonus_days" integer NOT NULL DEFAULT '0', "duration" "public"."recruitment_product_option_duration_duration_enum" NOT NULL, "discount_rate" numeric(4,3) NOT NULL DEFAULT '0', "price" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "option_id" uuid, CONSTRAINT "PK_eae433159e5429a411c2de1baf8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."recruitment_product_option_name_enum" AS ENUM('LIST_UP', 'HIGHLIGHT', 'TAG', 'BOLD')`);
        await queryRunner.query(`CREATE TYPE "public"."recruitment_product_option_tags_enum" AS ENUM('URGENT', 'POPULAR', 'RECOMMENDED', 'NEW')`);
        await queryRunner.query(`CREATE TABLE "recruitment_product_option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."recruitment_product_option_name_enum" NOT NULL, "max_list_up_per_day" integer NOT NULL DEFAULT '0', "list_up_interval_hours" integer NOT NULL DEFAULT '0', "tags" "public"."recruitment_product_option_tags_enum" array NOT NULL DEFAULT '{}', "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "recruitment_product_id" uuid, CONSTRAINT "PK_d61e707337a63b0c2c9febf711c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '4423914498'`);
        await queryRunner.query(`ALTER TABLE "recruitment_product_duration" ADD CONSTRAINT "FK_8501be163964ba9f57b9180309a" FOREIGN KEY ("recruitment_product_id") REFERENCES "recruitment_product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recruitment_product_option_duration" ADD CONSTRAINT "FK_71600b358bf21ca4fcede0fb0e1" FOREIGN KEY ("option_id") REFERENCES "recruitment_product_option"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recruitment_product_option" ADD CONSTRAINT "FK_a6bb04142cf6a5a618c7a45c468" FOREIGN KEY ("recruitment_product_id") REFERENCES "recruitment_product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recruitment_product_option" DROP CONSTRAINT "FK_a6bb04142cf6a5a618c7a45c468"`);
        await queryRunner.query(`ALTER TABLE "recruitment_product_option_duration" DROP CONSTRAINT "FK_71600b358bf21ca4fcede0fb0e1"`);
        await queryRunner.query(`ALTER TABLE "recruitment_product_duration" DROP CONSTRAINT "FK_8501be163964ba9f57b9180309a"`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '1503879724'`);
        await queryRunner.query(`DROP TABLE "recruitment_product_option"`);
        await queryRunner.query(`DROP TYPE "public"."recruitment_product_option_tags_enum"`);
        await queryRunner.query(`DROP TYPE "public"."recruitment_product_option_name_enum"`);
        await queryRunner.query(`DROP TABLE "recruitment_product_option_duration"`);
        await queryRunner.query(`DROP TYPE "public"."recruitment_product_option_duration_duration_enum"`);
        await queryRunner.query(`DROP TABLE "recruitment_product"`);
        await queryRunner.query(`DROP TYPE "public"."recruitment_product_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."recruitment_product_name_enum"`);
        await queryRunner.query(`DROP TABLE "recruitment_product_duration"`);
        await queryRunner.query(`DROP TYPE "public"."recruitment_product_duration_duration_enum"`);
    }

}
