import { knex } from '../db';

async function getBooksByPage(pageNo: number = 0, limit: number = 10) {
  const count = await knex.raw(`SELECT COUNT(*) FROM books;`).then(({ rows }) => Number.parseInt(rows[0].count, 10));
  const sql = `
    SELECT * FROM books LIMIT ? OFFSET ?;
  `;
  const offset = pageNo * limit;
  return knex
    .raw(sql, [limit, offset])
    .then(({ rows }) => rows)
    .then(books => ({ count, books }));
}

export { getBooksByPage };
