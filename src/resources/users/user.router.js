const { Router } = require('express');

module.exports.createUserRouter = (userController) => {
  const userRouter = Router();
  userRouter.get('/', userController.getAllUsers);

  return userRouter;
}
