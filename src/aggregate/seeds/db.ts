import * as Knex from 'knex';
import faker from 'faker';

import { Status } from '../types';

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
          result_url: url,
          result_status: Status.COMPLETED,
          start_dte: new Date('2018-08-01'),
          end_dte: new Date('2018-08-05')
        },
        {
          result_id: 2,
          result_reach: faker.random.number(),
          result_impressions: faker.random.number(),
          result_clicks: faker.random.number(),
          result_durations: faker.random.number(),
          result_spend: faker.random.number(),
          result_conversion: faker.random.number(),
          result_url: url,
          result_status: Status.ACTIVE,
          start_dte: new Date('2018-08-03'),
          end_dte: new Date('2018-08-07')
        },
        {
          result_id: 3,
          result_reach: faker.random.number(),
          result_impressions: faker.random.number(),
          result_clicks: faker.random.number(),
          result_durations: faker.random.number(),
          result_spend: faker.random.number(),
          result_conversion: faker.random.number(),
          result_url: url,
          result_status: Status.ACTIVE,
          start_dte: new Date('2018-08-05'),
          end_dte: new Date('2018-08-10')
        },
        {
          result_id: 4,
          result_reach: faker.random.number(),
          result_impressions: faker.random.number(),
          result_clicks: faker.random.number(),
          result_durations: faker.random.number(),
          result_spend: faker.random.number(),
          result_conversion: faker.random.number(),
          result_url: url,
          result_status: Status.ACTIVE,
          start_dte: new Date('2018-08-06'),
          end_dte: new Date('2018-08-09')
        }
      ]);
    });
};
