import Knex from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5431,
    database: 'nodejs-pg-knex-samples',
    user: 'sampleadmin',
    password: 'samplepass'
  },
  debug: true
};
const knex = Knex(config);

export { knex };
