import Knex from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    database: 'dvdrental',
    user: 'ldu020',
    password: ''
  }
};
const knex = Knex(config);

async function sqlExecutor(sql: string) {
  return knex
    .raw(sql)
    .then(resp => resp)
    .catch(err => console.error(err));
}

export { knex, sqlExecutor };
