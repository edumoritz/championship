import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddColumnChampionshipId1606076492653
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'players',
      new TableColumn({
        name: 'championship_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'players',
      new TableForeignKey({
        name: 'PlayersChampionship',
        columnNames: ['championship_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'championship',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('players', 'PlayersChampionship');

    await queryRunner.dropColumn('players', 'champonship_id');
  }
}
