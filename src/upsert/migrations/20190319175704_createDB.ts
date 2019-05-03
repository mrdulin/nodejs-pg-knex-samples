import * as Knex from 'knex';

exports.up = async (knex: Knex): Promise<any> => {
  await knex.schema.createTable('users', (t: Knex.TableBuilder) => {
    t.increments('user_id');
    t.string('user_nme');
    t.string('user_email')
      .unique()
      .notNullable();
  });
};

exports.down = async (knex: Knex): Promise<any> => {
  await knex.schema.dropTable('users');
};
