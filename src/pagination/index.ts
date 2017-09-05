import Knex from 'knex';
import { knex } from '../db';

const PAGINATION_SIZE = 10;

async function getBooksByPage(pageNo: number = 0, limit: number = PAGINATION_SIZE) {
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

interface IBooksRelayStylePage {
  edges: IEdge[];
  count: number;
  pageInfo: IPageInfo;
}

interface IPageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
}

interface IEdge {
  node: any;
  cursor: string;
}

interface IBook {
  book_id: number;
  book_name: string;
}

/**
 * https://github.com/graphql/graphql-relay-js/issues/94#issuecomment-232410564
 * https://gist.github.com/pcattori/2bb645d587e45c9fdbcabf5cef7a7106
 * @param first
 * @param after
 */
async function getBooksRelayStylePageByIdRaw(
  first: number = PAGINATION_SIZE,
  afterBase64?: string
): Promise<IBooksRelayStylePage> {
  let firstId;
  let lastId;
  const after = afterBase64 ? base64Decode(afterBase64) : '';
  let sql: string;
  let bindings: any[] = [];
  if (after) {
    sql = `select * from books where book_id > ? order by book_id asc limit ?;`;
    bindings = [after, first + 1];
  } else {
    sql = `select * from books order by book_id asc limit ?;`;
    bindings = [first + 1];
  }
  const edges = await knex
    .raw(sql, bindings)
    .then(({ rows }: { rows: IBook[] }): IBook[] => rows)
    .tap((rows: IBook[]) => {
      firstId = rows[0].book_id;
      lastId = rows[rows.length - 2].book_id;
    })
    .map(
      (row: IBook): IEdge => {
        return {
          node: row,
          cursor: base64Encode(row.book_id)
        };
      }
    );
  const count = await knex.raw(`select cast (count(book_id) as integer) from books;`).then(({ rows }) => rows[0].count);
  const hasNextPage = edges.length === first + 1;
  return {
    edges: edges.slice(0, -1),
    count,
    pageInfo: {
      startCursor: base64Encode(firstId),
      endCursor: base64Encode(lastId),
      hasNextPage
    }
  };
}

function base64Encode(str: string | number): string {
  return Buffer.from(str.toString()).toString('base64');
}

function base64Decode(b64Encoded: string | number): string {
  return Buffer.from(b64Encoded.toString(), 'base64').toString();
}

export { getBooksByPage, getBooksRelayStylePageByIdRaw, IBooksRelayStylePage, IBook };
