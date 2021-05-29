import { IRepository, TBoardBody } from "../../types";
import { TaskMemoryRepository } from "../tasks/task.memory.repository";
import { Board } from "./board.model";

export class BoardService {
  taskRepository: TaskMemoryRepository;
  boardRepository: IRepository<Board>;
  
  constructor(boardRepository: IRepository<Board>, taskRepository: TaskMemoryRepository) {
    this.taskRepository = taskRepository;
    this.boardRepository = boardRepository;
  }

  getAllBoards = async (): Promise<Board[]> => {
    const boards = await this.boardRepository.getAll();
    return boards;
  };

  getBoardById = async (boardId: string): Promise<Board> => {
    const board = await this.boardRepository.getById(boardId);
    return board;
  }

  createBoard = async (boardBody: TBoardBody): Promise<Board> => {
    const newBoard = await this.boardRepository.create(boardBody);
    return newBoard;
  }

  updateBoard = async (boardBody: TBoardBody): Promise<Board> => {
    const updatedBoard = await this.boardRepository.update(boardBody);
    return updatedBoard;
  }

  deleteBoard = async (boardId: string): Promise<Board> => {
    const deletedBoard = await this.boardRepository.delete(boardId);
    const boardTasks = await this.taskRepository.getAll('boardId', boardId);
    if (boardTasks.length) {
      boardTasks.forEach(async (task) => {
        await this.taskRepository.delete(task.id, boardId);
      });
    }
    return deletedBoard;
  }
}