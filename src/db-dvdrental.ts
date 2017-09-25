import Knex from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5430,
    database: 'dvdrental',
    user: 'postgres',
    password: 'dvdrentalpass'
  },
  debug: true
};
const knex = Knex(config);

async function sqlExecutor(sql: string) {
  return knex
    .raw(sql)
    .then(resp => resp)
    .catch(err => console.error(err));
}

export { knex, sqlExecutor };
