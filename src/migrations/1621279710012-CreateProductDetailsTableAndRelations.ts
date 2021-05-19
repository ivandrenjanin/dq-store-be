import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductDetailsTableAndRelations1621279710012
  implements MigrationInterface
{
  name = 'CreateProductDetailsTableAndRelations1621279710012';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_details" ("id" SERIAL NOT NULL, "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "primePrice" integer NOT NULL, "quantity" integer NOT NULL, "product_id" integer, CONSTRAINT "UQ_4db9b92939af47aca45cc2a2982" UNIQUE ("public_id"), CONSTRAINT "PK_a3fa8e2e94f3c37a8d731451de4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_details" ADD CONSTRAINT "FK_abbb591b1989c63fb0c240dfffb" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_details" DROP CONSTRAINT "FK_abbb591b1989c63fb0c240dfffb"`,
    );
    await queryRunner.query(`DROP TABLE "product_details"`);
  }
}
