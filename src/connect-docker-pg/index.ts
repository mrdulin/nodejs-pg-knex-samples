import Knex from 'knex';

// https://github.com/docker-library/postgres/issues/41
async function main() {
  const config: Knex.Config = {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      database: 'nodejs-pg-knex-samples',
      user: 'sampleadmin',
      password: 'samplepass'
    },
    debug: true
  };
  const knex: Knex = Knex(config);

  knex.schema
    .createTable('users', (table: Knex.TableBuilder) => {
      table.increments();
      table.string('name');
      table.timestamps();
    })
    .then(result => {
      console.log('create user table success. result:', result);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      knex.destroy();
    });
}

main();
