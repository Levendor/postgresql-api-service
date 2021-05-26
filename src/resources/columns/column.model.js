import { v4 as uuid } from 'uuid';

export class Column {
  /**
   * Column Entity
   * @constructor
   * @param {Object} columnBody - An object with Column fields
   * @param {string} columnBody.id
   * @param {string} columnBody.title
   * @param {number} columnBody.order
   * 
   * @property {string} id - UUID string
   * @property {string} title - Name of column
   * @property {number} order - Order of column in board
   */
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