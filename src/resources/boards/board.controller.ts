import { Request, Response, NextFunction } from "express";
import { BoardService } from "./board.service";

export class BoardController {
  boardService: BoardService;

  constructor(boardService: BoardService) {
    this.boardService = boardService;
  }

  getAllBoards = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const boards = await this.boardService.getAllBoards();
      res.json(boards);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  getBoardById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req.params;
      if (!boardId) return next(new Error('Bad Request Error: no boardId is provided'));
      const foundedBoard = await this.boardService.getBoardById(boardId);
      res.json(foundedBoard);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  createBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const boardBody = req.body;
      const createdBoard = await this.boardService.createBoard(boardBody);
      res.status(201).json(createdBoard);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  updateBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req.params;
      if (!boardId) return next(new Error('Bad Request Error: no boardId is provided'));
      const boardBody = { boardId, ...req.body };
      const updatedBoard = await this.boardService.updateBoard(boardBody);
      res.json(updatedBoard);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req.params;
      if (!boardId) return next(new Error('Bad Request Error: no boardId is provided'));
      const deletedBoard = await this.boardService.deleteBoard(boardId);
      res.status(204).json(deletedBoard);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }
}