import * as Knex from 'knex';

exports.up = async function(knex: Knex): Promise<any> {
  return knex.schema.createTable('books', (t: Knex.TableBuilder) => {
    t.increments('book_id').primary();
    t.string('book_name');
    t.boolean('book_new');
    t.boolean('book_active');
    t.dateTime('book_start_dte');
    t.dateTime('book_end_dte');
    t.timestamps(true, true);
  });
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all([knex.schema.dropTable('books')]);
};
