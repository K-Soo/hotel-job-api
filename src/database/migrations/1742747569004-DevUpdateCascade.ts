import { MigrationInterface, QueryRunner } from "typeorm";

export class DevUpdateCascade1742747569004 implements MigrationInterface {
    name = 'DevUpdateCascade1742747569004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer_coupon" DROP CONSTRAINT "FK_49f538e2bb0fb7f1778d1e1fc25"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_d4283086c79d7ea732e9f138abd"`);
        await queryRunner.query(`ALTER TABLE "payment_recruitment" DROP CONSTRAINT "FK_b5c0c7d15af1f4da0770ed9cd7b"`);
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "FK_f9dde63d2e371d5bb29a5281fcd"`);
        await queryRunner.query(`ALTER TABLE "point_transaction" DROP CONSTRAINT "FK_98f935ff104955d2ee525d1e725"`);
        await queryRunner.query(`ALTER TABLE "employer" DROP CONSTRAINT "FK_3b487783f1eba58a52ffb9a5b9d"`);
        await queryRunner.query(`ALTER TABLE "account_history" DROP CONSTRAINT "FK_961e266e81510443fad71ac7247"`);
        await queryRunner.query(`ALTER TABLE "account_history" DROP CONSTRAINT "FK_a23b19a227b14d6b648b393a02a"`);
        await queryRunner.query(`ALTER TABLE "account_history" DROP COLUMN "changed_at"`);
        await queryRunner.query(`ALTER TABLE "account_history" DROP COLUMN "applicant_id"`);
        await queryRunner.query(`ALTER TABLE "account_history" DROP COLUMN "employer_id"`);
        await queryRunner.query(`ALTER TABLE "account_history" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "account_history" ADD "di" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."account_history_user_role_enum" AS ENUM('ADMIN', 'EMPLOYER', 'JOB_SEEKER')`);
        await queryRunner.query(`ALTER TABLE "account_history" ADD "user_role" "public"."account_history_user_role_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account_history" ADD "registered_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account_history" ADD "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employer_coupon" ADD CONSTRAINT "FK_49f538e2bb0fb7f1778d1e1fc25" FOREIGN KEY ("coupon_id") REFERENCES "coupon"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_d4283086c79d7ea732e9f138abd" FOREIGN KEY ("employer_coupon_id") REFERENCES "employer_coupon"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_recruitment" ADD CONSTRAINT "FK_b5c0c7d15af1f4da0770ed9cd7b" FOREIGN KEY ("recruitment_id") REFERENCES "recruitment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "FK_f9dde63d2e371d5bb29a5281fcd" FOREIGN KEY ("recruitment_id") REFERENCES "recruitment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "point_transaction" ADD CONSTRAINT "FK_98f935ff104955d2ee525d1e725" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employer" ADD CONSTRAINT "FK_3b487783f1eba58a52ffb9a5b9d" FOREIGN KEY ("membership_id") REFERENCES "membership"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" DROP CONSTRAINT "FK_3b487783f1eba58a52ffb9a5b9d"`);
        await queryRunner.query(`ALTER TABLE "point_transaction" DROP CONSTRAINT "FK_98f935ff104955d2ee525d1e725"`);
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "FK_f9dde63d2e371d5bb29a5281fcd"`);
        await queryRunner.query(`ALTER TABLE "payment_recruitment" DROP CONSTRAINT "FK_b5c0c7d15af1f4da0770ed9cd7b"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_d4283086c79d7ea732e9f138abd"`);
        await queryRunner.query(`ALTER TABLE "employer_coupon" DROP CONSTRAINT "FK_49f538e2bb0fb7f1778d1e1fc25"`);
        await queryRunner.query(`ALTER TABLE "account_history" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "account_history" DROP COLUMN "registered_at"`);
        await queryRunner.query(`ALTER TABLE "account_history" DROP COLUMN "user_role"`);
        await queryRunner.query(`DROP TYPE "public"."account_history_user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "account_history" DROP COLUMN "di"`);
        await queryRunner.query(`ALTER TABLE "account_history" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "account_history" ADD "employer_id" uuid`);
        await queryRunner.query(`ALTER TABLE "account_history" ADD "applicant_id" uuid`);
        await queryRunner.query(`ALTER TABLE "account_history" ADD "changed_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "account_history" ADD CONSTRAINT "FK_a23b19a227b14d6b648b393a02a" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account_history" ADD CONSTRAINT "FK_961e266e81510443fad71ac7247" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employer" ADD CONSTRAINT "FK_3b487783f1eba58a52ffb9a5b9d" FOREIGN KEY ("membership_id") REFERENCES "membership"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "point_transaction" ADD CONSTRAINT "FK_98f935ff104955d2ee525d1e725" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "FK_f9dde63d2e371d5bb29a5281fcd" FOREIGN KEY ("recruitment_id") REFERENCES "recruitment"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_recruitment" ADD CONSTRAINT "FK_b5c0c7d15af1f4da0770ed9cd7b" FOREIGN KEY ("recruitment_id") REFERENCES "recruitment"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_d4283086c79d7ea732e9f138abd" FOREIGN KEY ("employer_coupon_id") REFERENCES "employer_coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employer_coupon" ADD CONSTRAINT "FK_49f538e2bb0fb7f1778d1e1fc25" FOREIGN KEY ("coupon_id") REFERENCES "coupon"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
