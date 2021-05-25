import { Board } from './board.model.js';
import { database } from '../../database/index.js';

export class BoardMemoryRepository {
  constructor() {
    this.boards = database.boards;
  }

  getAllBoards = async () => this.boards;

  getBoardById = async (boardId) => {
    const foundedBoard = this.boards.find((board) => board.id === boardId);
    if (!foundedBoard) throw Error('Not Found Error: no board matches this request');
    return foundedBoard;
  }

  createBoard = async (boardBody) => {
    const newBoard = new Board(boardBody);
    this.boards.push(newBoard);
    return newBoard;
  }

  updateBoard = async (boardBody) => {
    const boardId = boardBody.id;
    const updatedBoardIndex = this.boards.findIndex((board) => board.id === boardId);
    if (updatedBoardIndex === -1) throw Error('Not Found Error: no board matches this request');
    const updatedBoard = { ...this.boards[updatedBoardIndex], ...boardBody };
    this.boards[updatedBoardIndex] = updatedBoard;
    return updatedBoard;
  }

  deleteBoard = async (boardId) => {
    const deletedBoardIndex = this.boards.findIndex((board) => board.id === boardId);
    if (deletedBoardIndex === -1) throw Error('Not Found Error: no board matches this request');
    const deletedBoard = { ...this.boards[deletedBoardIndex] };
    this.boards.splice(deletedBoardIndex, 1);
    return deletedBoard;
  }
}