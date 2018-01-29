import * as Knex from 'knex';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('channels', (t: Knex.TableBuilder) => {
      t.increments('channel_id');
      t.specificType('channel_keywords', 'VARCHAR(255)[]')
        .notNullable()
        .defaultTo('{1,2}');

      // not
      // .defaultTo([])
    })
  ]);
};

exports.down = async function(knex: Knex): Promise<any> {
  await knex.schema.dropTable('channels');
};
