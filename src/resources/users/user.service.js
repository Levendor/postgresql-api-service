export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getAll = () => this.userRepository.getAll();
}
