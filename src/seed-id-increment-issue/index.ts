import { knex } from '../db-local';

async function createOrg(org) {
  return knex('orgs').insert(org, '*');
}

async function createORG(org) {
  return knex('ORG').insert(org, '*');
}

export { createOrg, createORG };
