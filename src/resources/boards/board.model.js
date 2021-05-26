import { v4 as uuid } from 'uuid';

  /**
   * Board Entity
   * @class
   * @param {Object} boardBody - An object with Board fields
   * @param {string} boardBody.id
   * @param {string} boardBody.title
   * @param {Column[] | null} boardBody.columns
   * 
   * @property {string} id - UUID string
   * @property {string} title - Name of board
   * @property {Array<Column> | null} columns - Array of board columns
   */
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