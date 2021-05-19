import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterProductQuantityColumn1621285981615
  implements MigrationInterface
{
  name = 'AlterProductQuantityColumn1621285981615';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "quantity" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "quantity" DROP DEFAULT`,
    );
  }
}
