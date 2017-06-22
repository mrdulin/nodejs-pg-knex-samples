import * as Knex from 'knex';
import path from 'path';

import { loadSQL } from '../../../util';

exports.up = async (knex: Knex): Promise<any> => {
  const sql = loadSQL(
    path.resolve(__dirname, '../sql/tables/channel/20190513190800_add-contraint-for-channel_bids_column')
  );
  await knex.schema.raw(sql);
};

exports.down = async (knex: Knex): Promise<any> => {
  //
};
