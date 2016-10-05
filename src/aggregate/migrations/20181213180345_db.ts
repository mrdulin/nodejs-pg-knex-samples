import * as Knex from 'knex';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('results', (t: Knex.TableBuilder) => {
      t.increments('result_id');
      [
        'result_reach',
        'result_impressions',
        'result_clicks',
        'result_durations',
        'result_spend',
        'result_conversion'
      ].forEach(col => {
        t.integer(col)
          .notNullable()
          .defaultTo(0);
      });

      ['result_cpc', 'result_ctr', 'result_cvr'].forEach(col => {
        t.decimal(col)
          .notNullable()
          .defaultTo(0);
      });

      t.string('result_url').nullable();
    })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all(['results'].map((tableName: string) => knex.schema.dropTable(tableName)));
};
