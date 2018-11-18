import Knex from 'knex';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('merchants', (table: Knex.TableBuilder) => {
      table.increments('id').primary();
      table.string('name');
    }),

    knex.schema.createTable('products', (table: Knex.TableBuilder) => {
      table.increments('id').primary();
      table.string('name');
      table.integer('price');
      table
        .integer('merchant_id')
        .unsigned()
        .references('merchants.id');
    })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all([knex.schema.dropTable('products'), knex.schema.dropTable('merchants')]);
};
