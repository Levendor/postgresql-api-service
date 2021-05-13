const { User } = require('./user.model');

module.exports.UserController = class {
  constructor(userService) {
    this.userService = userService;
  }

  getAllUsers = async (req, res) => {
    const users = await this.userService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  }
}