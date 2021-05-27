import { Board } from './';
import { database } from '../../database';
import { TBoardBody } from '../../types';

export class BoardMemoryRepository {
  boards: Board[];

  constructor() {
    this.boards = database.boards;
  }

  getAllBoards = async (): Promise<Board[]> => this.boards;

  getBoardById = async (boardId: string): Promise<Board> => {
    const foundedBoard = this.boards.find((board) => board.id === boardId);
    if (!foundedBoard) throw Error('Not Found Error: no board matches this request');
    return foundedBoard;
  }

  createBoard = async (boardBody: TBoardBody): Promise<Board> => {
    const newBoard = new Board(boardBody);
    this.boards.push(newBoard);
    return newBoard;
  }

  updateBoard = async (boardBody: TBoardBody): Promise<Board> => {
    const boardId = boardBody.id;
    const updatedBoardIndex = this.boards.findIndex((board) => board.id === boardId);
    if (updatedBoardIndex === -1) throw Error('Not Found Error: no board matches this request');
    const updatedBoard = { ...this.boards[updatedBoardIndex], ...boardBody };
    this.boards[updatedBoardIndex] = updatedBoard;
    return updatedBoard;
  }

  deleteBoard = async (boardId: string): Promise<Board> => {
    const deletedBoardIndex = this.boards.findIndex((board) => board.id === boardId);
    const deletedBoard = this.boards[deletedBoardIndex];
    if (!deletedBoard) throw Error('Not Found Error: no board matches this request');
    this.boards.splice(deletedBoardIndex, 1);
    return deletedBoard;
  }
}