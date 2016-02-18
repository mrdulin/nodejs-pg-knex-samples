import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async (knex: Knex): Promise<any> => {
  await knex('users').del();
  await knex('users').insert([
    { user_id: 1, user_email: faker.internet.email() },
    { user_id: 2, user_email: faker.internet.email() },
    { user_id: 3, user_email: faker.internet.email() }
  ]);
};
