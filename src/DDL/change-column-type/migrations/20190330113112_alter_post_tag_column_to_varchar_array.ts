import * as Knex from 'knex';

exports.up = async (knex: Knex): Promise<any> => {
  await knex.schema.raw(`
    ALTER TABLE posts ALTER COLUMN post_tags SET DATA TYPE varchar(255)[] USING string_to_array(post_tags, ' ');
  `);
};

exports.down = async (knex: Knex): Promise<any> => {
  await knex.schema.raw(`
    ALTER TABLE posts
    ALTER COLUMN post_tags SET DATA TYPE varchar(255) USING array_to_string(post_tags, ' ');
  `);
};
