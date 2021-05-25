export class BoardService {
  constructor(boardRepository, taskRepository) {
    this.boardRepository = boardRepository;
    this.taskRepository = taskRepository;
  }

  getAllBoards = async () => {
    const boards = this.boardRepository.getAllBoards();
    return boards;
  };

  getBoardById = async (boardId) => {
    const board = await this.boardRepository.getBoardById(boardId);
    return board;
  }

  createBoard = async (boardBody) => {
    const newBoard = await this.boardRepository.createBoard(boardBody);
    return newBoard;
  }

  updateBoard = async (boardBody) => {
    const updatedBoard = await this.boardRepository.updateBoard(boardBody);
    return updatedBoard;
  }

  deleteBoard = async (boardId) => {
    const deletedBoard = await this.boardRepository.deleteBoard(boardId);
    const boardTasks = await this.taskRepository.getAllBoardTasks(boardId);
    if (boardTasks.length) {
      boardTasks.forEach(async (task) => {
        await this.taskRepository.deleteTask(boardId, task.id);
      });
    }
    return deletedBoard;
  }
}