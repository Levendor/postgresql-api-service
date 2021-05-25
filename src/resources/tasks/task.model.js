import { v4 as uuid } from 'uuid';

export class Task {
  constructor({
    id = uuid(),
    title = 'TASK',
    order = 0,
    description = 'Lorem ipsum',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}