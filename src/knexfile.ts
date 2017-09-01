import { ISettings } from './@types';
import { credentials } from './credentials';

const settings: ISettings = {
  development: {
    client: 'postgresql',
    connection: {
      host: credentials.SQL_HOST,
      port: credentials.SQL_PORT,
      database: credentials.SQL_DATABASE,
      user: credentials.SQL_USER,
      password: credentials.SQL_PASSWORD,
      ssl: true
    },
    debug: true,
    pool: {
      min: 2,
      max: 20
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
  }
};

export default settings;
