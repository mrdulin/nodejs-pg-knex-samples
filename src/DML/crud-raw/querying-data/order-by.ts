import { knex } from '../../../db-dvdrental';

const sql = `SELECT first_name, last_name FROM customer ORDER BY first_name ASC;`;

knex
  .raw(sql)
  .then(resp => {
    console.log('resp: ', resp);
    console.log('rows: ', resp.rows);
  })
  .catch(err => console.error(err))
  .finally(() => knex.destroy());
