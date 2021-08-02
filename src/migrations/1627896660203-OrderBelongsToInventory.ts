import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderBelongsToInventory1627896660203
  implements MigrationInterface
{
  name = 'OrderBelongsToInventory1627896660203';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."order" ADD "inventory_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."order" ADD CONSTRAINT "FK_cbe8d5eeaf9e09cabef296a7282" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."order" DROP CONSTRAINT "FK_cbe8d5eeaf9e09cabef296a7282"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."order" DROP COLUMN "inventory_id"`,
    );
  }
}
