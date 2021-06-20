import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ITask } from '../../types';

@Entity('users')
export class Task implements ITask {
  [key: string]: string | number | null;

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!:string;

  @Column()
  order!: number;

  @Column()
  description!: string

  @Column()
  userId!: string | null;

  @Column()
  boardId!: string | null;

  @Column()
  columnId!: string | null;
}