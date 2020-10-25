import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableScores1603240009662
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'scores',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'player_id',
            type: 'uuid',
          },
          {
            name: 'points',
            type: 'int',
          },
          {
            name: 'games',
            type: 'int',
          },
          {
            name: 'wins',
            type: 'int',
          },
          {
            name: 'loss',
            type: 'int',
          },
          {
            name: 'ties',
            type: 'int',
          },
          {
            name: 'goal_pro',
            type: 'int',
          },
          {
            name: 'goal_against',
            type: 'int',
          },
          {
            name: 'goal_difference',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'scores',
      new TableForeignKey({
        name: 'PlayerScore',
        columnNames: ['player_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'players',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('scores', 'PlayerScore');
    await queryRunner.dropTable('scores');
  }
}
