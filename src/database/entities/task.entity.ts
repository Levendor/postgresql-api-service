import { Entity, Column as TableColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ITask } from '../../types';
import { Board, Column, User } from './';

@Entity('users')
export class Task implements ITask {
  [key: string]: string | number | null;

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @TableColumn()
  title!:string;

  @TableColumn()
  order!: number;

  @TableColumn()
  description!: string

  @TableColumn()
  @ManyToOne(() => User)
  userId!: string | null;

  @TableColumn()
  @ManyToOne(() => Board)
  boardId!: string | null;

  @TableColumn()
  @ManyToOne(() => Column)
  columnId!: string | null;
}