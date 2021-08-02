import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderTotalDefault1627897567321 implements MigrationInterface {
  name = 'OrderTotalDefault1627897567321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."order" ALTER COLUMN "total" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."order" ALTER COLUMN "total" DROP DEFAULT`,
    );
  }
}
