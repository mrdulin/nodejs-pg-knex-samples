import * as Knex from 'knex';

exports.seed = async function(knex: Knex): Promise<any> {
  return knex('fruits')
    .del()
    .then(() => {
      return knex('fruits').insert([
        { fruit_id: 1, fruit_name: 'apple' },
        { fruit_id: 2, fruit_name: 'apple' },
        { fruit_id: 3, fruit_name: 'orange' },
        { fruit_id: 4, fruit_name: 'orange' },
        { fruit_id: 5, fruit_name: 'orange' },
        { fruit_id: 6, fruit_name: 'banana' }
      ]);
    });
};
