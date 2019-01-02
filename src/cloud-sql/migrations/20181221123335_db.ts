import * as Knex from 'knex';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('orgs', (t: Knex.TableBuilder) => {
      t.increments('org_id');
      t.string('org_name');
    })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all(['orgs'].map((tableName: string) => knex.schema.dropTable(tableName)));
};
