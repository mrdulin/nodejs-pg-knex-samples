import * as Knex from 'knex';
import { ChannelEnum } from '../types';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema
      .createTable('channel', (t: Knex.TableBuilder) => {
        t.increments();
        const enumOptions: Knex.EnumOptions = {
          useNative: true,
          enumName: 'channel_nme_b'
        };
        t.enum('channel_nme_a', [ChannelEnum.FACEBOOK, ChannelEnum.GOOGLE, ChannelEnum.INSTAGRAM]);
        t.enum('channel_nme_b', [ChannelEnum.FACEBOOK, ChannelEnum.GOOGLE, ChannelEnum.INSTAGRAM], enumOptions);
      })
      .then(() => {
        return knex.raw(`create type "channel_nme_c" as enum (?,?,?);`, [
          ChannelEnum.FACEBOOK,
          ChannelEnum.GOOGLE,
          ChannelEnum.INSTAGRAM
        ]);
      })
      .then(() => {
        return knex.raw(`alter table "channel" add column if not exists channel_nme_c channel_nme_c;`);
      })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all(['channel'].map((tableName: string) => knex.raw(`drop table if exists ??;`, [tableName])));
};
