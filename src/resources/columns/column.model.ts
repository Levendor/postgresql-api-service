import { v4 as uuid } from 'uuid';
import { IColumn, TColumnBody } from '../../types';

export class Column implements IColumn {
  id: string;
  title: string;
  order: number;

  constructor(columnBody: TColumnBody) {
    this.id = columnBody.id || uuid();
    this.title = columnBody.title || 'COLUMN';
    this.order = columnBody.order || 0;
  }
}