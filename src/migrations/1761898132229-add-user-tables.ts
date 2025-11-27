import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserTables1761898132229 implements MigrationInterface {
    name = 'AddUserTables1761898132229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_name" character varying NOT NULL, "email" character varying, "hashed_password" character varying NOT NULL, "is_locked" boolean NOT NULL DEFAULT false, "is_first_login" boolean NOT NULL DEFAULT true, "login_failed_times" integer NOT NULL DEFAULT '0', "role" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "wallet_address" character varying, "address" character varying, "phone" character varying, "dob" TIMESTAMP, "gender" integer, "avatar" character varying, CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
