import { Entity, Column as TableColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IBoard, IColumn } from '../../types';
// import { Column } from './';

@Entity('users')
export class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @TableColumn()
  title!:string;

  @TableColumn()
  columns!: IColumn[] | null;
}