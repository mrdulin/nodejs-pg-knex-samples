import dotenv from 'dotenv';
import path from 'path';
import { ISettings } from './@types';

const dotenvOutput = dotenv.config({ path: path.resolve(__dirname, '../.env') });
if (dotenvOutput.error) {
  throw dotenvOutput.error;
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
    debug: false,
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
    client: 'postgresql',
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
