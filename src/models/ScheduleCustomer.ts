import {
  Entity,
  Column,
  ManyToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Schedule from './Schedule';
import Customer from './Customer';

@Entity('schedules_customers')
class ScheduleCustomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  schedule_id: string;

  @Column('uuid')
  customer_id: string;

  @ManyToMany(() => Schedule, schedule => schedule.customers, { primary: true })
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;

  @ManyToMany(() => Customer, customer => customer.schedules, { primary: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}

export default ScheduleCustomer;
