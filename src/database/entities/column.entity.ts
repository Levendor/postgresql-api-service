import { Entity, Column as TableColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IColumn } from '../../types';
// import { Board } from '../../database/entities';
// import { Task } from './task.entity';

@Entity('columns')
export class Column implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @TableColumn()
  title!:string;

  @TableColumn()
  order!: number;

  // @ManyToOne(() => Board, board => board.columns)
  // board!: Board;

  // @OneToMany(() => Task, task => task.columnId)
  // task!: Task;
}