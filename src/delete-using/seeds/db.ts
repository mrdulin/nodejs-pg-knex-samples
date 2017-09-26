import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async function(knex: Knex): Promise<any> {
  return knex
    .raw(`truncate table "books"`)
    .then(() => knex.raw(`truncate table books_tmp`))
    .then(() => knex('users').del())
    .then(() =>
      knex('users').insert([
        { user_id: 1, user_name: faker.name.findName() },
        { user_id: 2, user_name: faker.name.findName() },
        { user_id: 3, user_name: faker.name.findName() }
      ])
    )
    .then(() => {
      return knex('books').insert([
        { book_id: 1, book_name: faker.name.findName(), user_id: 1 },
        { book_id: 2, book_name: faker.name.findName(), user_id: 2 },
        { book_id: 3, book_name: faker.name.findName(), user_id: 3 },
        { book_id: 4, book_name: faker.name.findName(), user_id: 1 }
      ]);
    })
    .then(() => {
      return knex('books_tmp').insert([
        { book_id: 1, book_name: faker.name.findName(), book_type: 'computer' },
        { book_id: 2, book_name: faker.name.findName(), book_type: 'health' }
      ]);
    });
};
