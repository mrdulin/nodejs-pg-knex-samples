import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async (knex: Knex): Promise<any> => {
  // await seeds['20190330112235_db'](knex);
  await seeds['20190330123840_add_post_clicks_column_to_posts'](knex);
};

const seeds = {
  '20190330112235_db:': async (knex: Knex) => {
    await knex('posts').del();
    await knex('posts').insert([
      { post_id: 1, post_title: faker.lorem.sentence(), post_tags: faker.lorem.words() },
      { post_id: 2, post_title: faker.lorem.sentence(), post_tags: faker.lorem.words() },
      { post_id: 3, post_title: faker.lorem.sentence(), post_tags: faker.lorem.words() }
    ]);
  },

  '20190330123840_add_post_clicks_column_to_posts': async (knex: Knex) => {
    await knex('posts').del();
    await knex('posts').insert([
      {
        post_id: 1,
        post_title: faker.lorem.sentence(),
        post_tags: faker.lorem.words().split(' '),
        post_clicks: faker.random.number()
      },
      {
        post_id: 2,
        post_title: faker.lorem.sentence(),
        post_tags: faker.lorem.words().split(' '),
        post_clicks: faker.random.number()
      },
      {
        post_id: 3,
        post_title: faker.lorem.sentence(),
        post_tags: faker.lorem.words().split(' '),
        post_clicks: faker.random.number()
      }
    ]);
  }
};
