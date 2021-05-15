import { v4 as uuid } from 'uuid';

export class Column {
  constructor({
    id = uuid(),
    title = 'COLUMN',
    order  = 0,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}