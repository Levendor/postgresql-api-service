import { v4 as uuid } from 'uuid';

export class Board {
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}