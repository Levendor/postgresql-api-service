import { ConnectionOptions } from 'typeorm';
import { DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from './config';

export const PORT: number = Number(DB_PORT) || 5432;

export const connectionOptions: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: 'postgres',
  port: PORT,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  synchronize: false,
  logging: false,
  entities: [
     'src/database/entities/*.ts'
  ],
  migrations: [
     'src/database/migrations/*.ts'
  ],
  cli: {
     entitiesDir: 'src/database/entities',
     migrationsDir: 'src/database/migrations'
  }
}
