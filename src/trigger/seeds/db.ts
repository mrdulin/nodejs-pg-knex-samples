import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async function(knex: Knex): Promise<any> {
  return knex('employees')
    .del()
    .then(function() {
      return knex('employees').insert([
        { id: 1, first_name: faker.name.firstName(), last_name: faker.name.lastName() },
        { id: 2, first_name: faker.name.firstName(), last_name: faker.name.lastName() }
      ]);
    });
};
