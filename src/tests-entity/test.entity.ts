import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Action } from '../action/action.entity';

@Entity()
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  className: string;

  @Column()
  description: string;

  @Column()
  actions: Action[];
}
