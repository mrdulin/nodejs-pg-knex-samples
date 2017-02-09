import fs from 'fs';
import path from 'path';

import { knex } from '../../../db-dvdrental';

const sql = fs.readFileSync(path.resolve(__dirname, './inner-join.sql')).toString();

console.log('sql: ', sql);

knex
  .raw(sql)
  .then(resp => {
    console.log('resp: ', resp);
    console.log('rows: ', resp.rows);
  })
  .catch(err => console.error(err))
  .finally(() => knex.destroy());
