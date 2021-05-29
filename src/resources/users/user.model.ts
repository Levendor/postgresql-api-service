import { v4 as uuid } from 'uuid';
import { TUserBody, TUserToResponse } from '../../types';

export class User {
  id: string;
  name: string;
  login: string;
  password: string;

  constructor(userBody: TUserBody = {}) {
    this.id = userBody.id || uuid();
    this.name = userBody.name || 'USER';
    this.login = userBody.login || 'user';
    this.password = userBody.password || 'P@55w0rd';
  }

  static toResponse(user: TUserToResponse) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
