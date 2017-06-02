import path from 'path';
import { knex, sqlExecutor } from '../../../../db-dvdrental';
import { loadSQL } from '../../../../util';

const resolve = (filepath: string): string => path.resolve(__dirname, filepath);

async function main() {
  const updateDateResp = await sqlExecutor(loadSQL(resolve('./update-date.sql')));
  const updateAllRowsResp = await sqlExecutor(loadSQL(resolve('./update-all-rows.sql')));
  const updateFromAnotherColumnResp = await sqlExecutor(loadSQL(resolve('./update-from-another-column.sql')));
  const findAndUpdateResp = await sqlExecutor(loadSQL(resolve('./find-and-update.sql')));
  console.log('updateDateResp: ', updateDateResp);
  console.log('updateAllRowsResp: ', updateAllRowsResp);
  console.log('updateFromAnotherColumnResp: ', updateFromAnotherColumnResp);
  console.log('findAndUpdateResp: ', findAndUpdateResp);
  await knex.destroy();
}

main();
