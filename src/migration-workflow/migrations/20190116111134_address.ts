import * as Knex from 'knex';

const TABLE_NAME = 'ADDRESS';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable(TABLE_NAME, (t: Knex.TableBuilder) => {
      t.increments('address_id');
      ['address_city', 'address_state'].forEach((colName: string) => {
        t.string(colName);
      });
    })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all([TABLE_NAME].map(tableName => knex.schema.dropTable(tableName)));
};
