import { Board } from './board.model.js';
import { database } from '../../database/index.js';

/**
* A class to represent an in-memory repository of Board entity
* @class
* @property {Board[]} boards - An array of boards
*/
export class BoardMemoryRepository {
  constructor() {
    this.boards = database.boards;
  }

  /**
   * Get lists of all boards
   * @async
   * @method
   * @returns {Promise<Board[]>} List of all boards
   */
  getAllBoards = async () => this.boards;

  /**
   * Get single board by its id
   * @async
   * @method
   * @param {string} boardId - Id of requested board
   * @returns {Promise<Board>} Requested board instance
   */
  getBoardById = async (boardId) => {
    const foundedBoard = this.boards.find((board) => board.id === boardId);
    if (!foundedBoard) throw Error('Not Found Error: no board matches this request');
    return foundedBoard;
  }

  /**
   * Create a new Board in database
   * @async
   * @method
   * @param {Object.<Board>} boardBody - Object with Board fields
   * @returns {Promise<Board>} New instance of Board
   */
  createBoard = async (boardBody) => {
    const newBoard = new Board(boardBody);
    this.boards.push(newBoard);
    return newBoard;
  }

  /**
   * Update an existed board in database by its id
   * @async
   * @method 
   * @param {Object.<Board>} boardBody - Object with some Board fields
   * @returns {Promise<Board>}
   */
  updateBoard = async (boardBody) => {
    const boardId = boardBody.id;
    const updatedBoardIndex = this.boards.findIndex((board) => board.id === boardId);
    if (updatedBoardIndex === -1) throw Error('Not Found Error: no board matches this request');
    const updatedBoard = { ...this.boards[updatedBoardIndex], ...boardBody };
    this.boards[updatedBoardIndex] = updatedBoard;
    return updatedBoard;
  }

  /**
   * Delete an existed board in database by its id
   * @async
   * @method
   * @param {string} boardId - Id of board to delete
   * @returns {Promise<Board>}
   */
  deleteBoard = async (boardId) => {
    const deletedBoardIndex = this.boards.findIndex((board) => board.id === boardId);
    if (deletedBoardIndex === -1) throw Error('Not Found Error: no board matches this request');
    const deletedBoard = { ...this.boards[deletedBoardIndex] };
    this.boards.splice(deletedBoardIndex, 1);
    return deletedBoard;
  }
}