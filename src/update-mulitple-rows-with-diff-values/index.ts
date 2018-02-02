import moment from 'moment';

import { knex } from '../db-local';

const BOOKS_RELATION_NAME = 'books';
function findAndUpdateBooksActive() {
  return knex(BOOKS_RELATION_NAME)
    .where({ book_active: true })
    .whereRaw('??::date < ?', ['book_end_dte', moment().toISOString()])
    .update({ book_active: false }, '*');
}

async function findDurationValidRaw() {
  const now = moment().toISOString();
  const sql: string = `
    select *,
      case
        when book_end_dte > ? then true
        else false
      end
      as duration_valid
    from books;
  `;

  return knex.raw(sql, [now]).then(({ rows }) => rows);
}

async function findCreatedValidRaw() {
  const thirtyDaysAgo = moment()
    .subtract(30, 'days')
    .toISOString();

  const sql: string = `
    select *,
      case
        when created_at > ? then true
        else false
      end
      as created_valid
    from books;
  `;

  return knex.raw(sql, thirtyDaysAgo).then(({ rows }) => rows);
}

async function findValidRaw() {
  const now = moment().toISOString();
  const thirtyDaysAgo = moment()
    .subtract(30, 'days')
    .toISOString();
  const sql: string = `
    select *,
      case
        when book_end_dte > ? then true
        else false
      end
      as duration_valid,
      case
        when created_at > ? then true
        else false
      end
      as created_valid
    from books;
  `;

  return knex.raw(sql, [now, thirtyDaysAgo]).then(({ rows }) => rows);
}

async function findAndUpdateBookNewRaw() {
  const now = moment().toISOString();
  const thirtyDaysAgo = moment()
    .subtract(30, 'days')
    .toISOString();
  const sql: string = `
    update books
    -- set book_new = subquery.duration_valid = TRUE AND subquery.created_valid = TRUE
    set book_new = subquery.duration_valid AND subquery.created_valid
    from (
      select *,
        case
          when book_end_dte > ? then true
          else false
        end
        as duration_valid,
        case
          when created_at > ? then true
          else false
        end
        as created_valid
      from books
    ) as subquery
    where books.book_id = subquery.book_id
    RETURNING books.*;
  `;

  return knex.raw(sql, [now, thirtyDaysAgo]).then(({ rows }) => rows);
}

export { findAndUpdateBooksActive, findDurationValidRaw, findCreatedValidRaw, findValidRaw, findAndUpdateBookNewRaw };
