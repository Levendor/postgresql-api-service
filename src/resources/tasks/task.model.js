import { v4 as uuid } from 'uuid';

export class Task {
  /**
   * Task Entity
   * @constructor
   * @param {Object} taskBody - An object with Task fields
   * @param {string} taskBody.id
   * @param {string} taskBody.title
   * @param {number} taskBody.order
   * @param {string} taskBody.description
   * @param {string | null} taskBody.userId
   * @param {string | null} taskBody.boardId
   * @param {string | null} taskBody.columnId
   * 
   * @property {string} id - UUID string
   * @property {string} title - Name of board
   * @property {number} taskBody.order - Order of task in column
   * @property {string} taskBody.description - Task description
   * @property {string | null} taskBody.userId - Id of assigned user
   * @property {string | null} taskBody.boardId - Id of board
   * @property {string | null} taskBody.columnId - Id of column
   */
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