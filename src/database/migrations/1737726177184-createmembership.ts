import { MigrationInterface, QueryRunner } from "typeorm";

export class Createmembership1737726177184 implements MigrationInterface {
    name = 'Createmembership1737726177184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_type_enum" AS ENUM('RESUME_JUMP_UP', 'RECRUITMENT', 'RESUME_VIEW')`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" "public"."product_type_enum" NOT NULL, "discount_rate" numeric(4,3) NOT NULL, "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."membership_membership_level_enum" AS ENUM('FAMILY', 'BRONZE', 'SILVER', 'GOLD', 'VIP')`);
        await queryRunner.query(`CREATE TABLE "membership" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "membership_level" "public"."membership_membership_level_enum" NOT NULL DEFAULT 'FAMILY', "discount_rate" numeric(4,3) NOT NULL, "min_score" bigint NOT NULL DEFAULT '0', "max_score" bigint NOT NULL, "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_23a1b3297db2682c67a5180f09f" UNIQUE ("membership_level"), CONSTRAINT "PK_83c1afebef3059472e7c37e8de8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "score" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "membership_id" uuid`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '1503879724'`);
        await queryRunner.query(`ALTER TABLE "employer" ADD CONSTRAINT "FK_3b487783f1eba58a52ffb9a5b9d" FOREIGN KEY ("membership_id") REFERENCES "membership"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" DROP CONSTRAINT "FK_3b487783f1eba58a52ffb9a5b9d"`);
        await queryRunner.query(`ALTER TABLE "applicant" ALTER COLUMN "nickname" SET DEFAULT '3628169644'`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "membership_id"`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "score"`);
        await queryRunner.query(`DROP TABLE "membership"`);
        await queryRunner.query(`DROP TYPE "public"."membership_membership_level_enum"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_type_enum"`);
    }

}
