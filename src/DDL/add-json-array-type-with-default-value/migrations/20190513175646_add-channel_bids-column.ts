import * as Knex from 'knex';
import { loadSQL } from '../../../util';
import path from 'path';

exports.up = async (knex: Knex): Promise<any> => {
  const sql = loadSQL(path.resolve(__dirname, '../sql/tables/channel/add-channel_bids-column.sql'));
  await knex.schema.raw(sql);
};

exports.down = async (knex: Knex): Promise<any> => {
  const sql = loadSQL(path.resolve(__dirname, '../sql/tables/channel/drop-channel_bids-column.sql'));
  await knex.schema.raw(sql);
};
