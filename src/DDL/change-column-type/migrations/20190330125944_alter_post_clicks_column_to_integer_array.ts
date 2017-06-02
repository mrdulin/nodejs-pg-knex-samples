import * as Knex from 'knex';

exports.up = async (knex: Knex): Promise<any> => {
  await knex.schema.raw(`
    ALTER TABLE posts
    ALTER COLUMN post_clicks SET DATA TYPE INTEGER[] USING ARRAY[post_clicks];
  `);
};

exports.down = async (knex: Knex): Promise<any> => {
  await knex.schema.raw(`
    ALTER TABLE posts
    ALTER COLUMN post_clicks SET DATA TYPE INTEGER USING post_clicks[1];
  `);
};
