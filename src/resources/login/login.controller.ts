import { Request, Response, NextFunction } from "express";
import newError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { LoginService } from "./login.service";

const { OK, FORBIDDEN } = StatusCodes;

export class LoginController {
  loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { login, password } = req.body;
      const token = await this.loginService.login(login, password);
      if (!token) {
        throw newError(FORBIDDEN, 'Invalid user login or password');
      }
      res.status(OK).json({ token });
    } catch (error) {
      next(error);
    }
  }
}