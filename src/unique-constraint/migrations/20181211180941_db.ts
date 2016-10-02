import * as Knex from 'knex';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('tableA', (t: Knex.TableBuilder) => {
      t.increments('table_a_id');
    }),
    knex.schema.createTable('tableB', (t: Knex.TableBuilder) => {
      t.increments('table_b_id');
    }),
    knex.schema.createTable('tableC', (t: Knex.TableBuilder) => {
      t.increments('table_c_id');
    }),
    knex.schema.createTable('tableD', (t: Knex.TableBuilder) => {
      t.increments('table_d_id');
      t.integer('table_a_id')
        .references('table_a_id')
        .inTable('tableA');

      t.integer('table_b_id')
        .references('table_b_id')
        .inTable('tableB');

      t.integer('table_c_id')
        .references('table_c_id')
        .inTable('tableC');

      t.unique(['table_a_id', 'table_c_id']);
      t.unique(['table_b_id', 'table_c_id']);
    })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all(
    ['tableA', 'tableB', 'tableC', 'tableD'].map((tableName: string) =>
      knex.raw('drop table if exists ?? cascade;', [tableName])
    )
  );
};
