import { createConnection, Knex } from '../../db';

function main() {
  const knex = createConnection();
  getAllContacts(knex).then(console.log);
}

function getAllContacts(knex: Knex) {
  return knex('contacts').select();
}

main();
