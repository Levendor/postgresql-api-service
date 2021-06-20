import { Entity, Column as TableColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IColumn } from '../../types';

@Entity('users')
export class Column implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @TableColumn()
  title!:string;

  @TableColumn()
  order!: number;
}