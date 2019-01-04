import * as Knex from 'knex';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('ORG', (t: Knex.TableBuilder) => {
      t.increments('org_id');
      t.string('org_nme')
        .notNullable()
        .unique();
    }),
    knex.schema.createTable('RESULT', (t: Knex.TableBuilder) => {
      t.increments('result_id');
      ['result_clicks', 'result_last_clicks'].forEach((col: string) => {
        t.integer(col)
          .notNullable()
          .defaultTo(0);
      });

      t.integer('org_id')
        .unsigned()
        .notNullable();

      t.foreign('org_id')
        .references('org_id')
        .inTable('ORG');
    })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all(['RESULT', 'ORG'].map((table: string) => knex.raw(`DROP TABLE IF EXISTS ?? CASCADE;`, [table])));
};
