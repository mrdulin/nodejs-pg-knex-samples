import path from 'path';

import { knex, sqlExecutor } from '../../../db-dvdrental';
import { loadSQL } from '../../../util';

const resolve = (filepath: string) => path.resolve(__dirname, filepath);

async function createTable() {
  const sql = loadSQL(resolve('./create-table.sql'));
  return sqlExecutor(sql);
}

async function insertOneRow() {
  const sql = loadSQL(resolve('./insert-one-row.sql'));
  return sqlExecutor(sql);
}

async function main() {
  const createTableResp = await createTable();
  const insertOneRowResp = await insertOneRow();
  const addNewColumnResp = await sqlExecutor(loadSQL(resolve('./add-a-new-column.sql')));
  const alterColumnResp = await sqlExecutor(loadSQL(resolve('./alter-column.sql')));
  const insertDateResp = await sqlExecutor(loadSQL(resolve('./insert-date.sql')));
  const getLastInsertIdResp = await sqlExecutor(loadSQL(resolve('./get-last-insert-id.sql')));
  console.log('createTableResp: ', createTableResp);
  console.log('insertOneRowResp: ', insertOneRowResp);
  console.log('addNewColumnResp: ', addNewColumnResp);
  console.log('alterColumnResp: ', alterColumnResp);
  console.log('insertDateResp: ', insertDateResp);
  console.log('getLastInsertIdResp: ', getLastInsertIdResp);
  await knex.destroy();
}

main();
