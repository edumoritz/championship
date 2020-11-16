import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnUtilization1605485265701 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'scores',
        new TableColumn({
          name: 'utilization',
          type: 'decimal(12,2)',
          isNullable: true,
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('scores', 'utilization');
    }

}
