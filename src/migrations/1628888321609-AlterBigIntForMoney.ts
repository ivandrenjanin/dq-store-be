import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterBigIntForMoney1628888321609 implements MigrationInterface {
  name = 'AlterBigIntForMoney1628888321609';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."order" DROP COLUMN "total"`);
    await queryRunner.query(
      `ALTER TABLE "public"."order" ADD "total" bigint NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."order" DROP COLUMN "totalTaxed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."order" ADD "totalTaxed" bigint NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "selling_price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "selling_price" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "prime_price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "prime_price" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "taxed_price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "taxed_price" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product_order" DROP COLUMN "total"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product_order" ADD "total" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product_order" DROP COLUMN "totalTaxed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product_order" ADD "totalTaxed" bigint NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."product_order" DROP COLUMN "totalTaxed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product_order" ADD "totalTaxed" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product_order" DROP COLUMN "total"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product_order" ADD "total" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "taxed_price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "taxed_price" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "prime_price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "prime_price" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "selling_price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "selling_price" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."order" DROP COLUMN "totalTaxed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."order" ADD "totalTaxed" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE "public"."order" DROP COLUMN "total"`);
    await queryRunner.query(
      `ALTER TABLE "public"."order" ADD "total" integer NOT NULL DEFAULT '0'`,
    );
  }
}
