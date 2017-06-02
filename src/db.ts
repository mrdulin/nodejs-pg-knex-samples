import Knex from 'knex';
import { credentials } from './credentials';

function createConnection() {
  const config: Knex.Config = {
    client: 'pg',
    connection: {
      host: credentials.SQL_HOST,
      port: credentials.SQL_PORT,
      database: credentials.SQL_DATABASE,
      user: credentials.SQL_USER,
      password: credentials.SQL_PASSWORD,
      ssl: credentials.SQL_SSL || false
    },
    pool: {
      min: 1,
      max: 1
    },
    debug: true
  };
  return Knex(config);
}

const knex = createConnection();

export { createConnection, Knex, knex };
