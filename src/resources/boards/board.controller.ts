export class BoardController {
  constructor(boardService) {
    this.boardService = boardService;
  }

  getAllBoards = async (req, res, next) => {
    try {
      const boards = await this.boardService.getAllBoards();
      res.json(boards);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  getBoardById = async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const foundedBoard = await this.boardService.getBoardById(boardId);
      res.json(foundedBoard);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  createBoard = async (req, res, next) => {
    try {
      const boardBody = req.body;
      const createdBoard = await this.boardService.createBoard(boardBody);
      res.status(201).json(createdBoard);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  updateBoard = async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const boardBody = { boardId, ...req.body };
      const updatedBoard = await this.boardService.updateBoard(boardBody);
      res.json(updatedBoard);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  deleteBoard = async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const deletedBoard = await this.boardService.deleteBoard(boardId);
      res.status(204).json(deletedBoard);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }
}