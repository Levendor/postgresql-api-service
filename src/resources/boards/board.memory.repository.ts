import { Board } from './';
import { database } from '../../database';
import { IRepository, TBoardBody } from '../../types';

export class BoardMemoryRepository implements IRepository<Board> {
  entities: Board[];

  constructor() {
    this.entities = database.boards;
  }

  getAll = async (): Promise<Board[]> => this.entities;

  getById = async (boardId: string): Promise<Board> => {
    const foundedBoard = this.entities.find((board) => board.id === boardId);
    if (!foundedBoard) throw Error('Not Found Error: no board matches this request');
    return foundedBoard;
  }

  create = async (boardBody: TBoardBody): Promise<Board> => {
    const newBoard = new Board(boardBody);
    this.entities.push(newBoard);
    return newBoard;
  }

  update = async (boardBody: TBoardBody): Promise<Board> => {
    const boardId = boardBody.id;
    const boardToUpdate = this.entities.find((board) => board.id === boardId);
    if (!boardToUpdate) throw Error('Not Found Error: no board matches this request');
    const updatedBoard = Object.assign(boardToUpdate, boardBody);
    return updatedBoard;
  }

  delete = async (boardId: string): Promise<Board> => {
    const deletedBoardIndex = this.entities.findIndex((board) => board.id === boardId);
    if (deletedBoardIndex === -1) throw Error('Not Found Error: no board matches this request');
    const deletedBoard = this.entities.splice(deletedBoardIndex, 1)[0]!;
    return deletedBoard;
  }
}