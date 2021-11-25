import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Action {
  @PrimaryGeneratedColumn('uuid')
  step: string;

  @Column()
  name: string;

  @Column()
  data: string[];
}
