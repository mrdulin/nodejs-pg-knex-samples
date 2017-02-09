import path from 'path';
import fs from 'fs';
import { knex } from '../../../db-dvdrental';

const sql: string = fs.readFileSync(path.resolve(__dirname, './index.sql')).toString();

(async function main() {
  const resp = await knex.raw(sql);
  console.log('rows: ', resp.rows);
  knex.destroy();
})();
