import * as Knex from 'knex';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('users', (t: Knex.TableBuilder) => {
      t.increments('user_id');
      t.string('user_name').notNullable();
      t.string('user_email')
        .unique()
        .notNullable();

      // https://github.com/tgriesser/knex/issues/2951
      t.specificType('user_addresses', 'JSON[]');
      t.json('user_addresses_v2').defaultTo([]);

      t.json('user_addresses_v3');

      t.string('user_tags').defaultTo([]);
      t.specificType('user_tags_v2', 'VARCHAR[]');
    })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all([knex.schema.dropTable('users')]);
};
