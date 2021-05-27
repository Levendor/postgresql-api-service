import { v4 as uuid } from 'uuid';
import { TBoardBody } from '../../types';
import { Column } from '../columns';

export class Board {
  id: string;
  title: string;
  columns: Column[] | null;

  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = null
  }: TBoardBody) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}