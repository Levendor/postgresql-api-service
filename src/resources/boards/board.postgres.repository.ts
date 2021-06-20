import newError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { getRepository, Repository } from 'typeorm';
import { Board } from '../../database/entities';
import { TBoardDTO } from '../../types';

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

export class BoardPostgresRepository {
  repository: Repository<Board>;
  constructor() {
    this.repository = getRepository(Board);
  }

  getAll = async (): Promise<Board[]> => {
    return this.repository.find();
  }

  getById = async (boardId: string): Promise<Board> => {
    const foundedBoard = await this.repository.findOne(boardId);
    if (!foundedBoard) throw newError(NOT_FOUND, 'No board matches this request');
    return foundedBoard;
  }

  create = async (boardBody: TBoardDTO): Promise<Board> => {
    const newBoard: Board = this.repository.create({
      ...boardBody,
    });
    await this.repository.insert(newBoard);
    return newBoard;
  }

  update = async (boardBody: TBoardDTO): Promise<Board> => {
    const boardToUpdate = await this.repository.findOne(boardBody.id);
    if (!boardToUpdate) throw newError(NOT_FOUND, 'No board matches this request');
    await this.repository.save(boardBody);
    const updatedBoard = await this.repository.findOne(boardBody.id);
    if (!updatedBoard) throw newError(INTERNAL_SERVER_ERROR, 'Database malfunction');
    return updatedBoard;
  }

  delete = async (boardId: string): Promise<Board> => {
    const boardToDelete = await this.repository.findOne(boardId);
    if (!boardToDelete) throw newError(NOT_FOUND, 'No board matches this request');
    return this.repository.remove(boardToDelete);
  }
}
