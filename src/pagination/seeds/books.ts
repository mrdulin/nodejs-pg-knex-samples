import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async function(knex: Knex): Promise<any> {
  return knex('books')
    .del()
    .then(() => {
      const books = genMockdata();
      return knex('books').insert(books);
    });
};

function genMockdata() {
  const books: any[] = [];
  for (let i = 0; i < 100; i++) {
    const book = { book_name: faker.name.findName() };
    books.push(book);
  }
  return books;
}
