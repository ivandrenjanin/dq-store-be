import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTables1628004517949 implements MigrationInterface {
  name = 'InitTables1628004517949';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company" ("id" SERIAL NOT NULL, "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "postal_code" character varying, "street" character varying, "city" character varying, "tax_id_number" character varying NOT NULL, "company_number" character varying NOT NULL, "activity_code" character varying, "bank_name" character varying, "bank_account_number" character varying, "phone_fax_number" character varying, "phone_mobile_number" character varying, "email" character varying, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_7661a9e2aa27c887ef13766d936" UNIQUE ("public_id"), CONSTRAINT "UQ_7104b7bef0fccffec7e2f1ad92e" UNIQUE ("tax_id_number"), CONSTRAINT "UQ_f6baa4a951c83d5bf88d2571acb" UNIQUE ("company_number"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "inventory" ("id" SERIAL NOT NULL, "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "company_id" integer, CONSTRAINT "UQ_df737ede038afc55726d46ffb2f" UNIQUE ("public_id"), CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "code" character varying NOT NULL, "inventory_id" integer, CONSTRAINT "UQ_392f7184be7347bc9dbd54f7d09" UNIQUE ("public_id"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company_client" ("id" SERIAL NOT NULL, "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "postal_code" character varying, "street" character varying, "city" character varying, "tax_id_number" character varying NOT NULL, "company_number" character varying NOT NULL, "bank_name" character varying, "bank_account_number" character varying, "phone_fax_number" character varying, "phone_mobile_number" character varying, "email" character varying, "company_id" integer, CONSTRAINT "UQ_89a533cfe42a68f48afa498b93e" UNIQUE ("public_id"), CONSTRAINT "UQ_c99dbc47631933de8868ab285b0" UNIQUE ("tax_id_number"), CONSTRAINT "UQ_c04b8b49d35169dec8c8dc01edd" UNIQUE ("company_number"), CONSTRAINT "PK_662b374a9e31f6470b58c668aea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_efae689c7e0f1cebbca719dbac9" UNIQUE ("public_id"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company_user" ("id" SERIAL NOT NULL, "company_id" integer, "user_id" integer, CONSTRAINT "PK_879141ebc259b4c0544b3f1ea4c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "total" integer NOT NULL DEFAULT '0', "inventory_id" integer, CONSTRAINT "UQ_994ce213632c71a3ce99154f6a6" UNIQUE ("public_id"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "unit_of_messure" AS ENUM('metre', 'centimetre', 'kilogram', 'gram', 'litre', 'each')`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "code" character varying NOT NULL, "selling_price" integer NOT NULL, "prime_price" integer NOT NULL, "taxed_price" integer NOT NULL, "tax_rate" integer NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "unit_of_messure" "unit_of_messure" NOT NULL DEFAULT 'each', "inventory_id" integer, CONSTRAINT "UQ_0b389232bdb2c2b7b7236bb5bcc" UNIQUE ("public_id"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_category" ("id" SERIAL NOT NULL, "product_id" integer, "category_id" integer, CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_details" ("id" SERIAL NOT NULL, "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "prime_price" integer NOT NULL, "quantity" integer NOT NULL, "product_id" integer, CONSTRAINT "UQ_4db9b92939af47aca45cc2a2982" UNIQUE ("public_id"), CONSTRAINT "PK_a3fa8e2e94f3c37a8d731451de4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_order" ("id" SERIAL NOT NULL, "total" integer NOT NULL, "quantity" integer NOT NULL, "product_id" integer, "order_id" integer, CONSTRAINT "PK_9849f0d8ce095e50e752616f691" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("id" SERIAL NOT NULL, "role_id" integer, "user_id" integer, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD CONSTRAINT "FK_d278a3574e4834a09b4f67bcf8e" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_83ddc09811e31ed1c7873c1948d" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_client" ADD CONSTRAINT "FK_704080025e0435cea99e3d9a2b4" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_user" ADD CONSTRAINT "FK_10335130936e37b70e2e35f2f74" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_user" ADD CONSTRAINT "FK_7368a8438ae617a2f8318f3a202" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_cbe8d5eeaf9e09cabef296a7282" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_84e9362e0a5bf063e561d9452ba" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ADD CONSTRAINT "FK_0374879a971928bc3f57eed0a59" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ADD CONSTRAINT "FK_2df1f83329c00e6eadde0493e16" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_details" ADD CONSTRAINT "FK_abbb591b1989c63fb0c240dfffb" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_order" ADD CONSTRAINT "FK_2a8da6a067cb59557b708fd4a29" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_order" ADD CONSTRAINT "FK_44a63452d4f45e3e54a3028e9e5" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `INSERT INTO "public"."role"("id","name","description")
                VALUES
                (DEFAULT,'SUPER_ADMIN','SUPER_ADMIN'),
                (DEFAULT,'ADMIN','ADMIN'),
                (DEFAULT,'COMPANY_ADMIN','COMPANY_ADMIN'),
                (DEFAULT,'COMPANY_MEMBER','COMPANY_MEMBER');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_order" DROP CONSTRAINT "FK_44a63452d4f45e3e54a3028e9e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_order" DROP CONSTRAINT "FK_2a8da6a067cb59557b708fd4a29"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_details" DROP CONSTRAINT "FK_abbb591b1989c63fb0c240dfffb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" DROP CONSTRAINT "FK_2df1f83329c00e6eadde0493e16"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" DROP CONSTRAINT "FK_0374879a971928bc3f57eed0a59"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_84e9362e0a5bf063e561d9452ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_cbe8d5eeaf9e09cabef296a7282"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_user" DROP CONSTRAINT "FK_7368a8438ae617a2f8318f3a202"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_user" DROP CONSTRAINT "FK_10335130936e37b70e2e35f2f74"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_client" DROP CONSTRAINT "FK_704080025e0435cea99e3d9a2b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_83ddc09811e31ed1c7873c1948d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory" DROP CONSTRAINT "FK_d278a3574e4834a09b4f67bcf8e"`,
    );
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "product_order"`);
    await queryRunner.query(`DROP TABLE "product_details"`);
    await queryRunner.query(`DROP TABLE "product_category"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TYPE "unit_of_messure"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "company_user"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "company_client"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "inventory"`);
    await queryRunner.query(`DROP TABLE "company"`);
  }
}
