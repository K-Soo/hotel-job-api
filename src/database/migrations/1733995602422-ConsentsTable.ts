import { MigrationInterface, QueryRunner } from "typeorm";

export class ConsentsTable1733995602422 implements MigrationInterface {
    name = 'ConsentsTable1733995602422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."applicant_provider_enum" AS ENUM('LOCAL', 'KAKAO')`);
        await queryRunner.query(`CREATE TYPE "public"."applicant_role_enum" AS ENUM('ADMIN', 'EMPLOYER', 'JOB_SEEKER')`);
        await queryRunner.query(`CREATE TABLE "applicant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" bigint NOT NULL, "provider" "public"."applicant_provider_enum" NOT NULL, "role" "public"."applicant_role_enum" NOT NULL DEFAULT 'JOB_SEEKER', "createdAt" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_546a819aa07c196d7aa0f9d17db" UNIQUE ("userId"), CONSTRAINT "PK_f4a6e907b8b17f293eb073fc5ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consent" ("id" SERIAL NOT NULL, "personalInfoAgree" boolean NOT NULL DEFAULT false, "serviceTermsAgree" boolean NOT NULL DEFAULT false, "marketingAgree" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now(), "applicant_id" uuid, CONSTRAINT "REL_c7bb556e83eddfd004f57b3322" UNIQUE ("applicant_id"), CONSTRAINT "PK_9115e8d6b082d4fc46d56134d29" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "createdAt" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "updatedAt" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employer" DROP CONSTRAINT "PK_74029e6b1f17a4c7c66d43cfd34"`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "employer" ADD CONSTRAINT "PK_74029e6b1f17a4c7c66d43cfd34" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "provider"`);
        await queryRunner.query(`CREATE TYPE "public"."employer_provider_enum" AS ENUM('LOCAL', 'KAKAO')`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "provider" "public"."employer_provider_enum" NOT NULL DEFAULT 'LOCAL'`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."employer_role_enum" AS ENUM('ADMIN', 'EMPLOYER', 'JOB_SEEKER')`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "role" "public"."employer_role_enum" NOT NULL DEFAULT 'EMPLOYER'`);
        await queryRunner.query(`ALTER TABLE "consent" ADD CONSTRAINT "FK_c7bb556e83eddfd004f57b33229" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consent" DROP CONSTRAINT "FK_c7bb556e83eddfd004f57b33229"`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."employer_role_enum"`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "role" character varying NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "provider"`);
        await queryRunner.query(`DROP TYPE "public"."employer_provider_enum"`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "provider" character varying NOT NULL DEFAULT 'local'`);
        await queryRunner.query(`ALTER TABLE "employer" DROP CONSTRAINT "PK_74029e6b1f17a4c7c66d43cfd34"`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employer" ADD CONSTRAINT "PK_74029e6b1f17a4c7c66d43cfd34" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP TABLE "consent"`);
        await queryRunner.query(`DROP TABLE "applicant"`);
        await queryRunner.query(`DROP TYPE "public"."applicant_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."applicant_provider_enum"`);
    }

}
