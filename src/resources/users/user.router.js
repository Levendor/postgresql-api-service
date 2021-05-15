import { Router } from 'express';

export const createUserRouter = (userController) => {
  const userRouter = Router();
  userRouter.get('/', userController.getAllUsers);
  userRouter.get('/:id', userController.getUserById);
  userRouter.post('/', userController.createUser);
  userRouter.put('/:id', userController.updateUser);
  userRouter.delete('/:id', userController.deleteUser);

  return userRouter;
}
