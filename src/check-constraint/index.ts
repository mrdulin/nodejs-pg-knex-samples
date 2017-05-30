import { knex } from '../db-local';

async function createUser(data) {
  return knex('users')
    .insert(data)
    .returning('*');
}

export { createUser };
