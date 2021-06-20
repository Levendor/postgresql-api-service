import { IDatabase } from "../types";

export const inMemoryDatabase: IDatabase = {
  users: [
    {
      id: '123',
      name: 'username',
      login: 'user',
      password: 'password',
    },
  ],
  boards: [
  ],
  tasks: [
  ],
}