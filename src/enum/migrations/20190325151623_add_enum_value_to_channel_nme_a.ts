import * as Knex from 'knex';
import { ChannelEnum } from '../types';

exports.up = async (knex: Knex): Promise<any> => {
  await knex.schema.raw(`
    ALTER TABLE "channel" DROP CONSTRAINT "channel_channel_nme_a_check",
    ADD CONSTRAINT "channel_channel_nme_a_check" CHECK (channel_nme_a IN ('${ChannelEnum.FACEBOOK}', '${
    ChannelEnum.GOOGLE
  }', '${ChannelEnum.INSTAGRAM}', '${ChannelEnum.LINK_IN}'))
  `);
  // or
  // channel_nme_a = ANY (ARRAY['FACEBOOK'::text, 'GOOGLE'::text, 'INSTAGRAM'::text])
};

exports.down = async (knex: Knex): Promise<any> => {
  await knex.schema.raw(`
    ALTER TABLE "channel" DROP CONSTRAINT "channel_channel_nme_a_check",
    ADD CONSTRAINT "channel_channel_nme_a_check" CHECK (channel_nme_a IN ('${ChannelEnum.FACEBOOK}', '${
    ChannelEnum.GOOGLE
  }', '${ChannelEnum.INSTAGRAM}'))
  `);
};
