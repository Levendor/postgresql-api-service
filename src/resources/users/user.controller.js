import { User } from './user.model';

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