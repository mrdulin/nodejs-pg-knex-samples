import * as Knex from 'knex';
import path from 'path';
import { pd } from 'pretty-data';
import { loadSQL } from '../../../util';
import { downloadPromise } from '../download';
import { csvToJSON } from '../csvtojson';

const sql = {
  createTable: loadSQL('./create-table.sql'),
  import: loadSQL('./import.sql'),
  dropTable: loadSQL('./drop-table.sql')
};

// download => save csv file somewhere(file system) => import to table
// exports.up = async (knex: Knex): Promise<any> => {
//   const filename = 'geotargets-2019-05-02.csv';
//   const url = `https://developers.google.com/adwords/api/docs/appendix/geo/${filename}`;
//   const dest = path.resolve('/Users/ldu020/workspace/github.com/mrdulin/nodejs-pg-knex-samples/db', `./${filename}`);
//   await downloadPromise(url, dest);
//   await knex.schema.raw(sql.createTable).raw(sql.import);
// };

// request => convert csv to json(in memory) => insert to table
exports.up = async (knex: Knex): Promise<any> => {
  const filename = 'geotargets-2019-05-02.csv';
  const url = `https://developers.google.com/adwords/api/docs/appendix/geo/${filename}`;
  const datas = await csvToJSON(url);
  await knex.schema.raw(sql.createTable);
  // console.log('datas: ', pd.json(datas));
  console.log('datas length: ', datas.length);

  // not working?
  // await knex('t1_geotargets').insert(datas);

  const chunkSize = 100;
  await knex.transaction(function(tr) {
    return knex.batchInsert('t1_geotargets', datas, chunkSize).transacting(tr);
  });
};

exports.down = async (knex: Knex): Promise<any> => {
  await knex.schema.raw(sql.dropTable);
};
