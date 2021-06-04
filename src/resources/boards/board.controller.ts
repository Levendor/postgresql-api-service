import { Request, Response, NextFunction } from "express";
import newError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { BoardService } from "./board.service";

const { OK, CREATED, NO_CONTENT, BAD_REQUEST } = StatusCodes;

export class BoardController {
  boardService: BoardService;

  constructor(boardService: BoardService) {
    this.boardService = boardService;
  }

  getAllBoards = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const boards = await this.boardService.getAllBoards();
      res.status(OK).json(boards);
    } catch (error) {
      next(error);
    }
  }

  getBoardById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req.params;
      if (!boardId) throw newError(BAD_REQUEST, 'No boardId is provided');
      const foundedBoard = await this.boardService.getBoardById(boardId);
      res.status(OK).json(foundedBoard);
    } catch (error) {
      next(error);
    }
  }

  createBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const boardBody = req.body;
      const createdBoard = await this.boardService.createBoard(boardBody);
      res.status(CREATED).json(createdBoard);
    } catch (error) {
      next(error);
    }
  }

  updateBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req.params;
      if (!boardId) throw newError(BAD_REQUEST, 'No boardId is provided');
      const boardBody = { boardId, ...req.body };
      const updatedBoard = await this.boardService.updateBoard(boardBody);
      res.status(OK).json(updatedBoard);
    } catch (error) {
      next(error);
    }
  }

  deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req.params;
      console.log(boardId);
      if (!boardId) throw newError(BAD_REQUEST, 'No boardId is provided');
      const deletedBoard = await this.boardService.deleteBoard(boardId);
      res.status(NO_CONTENT).json(deletedBoard);
    } catch (error) {
      next(error);
    }
  }
}