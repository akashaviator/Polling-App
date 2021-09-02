import {MigrationInterface, QueryRunner} from "typeorm";

export class first1630010156791 implements MigrationInterface {
    name = 'first1630010156791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "poll" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "closed_at" TIMESTAMP NOT NULL, "question" character varying(200) NOT NULL, "voters" jsonb, "userId" integer, CONSTRAINT "PK_03b5cf19a7f562b231c3458527e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "option" ("id" SERIAL NOT NULL, "votes" integer NOT NULL DEFAULT '0', "text" character varying(200) NOT NULL, "pollId" integer, CONSTRAINT "PK_e6090c1c6ad8962eea97abdbe63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "poll" ADD CONSTRAINT "FK_0610ebcfcfb4a18441a9bcdab2f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "option" ADD CONSTRAINT "FK_d710400e48b60236cd8be3e2502" FOREIGN KEY ("pollId") REFERENCES "poll"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "option" DROP CONSTRAINT "FK_d710400e48b60236cd8be3e2502"`);
        await queryRunner.query(`ALTER TABLE "poll" DROP CONSTRAINT "FK_0610ebcfcfb4a18441a9bcdab2f"`);
        await queryRunner.query(`DROP TABLE "option"`);
        await queryRunner.query(`DROP TABLE "poll"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
