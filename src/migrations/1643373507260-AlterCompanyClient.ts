import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCompanyClient1643373507260 implements MigrationInterface {
  name = 'AlterCompanyClient1643373507260';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."company_client" ALTER COLUMN "tax_id_number" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."company_client" ALTER COLUMN "company_number" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."company_client" ALTER COLUMN "company_number" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."company_client" ALTER COLUMN "tax_id_number" SET NOT NULL`,
    );
  }
}
