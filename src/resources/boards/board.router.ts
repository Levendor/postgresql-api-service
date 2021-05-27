import { Router } from 'express';

export const createBoardRouter = (boardController) => {
  const boardRouter = Router();
  boardRouter.get('/', boardController.getAllBoards);
  boardRouter.get('/:boardId', boardController.getBoardById);
  boardRouter.post('/', boardController.createBoard);
  boardRouter.put('/:boardId', boardController.updateBoard);
  boardRouter.delete('/:boardId', boardController.deleteBoard);

  return boardRouter;
}
