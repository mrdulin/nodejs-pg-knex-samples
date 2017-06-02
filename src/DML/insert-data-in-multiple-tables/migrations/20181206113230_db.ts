import * as Knex from 'knex';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('users', t => {
      t.increments('user_id').primary();
      t.string('user_name').notNullable();
      t.integer('address_id')
        .unsigned()
        .notNullable()
        .references('address_id')
        .inTable('addresses');
    }),

    knex.schema.createTable('addresses', t => {
      t.increments('address_id').primary();
      t.string('address_name').notNullable();
    })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all(
    ['users', 'addresses'].map(tableName => {
      return knex.raw('drop table if exists ?? cascade', [tableName]);
    })
  );
};
