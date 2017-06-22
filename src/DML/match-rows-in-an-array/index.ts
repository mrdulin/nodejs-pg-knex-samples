import { knex } from '../../db';

async function findByIds(ids: number[]) {
  const sql = `
    select * from books where book_id in (${ids.map(_ => '?').join(',')})
  `;

  return knex.raw(sql, ids).get('rows');
}

async function findByShareIds(shareIds: number[]) {
  const sql = `
    select * from books where book_share_ids && ?;
  `;

  return knex.raw(sql, [shareIds]).get('rows');
}

export { findByIds, findByShareIds };
