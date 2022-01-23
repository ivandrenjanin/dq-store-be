import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterOrderFile1642944576831 implements MigrationInterface {
  name = 'AlterOrderFile1642944576831';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."order" ADD "filePath" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."order" ADD "fileName" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."order" DROP COLUMN "fileName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."order" DROP COLUMN "filePath"`,
    );
  }
}
