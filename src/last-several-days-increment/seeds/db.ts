import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async function(knex: Knex): Promise<any> {
  await knex('ORG')
    .del()
    .then(() => {
      return knex('ORG').insert([
        { org_id: 1, org_nme: faker.name.findName() },
        { org_id: 2, org_nme: faker.name.findName() }
      ]);
    });
  await knex('RESULT')
    .del()
    .then(function() {
      return knex('RESULT').insert([
        { result_id: 1, result_clicks: 100, org_id: 1 },
        { result_id: 2, result_clicks: 50, org_id: 2 },
        { result_id: 3, result_clicks: 10, org_id: 1 }
      ]);
    });
};
