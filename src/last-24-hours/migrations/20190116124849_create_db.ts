import * as Knex from 'knex';

const tables = {
  user: 'USER',
  ad: 'AD'
};

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable(tables.user, (t: Knex.TableBuilder) => {
      t.increments('user_id');
      t.string('user_email')
        .notNullable()
        .unique();
      t.dateTime('user_last_login_at');
    }),

    knex.schema.createTable(tables.ad, (t: Knex.TableBuilder) => {
      t.increments('ad_id');
      ['ad_start_dte', 'ad_end_dte'].forEach((colName: string) => {
        t.dateTime(colName)
          .notNullable()
          .defaultTo(knex.fn.now());
      });
    })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all(Object.values(tables).map((tableName: string) => knex.schema.dropTable(tableName)));
};
