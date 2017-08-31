import * as Knex from 'knex';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('users', (t: Knex.TableBuilder) => {
      t.increments('user_id').primary();
      t.string('user_name');
    }),
    knex.schema.createTable('posts', (t: Knex.TableBuilder) => {
      t.integer('post_author')
        .unsigned()
        .notNullable();
      t.increments('post_id').primary();
      t.string('post_title');

      t.foreign('post_author')
        .references('user_id')
        .inTable('users');
    })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all(
    ['users', 'posts'].map((tname: string) => {
      return knex.raw('DROP TABLE ?? CASCADE', [tname]);
    })
  );
};
