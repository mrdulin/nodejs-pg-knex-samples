import { knex } from '../db-local';

async function insert(user: any) {
  return await knex('users')
    .insert(user)
    .returning('*')
    .get(0);
}

export { insert };
