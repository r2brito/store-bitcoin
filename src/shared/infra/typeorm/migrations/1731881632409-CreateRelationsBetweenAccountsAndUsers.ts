import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateRelationsBetweenAccountsAndUsers1731881632409 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'accounts',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('accounts');
    // @ts-ignore
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('accounts', foreignKey);
    }
  }

}
