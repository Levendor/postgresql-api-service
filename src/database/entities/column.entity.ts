import { Entity, Column as TableColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Board } from '../../database/entities';
import { IColumn } from '../../types';
import { Task } from './task.entity';

@Entity('users')
export class Column implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @TableColumn()
  title!:string;

  @TableColumn()
  order!: number;

  @ManyToOne(() => Board, board => board.columns)
  board!: Board;

  @OneToMany(() => Task, task => task.columnId)
  task!: Task;
}