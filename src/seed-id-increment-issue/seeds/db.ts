import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async function(knex: Knex): Promise<any> {
  await knex('orgs').del();
  await knex('orgs').insert([
    { org_id: 1, org_name: faker.lorem.word() },
    { org_id: 2, org_name: faker.lorem.word() },
    { org_id: 3, org_name: faker.lorem.word() }
  ]);

  // https://github.com/tgriesser/knex/issues/2130
  await knex.raw(`select setval(\'orgs_org_id_seq\', (select max(org_id) from "orgs"));`);
};
