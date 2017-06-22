import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async function(knex: Knex): Promise<any> {
  return knex('books')
    .del()
    .then(function() {
      return knex('books').insert([
        { book_id: 1, book_name: faker.name.findName(), book_share_ids: [1, 2, 3] },
        { book_id: 2, book_name: faker.name.findName(), book_share_ids: [3, 4, 5] },
        { book_id: 3, book_name: faker.name.findName(), book_share_ids: [9] }
      ]);
    });
};
