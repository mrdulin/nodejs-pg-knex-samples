import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async (knex: Knex): Promise<any> => {
  await knex('posts').del();
  await knex('posts').insert([
    { post_id: 1, post_title: faker.lorem.sentence(), post_tags: faker.lorem.words() },
    { post_id: 2, post_title: faker.lorem.sentence(), post_tags: faker.lorem.words() },
    { post_id: 3, post_title: faker.lorem.sentence(), post_tags: faker.lorem.words() }
  ]);
};
