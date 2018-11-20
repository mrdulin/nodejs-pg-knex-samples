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
  // const createTableResp = await createTable();
  // const insertOneRowResp = await insertOneRow();
  // const addNewColumnResp = await sqlExecutor(loadSQL(resolve('./add-a-new-column.sql')));
  // const alterColumnResp = await sqlExecutor(loadSQL(resolve('./alter-column.sql')));
  // const insertDateResp = await sqlExecutor(loadSQL(resolve('./insert-date.sql')));
  // const getLastInsertIdResp = await sqlExecutor(loadSQL(resolve('./get-last-insert-id.sql')));
  const newLink = {
    url: 'http://github.com',
    name: 'GitHub',
    description: 'GitHub is awesome',
    rel: '',
    last_update: new Date()
  };
  const columns = Object.keys(newLink);
  const values = columns.map(col => newLink[col]);
  console.log('columns: ', columns);
  console.log('values: ', values);
  const sql = `
    INSERT INTO link (${columns.map(col => col).join(',')})
    VALUES (${values.map(() => '?').join(',')})
  `;
  console.log('sql: ', sql);
  try {
    const insertObjResp = await knex.raw(sql, values);
    console.log('insertObjResp: ', insertObjResp);
  } catch (error) {
    console.error(error);
  }
  // console.log('createTableResp: ', createTableResp);
  // console.log('insertOneRowResp: ', insertOneRowResp);
  // console.log('addNewColumnResp: ', addNewColumnResp);
  // console.log('alterColumnResp: ', alterColumnResp);
  // console.log('insertDateResp: ', insertDateResp);
  // console.log('getLastInsertIdResp: ', getLastInsertIdResp);
  await knex.destroy();
}

main();
