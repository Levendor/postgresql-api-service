import { Router } from 'express';
import { BoardController } from './board.controller';

export const createBoardRouter = (boardController: BoardController) => {
  const boardRouter = Router();
  boardRouter.get('/', boardController.getAllBoards);
  boardRouter.get('/:boardId', boardController.getBoardById);
  boardRouter.post('/', boardController.createBoard);
  boardRouter.put('/:boardId', boardController.updateBoard);
  boardRouter.delete('/:boardId', boardController.deleteBoard);

  return boardRouter;
}
