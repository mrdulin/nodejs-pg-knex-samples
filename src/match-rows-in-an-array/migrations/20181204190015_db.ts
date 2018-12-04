import * as Knex from 'knex';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('books', (t: Knex.TableBuilder) => {
      t.increments('book_id').primary();
      t.string('book_name');
      t.specificType('book_share_ids', 'integer[]');
    })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all(['books'].map((table: string) => knex.raw('drop table if exists ??', [table])));
};
