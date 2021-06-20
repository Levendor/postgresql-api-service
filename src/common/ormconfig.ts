import { DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from './config';

export default {
  name: 'default',
  type: 'postgres',
  host: 'postgres',
  port: DB_PORT,
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
