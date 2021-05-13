import { Router } from 'express';

export const createUserRouter = (userController) => {
  const userRouter = Router();
  userRouter.get('/', userController.getAllUsers);

  return userRouter;
}
