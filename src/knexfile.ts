import { ISettings } from './@types';

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
  }
};

export default settings;
