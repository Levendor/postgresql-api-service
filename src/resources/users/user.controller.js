import { User } from './user.model.js';

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getAllUsers = async (req, res) => {
    const users = await this.userService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  }
}