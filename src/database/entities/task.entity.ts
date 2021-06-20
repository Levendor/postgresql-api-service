import { Entity, Column as TableColumn, PrimaryGeneratedColumn } from 'typeorm';
// import { ITask } from '../../types';
// import { Board, Column, User } from './';

@Entity('tasks')
export class Task {
  [key: string]: string | number | null;

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @TableColumn()
  title!:string;

  @TableColumn()
  order!: number;

  @TableColumn()
  description!: string

  @TableColumn({ nullable: true})
  // @ManyToOne(() => User)
  userId!: string;

  @TableColumn({ nullable: true})
  // @ManyToOne(() => Board)
  boardId!: string;

  @TableColumn({ nullable: true})
  // @ManyToOne(() => Column)
  columnId!: string;
}