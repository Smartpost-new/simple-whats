import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Customer from './Customer';

@Entity('schedules')
class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column()
  type: 'daily' | 'weekly';

  @ManyToMany(() => Customer, customer => customer.schedules, { eager: true })
  @JoinTable({
    name: 'schedules_customers',
    joinColumn: {
      name: 'schedule_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'customer_id',
      referencedColumnName: 'id',
    },
  })
  customers: Customer[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Schedule;
