import { Router } from 'express';
import { TaskController } from './task.controller';

export const createTaskRouter = (taskController: TaskController) => {
  const taskRouter = Router({ mergeParams: true });
  taskRouter.get('/', taskController.getAllTasks);
  taskRouter.get('/:taskId', taskController.getTaskById);
  taskRouter.post('/', taskController.createTask);
  taskRouter.put('/:taskId', taskController.updateTask);
  taskRouter.delete('/:taskId', taskController.deleteTask);

  return taskRouter;
}
