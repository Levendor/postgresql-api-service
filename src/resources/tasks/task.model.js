import { v4 as uuid } from 'uuid';

  /**
   * Task Entity
   * @class
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
   * @property {number} order - Order of task in column
   * @property {string} description - Task description
   * @property {string | null} userId - Id of assigned user
   * @property {string | null} boardId - Id of board
   * @property {string | null} columnId - Id of column
   */
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