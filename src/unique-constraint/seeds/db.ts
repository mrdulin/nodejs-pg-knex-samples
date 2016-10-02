import * as Knex from 'knex';

exports.seed = async function(knex: Knex): Promise<any> {
  await knex('tableA')
    .del()
    .then(() => {
      return knex('tableA').insert([{ table_a_id: 1 }]);
    });

  await knex('tableB')
    .del()
    .then(() => {
      return knex('tableB').insert([{ table_b_id: 1 }]);
    });

  await knex('tableC')
    .del()
    .then(() => {
      return knex('tableC').insert([{ table_c_id: 1 }]);
    });

  await knex('tableD')
    .del()
    .then(() => {
      return knex('tableD').insert([{ table_a_id: 1, table_b_id: null, table_c_id: 1 }]);
    });
};
