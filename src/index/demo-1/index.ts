import { createConnection, Knex } from '../../db';

async function main() {
  const knex: Knex = createConnection();
  await getAllContacts(knex).then(console.log);
  await knex.destroy();
}

function getAllContacts(knex: Knex) {
  return knex('contacts').select();
}

main();
