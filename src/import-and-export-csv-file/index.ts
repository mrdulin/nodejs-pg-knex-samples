import path from 'path';

import { knex, sqlExecutor } from '../db-dvdrental';
import { loadSQL } from '../util';

const resolve = (filepath: string): string => path.resolve(__dirname, filepath);

async function main() {
  await sqlExecutor(loadSQL(resolve('./create-table.sql')));
  const importResp = await sqlExecutor(loadSQL(resolve('./import.sql')));
  console.log('importResp: ', importResp);
  await knex.destroy();
}

main();
