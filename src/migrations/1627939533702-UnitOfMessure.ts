import { MigrationInterface, QueryRunner } from 'typeorm';

export class UnitOfMessure1627939533702 implements MigrationInterface {
  name = 'UnitOfMessure1627939533702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."unit_of_messure" AS ENUM('metre', 'centimetre', 'kilogram', 'gram', 'litre', 'each')`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "unit_of_messure" "public"."unit_of_messure" NOT NULL DEFAULT 'each'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "unit_of_messure"`,
    );
    await queryRunner.query(`DROP TYPE "public"."unit_of_messure"`);
  }
}
