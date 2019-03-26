import * as Knex from 'knex';

exports.up = async (knex: Knex): Promise<any> => {
  await knex.schema.createTable('users', (t: Knex.TableBuilder) => {
    t.increments('user_id');
    t.string('user_email')
      .notNullable()
      .unique();
  });
};

exports.down = async (knex: Knex): Promise<any> => {
  await knex.schema.dropTable('users');
};
