import { SchemaBuilder, RawBuilder } from 'knex';
import { knex } from '../db-local';

// https://stackoverflow.com/questions/53717824/whats-the-difference-between-knex-raw-and-knex-schema-raw

async function demo1() {
  const schemabuilder: SchemaBuilder = await knex.schema
    .raw(`SELECT * FROM users WHERE user_id = 1`)
    .raw(`SELECT * FROM users WHERE user_id = 2`);

  // console.log(schemabuilder.toString());

  // const rows = schemabuilder.map((response: any) => {
  //   return response.rows;
  // });
  // console.log('rows:', rows);
}

async function demo2() {
  // const rows = await knex.schema.raw('?', [knex('users').where({ user_id: 1 })]);
}

async function demo3() {
  try {
    const userWhereQueryBuilder = knex('users').where({ user_id: 1 });
    const rows = await knex.raw('?', [userWhereQueryBuilder]).get('rows');
    console.log(rows);
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  // demo1();
  await demo3();
  await knex.destroy();
}

main();
