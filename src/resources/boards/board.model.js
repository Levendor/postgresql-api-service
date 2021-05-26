import { v4 as uuid } from 'uuid';

export class Board {
  /**
   * Board Entity
   * @constructor
   * @param {Object} boardBody - An object with Board fields
   * @param {string} boardBody.id
   * @param {string} boardBody.title
   * @param {Column[] | null} boardBody.columns
   * 
   * @property {string} id - UUID string
   * @property {string} title - Name of board
   * @property {Array<Column> | null} columns - Array of board columns
   */
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