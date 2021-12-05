import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCompanyLogo1638723123594 implements MigrationInterface {
  name = 'AlterCompanyLogo1638723123594';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."company" ADD "logo" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."company" DROP COLUMN "logo"`,
    );
  }
}
