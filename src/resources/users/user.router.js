import { Router } from 'express';

export const createUserRouter = (userController) => {
  const userRouter = Router();
  userRouter.get('/', userController.getAllUsers);
  userRouter.get('/:userId', userController.getUserById);
  userRouter.post('/', userController.createUser);
  userRouter.put('/:userId', userController.updateUser);
  userRouter.delete('/:userId', userController.deleteUser);

  return userRouter;
}
