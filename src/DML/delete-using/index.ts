import { knex } from '../../db';

async function deleteUsingByType(type: string) {
  const sql = `
    delete from books
    using books_tmp
    where
      books.book_id = books_tmp.book_id and books_tmp.book_type = ?
    returning books.*;
  `;
  return knex.raw(sql, [type]).get('rows');
}

async function deleteByType(type: string) {
  const sql = `
    delete from books
    where books.book_id = (select books_tmp.book_id from books_tmp where books_tmp.book_type = ?)
    returning books.*;
  `;

  return knex.raw(sql, [type]).get('rows');
}

export { deleteUsingByType, deleteByType };
