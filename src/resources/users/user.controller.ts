import { Request, Response, NextFunction } from "express";
import newError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { UserService } from "./user.service";

const { OK, CREATED, NO_CONTENT, BAD_REQUEST } = StatusCodes;

export class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(OK).json(users);
    } catch (error) {
      next(error);
    }
  }

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      if (!userId) throw newError(BAD_REQUEST, 'No boardId is provided');
      const foundedUser = await this.userService.getUserById(userId);
      res.status(OK).json(foundedUser);
    } catch (error) {
      next(error);
    }
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userBody = req.body;
      const createdUser = await this.userService.createUser(userBody);
      res.status(CREATED).json(createdUser);
    } catch (error) {
      next(error);
    }
  }

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      if (!userId) throw newError(BAD_REQUEST, 'No boardId is provided');
      const userBody = { userId, ...req.body };
      const updatedUser = await this.userService.updateUser(userBody);
      res.status(OK).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      if (!userId) throw newError(BAD_REQUEST, 'No boardId is provided');
      const deletedUser = await this.userService.deleteUser(userId);
      res.status(NO_CONTENT).json(deletedUser);
    } catch (error) {
      next(error);
    }
  }
}