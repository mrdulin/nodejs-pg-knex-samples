import * as Knex from 'knex';

exports.up = async (knex: Knex): Promise<any> => {
  await knex.schema.createTable('posts', (t: Knex.TableBuilder) => {
    t.increments('post_id');
    t.string('post_title')
      .unique()
      .notNullable();
    t.string('post_tags');
  });
};

exports.down = async (knex: Knex): Promise<any> => {
  await knex.schema.dropTable('posts');
};
