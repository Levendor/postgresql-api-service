import { Entity, Column as TableColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IBoard } from '../../types';
import { Column } from './';

@Entity('boards')
export class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @TableColumn()
  title!:string;

  @TableColumn({ type: 'json', array: false, nullable: true })
  // @OneToMany(() => Column, column => column.board)
  columns!: Column[];
  
  // @OneToMany(() => Task, task => task.boardId)
  // tasks!: Task[];
}