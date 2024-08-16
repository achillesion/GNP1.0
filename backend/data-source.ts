import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mssql',
  host: process.env.MSSQL_HOST,
  port: +process.env.MSSQL_PORT,
  username: process.env.MSSQL_USERNAME,
  password: process.env.MSSQL_PASSWORD,
  database: process.env.MSSQL_DATABASE,
  synchronize: false,
  dropSchema: true,
  logging: true,
  logger: 'file',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  migrationsTableName: 'migration_table',
});
