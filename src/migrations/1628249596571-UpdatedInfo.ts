import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedInfo1628249596571 implements MigrationInterface {
  name = 'UpdatedInfo1628249596571';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."order" ADD "totalTaxed" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."order" ADD "orderNumber" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."order" ADD "company_client_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product_order" ADD "totalTaxed" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."company_client" DROP CONSTRAINT "UQ_c99dbc47631933de8868ab285b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."company_client" DROP CONSTRAINT "UQ_c04b8b49d35169dec8c8dc01edd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."order" ADD CONSTRAINT "FK_b53cfe969b93f1c02aea8189c6c" FOREIGN KEY ("company_client_id") REFERENCES "company_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."order" DROP CONSTRAINT "FK_b53cfe969b93f1c02aea8189c6c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."company_client" ADD CONSTRAINT "UQ_c04b8b49d35169dec8c8dc01edd" UNIQUE ("company_number")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."company_client" ADD CONSTRAINT "UQ_c99dbc47631933de8868ab285b0" UNIQUE ("tax_id_number")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product_order" DROP COLUMN "totalTaxed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."order" DROP COLUMN "company_client_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."order" DROP COLUMN "orderNumber"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."order" DROP COLUMN "totalTaxed"`,
    );
  }
}
