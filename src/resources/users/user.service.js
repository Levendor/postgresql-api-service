module.exports.UserService = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getAll = () => this.userRepository.getAll();
}
