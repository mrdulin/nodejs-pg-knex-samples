import * as Knex from 'knex';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('books', (t: Knex.TableBuilder) => {
      t.increments('book_id').primary();
      t.string('book_name');
    })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all([knex.schema.dropTable('books')]);
};
