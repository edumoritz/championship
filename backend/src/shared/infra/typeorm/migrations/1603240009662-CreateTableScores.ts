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
            default: 0,
          },
          {
            name: 'games',
            type: 'int',
            default: 0,
          },
          {
            name: 'wins',
            type: 'int',
            default: 0,
          },
          {
            name: 'loss',
            type: 'int',
            default: 0,
          },
          {
            name: 'ties',
            type: 'int',
            default: 0,
          },
          {
            name: 'goal_pro',
            type: 'int',
            default: 0,
          },
          {
            name: 'goal_against',
            type: 'int',
            default: 0,
          },
          {
            name: 'goal_difference',
            type: 'int',
            default: 0,
          },
          {
            name: 'utilization',
            type: 'decimal(12,2)',
            isNullable: true,
          },
          {
            name: 'closed_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'scores',
      new TableForeignKey({
        name: 'fk_player_scores',
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
