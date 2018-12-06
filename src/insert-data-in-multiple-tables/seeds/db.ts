import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async function(knex: Knex): Promise<any> {
  await knex('addresses')
    .del()
    .then(() => {
      return knex('addresses').insert([{ address_id: 1, address_name: faker.address.city() }]);
    });

  await knex('users')
    .del()
    .then(function() {
      return knex('users').insert([
        { user_id: 1, user_name: faker.name.findName(), address_id: 1 },
        { user_id: 2, user_name: faker.name.findName(), address_id: 1 },
        { user_id: 3, user_name: faker.name.findName(), address_id: 1 }
      ]);
    });
};
