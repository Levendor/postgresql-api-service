import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import { getRepository, Repository } from 'typeorm';
import { User } from '../../database/entities';
import { JWT_SECRET_KEY } from '../../common/config';

export class LoginService {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  login = async (login: string, password: string): Promise<string | null> => {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) return null;
    const validUser = compareSync(password, user.password);
    if (!validUser) return null;

    const secretKey = JWT_SECRET_KEY || 'secret-key';

    const userCredentials = {
      id: user.id,
      login: user.login,
    };

    const accessToken = sign(userCredentials, secretKey);

    return accessToken;
  };
}
