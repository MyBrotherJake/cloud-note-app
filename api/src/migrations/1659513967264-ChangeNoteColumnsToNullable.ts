import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeNoteColumnsToNullable1659513967264 implements MigrationInterface {
    name = 'ChangeNoteColumnsToNullable1659513967264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_b6251c885d0798284f754c55d2b"`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "content" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "folderId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "archivedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "destroyedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_b6251c885d0798284f754c55d2b" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_b6251c885d0798284f754c55d2b"`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "destroyedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "archivedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "folderId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "content" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_b6251c885d0798284f754c55d2b" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
