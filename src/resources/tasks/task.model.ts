import { v4 as uuid } from 'uuid';
import { ITask, TTaskBody } from '../../types';

export class Task implements ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;

  constructor(taskBody: TTaskBody = {}) {
    this.id = taskBody.id || uuid();
    this.title = taskBody.title || 'TASK';
    this.order = taskBody.order || 0;
    this.description = taskBody.description || 'Lorem ipsum';
    this.userId = taskBody.userId || null;
    this.boardId = taskBody.boardId || null;
    this.columnId = taskBody.columnId || null;
  }
}