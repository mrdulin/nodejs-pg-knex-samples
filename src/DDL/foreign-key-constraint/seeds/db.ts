import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async function(knex: Knex): Promise<any> {
  return Promise.all([
    knex('users')
      .del()
      .then(() => {
        return knex('users').insert([
          { user_id: 1, user_name: faker.name.findName() },
          { user_id: 2, user_name: faker.name.findName() },
          { user_id: 3, user_name: faker.name.findName() }
        ]);
      })
      .then(() => {
        return knex('posts')
          .del()
          .then(() => {
            return knex('posts').insert([
              { post_id: 1, post_title: faker.lorem.sentence(), post_author: 1 },
              { post_id: 2, post_title: faker.lorem.sentence(), post_author: 2 },
              { post_id: 3, post_title: faker.lorem.sentence(), post_author: 3 },

              // tslint:disable-next-line:max-line-length
              // error: update or delete on table "users" violates foreign key constraint "posts_post_author_foreign" on table "posts"
              { post_id: 4, post_title: faker.lorem.sentence(), post_author: 4 }
            ]);
          });
      })
  ]);
};
