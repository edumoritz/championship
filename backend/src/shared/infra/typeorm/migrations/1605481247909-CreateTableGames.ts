import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableGames1605481247909
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'games',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'player1',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'player2',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'goals_player1',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'goals_player2',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'games',
      new TableForeignKey({
        name: 'Player1',
        columnNames: ['player1'],
        referencedColumnNames: ['id'],
        referencedTableName: 'players',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'games',
      new TableForeignKey({
        name: 'Player2',
        columnNames: ['player2'],
        referencedColumnNames: ['id'],
        referencedTableName: 'players',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('games', 'Player1');
    await queryRunner.dropForeignKey('games', 'Player2');
    await queryRunner.dropTable('games');
  }
}
