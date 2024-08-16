import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1723812504286 implements MigrationInterface {
    name = 'SchemaUpdate1723812504286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat_messages" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_40c55ee0e571e268b0d3cd37d10" DEFAULT NEWSEQUENTIALID(), "message" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_a6f359922fb93e42d1b2daf38df" DEFAULT getdate(), "senderId" uniqueidentifier NOT NULL, "receiverId" uniqueidentifier NOT NULL, CONSTRAINT "PK_40c55ee0e571e268b0d3cd37d10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_profiles" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_bc44885d9b45637c84bd1896ba3" DEFAULT NEWSEQUENTIALID(), "lastMessage" nvarchar(255), "lastMessageDate" datetime, "user1Id" uniqueidentifier, "user2Id" uniqueidentifier, CONSTRAINT "PK_bc44885d9b45637c84bd1896ba3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_fc6b58e41e9a871dacbe9077def" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_9a197c82c9ea44d75bc145a6e2c" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_profiles" ADD CONSTRAINT "FK_e44018c3d26dcb756f0319fee21" FOREIGN KEY ("user1Id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_profiles" ADD CONSTRAINT "FK_05645b60740b86cb828e1fbdb3c" FOREIGN KEY ("user2Id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_profiles" DROP CONSTRAINT "FK_05645b60740b86cb828e1fbdb3c"`);
        await queryRunner.query(`ALTER TABLE "chat_profiles" DROP CONSTRAINT "FK_e44018c3d26dcb756f0319fee21"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_9a197c82c9ea44d75bc145a6e2c"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_fc6b58e41e9a871dacbe9077def"`);
        await queryRunner.query(`DROP TABLE "chat_profiles"`);
        await queryRunner.query(`DROP TABLE "chat_messages"`);
    }

}
