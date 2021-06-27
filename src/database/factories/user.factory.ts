import { v4 as uuid } from 'uuid';
import { define } from 'typeorm-seeding';
import { User } from '../entities';
import { hashSync } from 'bcryptjs';

define(User, () => {
  const id = uuid();
  const name = 'admin';
  const login = 'admin';
  const password = hashSync('admin', 10);

  const user = new User();
  user.id = id;
  user.name = name;
  user.login = login;
  user.password = password;
  return user;
});
