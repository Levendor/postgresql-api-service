import { getRepository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Board, Column, Task, User } from '../entities';

export class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await getRepository(User).query(`DELETE FROM "users"`);
    await getRepository(Board).query(`DELETE FROM "boards"`);
    await getRepository(Task).query(`DELETE FROM "tasks"`);
    await getRepository(Column).query(`DELETE FROM "columns"`);
    await factory(User)().create();
  }
}
