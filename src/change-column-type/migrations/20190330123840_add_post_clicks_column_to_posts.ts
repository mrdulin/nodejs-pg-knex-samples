import * as Knex from 'knex';

exports.up = async (knex: Knex): Promise<any> => {
  await knex.schema.raw(`
    ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS post_clicks INTEGER;
  `);
};

exports.down = async (knex: Knex): Promise<any> => {
  await knex.schema.raw(`
    ALTER TABLE posts
    DROP COLUMN IF EXISTS post_clicks;
  `);
};
