import { v4 as uuid } from 'uuid';
import { IBoard, IColumn, TBoardBody } from '../../types';

export class Board implements IBoard {
  id: string;
  title: string;
  columns: IColumn[] | null;

  constructor(boardBody: TBoardBody = {}) {
    this.id = boardBody.id || uuid();
    this.title = boardBody.title || 'BOARD';
    this.columns = boardBody.columns || null;
  }
}