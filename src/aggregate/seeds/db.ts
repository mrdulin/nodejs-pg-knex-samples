import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async function(knex: Knex): Promise<any> {
  return knex('results')
    .del()
    .then(function() {
      const url = faker.internet.url();
      return knex('results').insert([
        {
          result_id: 1,
          result_reach: faker.random.number(),
          result_impressions: faker.random.number(),
          result_clicks: faker.random.number(),
          result_durations: faker.random.number(),
          result_spend: faker.random.number(),
          result_conversion: faker.random.number(),
          result_url: url
        },
        {
          result_id: 2,
          result_reach: faker.random.number(),
          result_impressions: faker.random.number(),
          result_clicks: faker.random.number(),
          result_durations: faker.random.number(),
          result_spend: faker.random.number(),
          result_conversion: faker.random.number(),
          result_url: url
        }
      ]);
    });
};
