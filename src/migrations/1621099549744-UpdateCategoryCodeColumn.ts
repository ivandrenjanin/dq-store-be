import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCategoryCodeColumn1621099549744
  implements MigrationInterface
{
  name = 'UpdateCategoryCodeColumn1621099549744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" ALTER COLUMN "code" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" ALTER COLUMN "code" DROP NOT NULL`,
    );
  }
}
