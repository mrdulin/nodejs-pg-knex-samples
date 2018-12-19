import { knex } from '../db-local';

async function createOrg(org) {
  return knex('orgs').insert(org, '*');
}

export { createOrg };
