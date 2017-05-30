import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async function(knex: Knex): Promise<any> {
  return knex('users')
    .del()
    .then(function() {
      return knex('users').insert([
        { user_id: 1, user_name: faker.name.findName(), user_email: faker.internet.email() },
        { user_id: 2, user_name: faker.name.findName(), user_email: faker.internet.exampleEmail() }
      ]);
    });
};
