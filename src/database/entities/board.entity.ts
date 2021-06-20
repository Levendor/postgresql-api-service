import { Entity, Column as TableColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IBoard, IColumn, ITask } from '../../types';
import { Column, Task } from './';

@Entity('users')
export class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @TableColumn()
  title!:string;

  @TableColumn()
  @OneToMany(() => Column, column => column.board)
  columns!: IColumn[] | null;
  
  @OneToMany(() => Task, task => task.boardId)
  tasks!: ITask[];
}