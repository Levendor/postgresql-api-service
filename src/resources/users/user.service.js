export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getAllUsers = () => this.userRepository.getAll();
}
