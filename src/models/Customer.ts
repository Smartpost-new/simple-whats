import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import Contact from './Contact';
import Schedule from './Schedule';

@Entity('customers')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  debt: boolean;

  @OneToMany(() => Contact, contact => contact.customer, { eager: true })
  contacts: Contact[];

  @ManyToMany(() => Schedule, schedule => schedule.customers)
  schedules: Schedule[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
