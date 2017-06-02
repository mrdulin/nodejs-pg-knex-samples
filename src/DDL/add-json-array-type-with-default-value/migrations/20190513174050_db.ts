import * as Knex from 'knex';
import path from 'path';
import { loadSQL } from '../../../util';

exports.up = async (knex: Knex): Promise<any> => {
  const createChannelTable = loadSQL(path.resolve(__dirname, '../sql/tables/channel/create.sql'));
  await knex.schema.raw(createChannelTable);
};

exports.down = async (knex: Knex): Promise<any> => {
  const dropChannelTable = loadSQL(path.resolve(__dirname, '../sql/tables/channel/create.sql'));
  await knex.schema.raw(dropChannelTable);
};
