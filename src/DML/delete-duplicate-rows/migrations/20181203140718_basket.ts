import * as Knex from 'knex';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('fruits', (t: Knex.TableBuilder) => {
      t.increments('fruit_id');
      t.string('fruit_name');
    })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all([knex.schema.dropTable('fruits')]);
};
