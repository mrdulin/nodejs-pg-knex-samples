import moment from 'moment';
import _ from 'lodash';
import { knex } from '../../db';

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

async function findAndUpdateBookNewRaw(field: string, value: any) {
  const now = moment().toISOString();
  const thirtyDaysAgo = moment()
    .subtract(30, 'days')
    .toISOString();
  const sql: string = `
    update books
    -- set book_new = subquery.duration_valid = TRUE AND subquery.created_valid = TRUE
    set
      book_new = subquery.duration_valid AND subquery.created_valid,
      book_active =
        case
          when subquery.duration_valid = TRUE then book_active
          else false
        end
    from (
      select book_id,
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
    where books.book_id = subquery.book_id AND ?? = ?
    RETURNING books.*, subquery.*;
  `;

  return knex.raw(sql, [now, thirtyDaysAgo, `books.${field}`, value]).then(({ rows }) => rows);
}

async function updateByMultipleDatas(datas: any[]) {
  const sql = `
    UPDATE
      books
    SET
      book_name = datas.book_name,
      book_new = datas.book_new::BOOLEAN
    FROM (
      VALUES
        ${datas
          .map(data => {
            const values = Object.keys(data).map(key => data[key]);
            return `(${values.map(() => '?').join(',')})`;
          })
          .join(',')}
    ) AS datas(book_id, book_name, book_new)
    WHERE
      datas.book_id::INTEGER = books.book_id;
  `;
  const bindings = _.flatten(
    datas.map(data => {
      return Object.keys(data).map(key => data[key]);
    })
  );
  return knex.raw(sql, bindings);
}

export {
  findAndUpdateBooksActive,
  findDurationValidRaw,
  findCreatedValidRaw,
  findValidRaw,
  findAndUpdateBookNewRaw,
  updateByMultipleDatas
};
