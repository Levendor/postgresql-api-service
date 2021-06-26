import { DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, POSTGRES_HOST } from './src/common/config';

export const PORT: number = Number(DB_PORT) || 5432;

export default {
  name: 'default',
  type: 'postgres',
  host: POSTGRES_HOST || 'localhost',
  port: PORT,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  synchronize: false,
  migrationsRun: true,
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
