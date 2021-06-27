import { Router } from 'express';
import { LoginController } from './login.controller';

export const createLoginRouter = (loginController: LoginController) => {
  const loginRouter = Router();
  loginRouter.post('/', loginController.login);

  return loginRouter;
}