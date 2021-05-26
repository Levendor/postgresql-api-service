/**
 * A class to represent a service to operate with Board repository
 * @class
 * @property {BoardRepository} boardRepository - an instance of Board Repository
 * @property {TaskRepository} taskRepository - an instance of Task Repository
 */
export class BoardService {
  constructor(boardRepository, taskRepository) {
    this.boardRepository = boardRepository;
    this.taskRepository = taskRepository;
  }

  /**
   * Get list of all boards
   * @async
   * @method
   * @returns {Promise<Board[]>} List of all boards
   */
  getAllBoards = async () => {
    const boards = this.boardRepository.getAllBoards();
    return boards;
  };

  /**
   * Get single board by its id
   * @async
   * @method
   * @param {string} boardId - Id of requested board
   * @returns {Promise<Board>} Requested board instance
   */
  getBoardById = async (boardId) => {
    const board = await this.boardRepository.getBoardById(boardId);
    return board;
  }

  /**
   * Create a new Board in database
   * @async
   * @method
   * @param {Object.<Board>} boardBody - Object with Board fields
   * @returns {Promise<Board>} New instance of Board
   */
  createBoard = async (boardBody) => {
    const newBoard = await this.boardRepository.createBoard(boardBody);
    return newBoard;
  }

  /**
   * Update an existed board in database by its id
   * @async
   * @method 
   * @param {Object.<Board>} boardBody - Object with some Board fields
   * @returns {Promise<Board>}
   */
  updateBoard = async (boardBody) => {
    const updatedBoard = await this.boardRepository.updateBoard(boardBody);
    return updatedBoard;
  }

  /**
   * Delete an existed board in database by its id and all its tasks
   * @async
   * @method
   * @param {string} boardId - Id of board to delete
   * @returns {Promise<Board>}
   */
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