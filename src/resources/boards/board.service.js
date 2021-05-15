export class BoardService {
  constructor(boardRepository) {
    this.boardRepository = boardRepository;
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
    // const boards = await this.boardRepository.getAllBoards();
    // // const isDuplicatedTitle = boards.some((board) => board.title === boardBody.title)
    // // if (isDuplicatedTitle) throw Error('Bad Request Error: title is occupied');
    const newBoard = await this.boardRepository.createBoard(boardBody);
    return newBoard;
  }

  updateBoard = async (boardBody) => {
    const boards = await this.boardRepository.getAllBoards();
    const isDuplicatedTitle = boards.some((board) => board.title === boardBody.title && board.id !== boardBody.id);
    if (isDuplicatedTitle) throw Error('Bad Request Error: title is occupied');
    const updatedBoard = await this.boardRepository.updateBoard(boardBody);
    return updatedBoard;
  }

  deleteBoard = async (boardId) => {
    const deletedBoard = await this.boardRepository.deleteBoard(boardId);
    // TODO: delete all tasks of deleted board
    return deletedBoard;
  }
}