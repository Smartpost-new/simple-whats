import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveFieldSentInSchedule1594518424730
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('schedules', 'sent');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'schedules',
      new TableColumn({
        name: 'sent',
        type: 'varchar',
      }),
    );
  }
}
