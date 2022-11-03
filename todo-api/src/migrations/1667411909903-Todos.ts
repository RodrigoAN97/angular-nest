import { MigrationInterface, QueryRunner } from 'typeorm';

export class Todos1667411909903 implements MigrationInterface {
  name = 'Todos1667411909903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "todos" ("id" SERIAL NOT NULL, "todos" text array NOT NULL, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todos"`);
  }
}
