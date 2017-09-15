import { knex } from '../db-local';

async function findDuplicateRowsRaw() {
  const sql = `
    select fruit_name, count(fruit_name)
    from fruits
    group by fruit_name
    having count(fruit_name) > 1
    order by fruit_name;
  `;

  return knex.raw(sql).get('rows');
}

async function deleteDuplicateRowsRaw() {}

export { findDuplicateRowsRaw, deleteDuplicateRowsRaw };
