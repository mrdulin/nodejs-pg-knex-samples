import dotenv from 'dotenv';
import path from 'path';
import { ISettings } from './@types';

const result = dotenv.config({ path: path.resolve(__dirname, '../.env') });
if (result.error) {
  throw result.error;
}

const settings: ISettings = {
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      port: 5431,
      database: 'nodejs-pg-knex-samples',
      user: 'sampleadmin',
      password: 'samplepass'
    },
    debug: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: process.env.SQL_DATABASE,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
    },
    debug: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};

export default settings;
