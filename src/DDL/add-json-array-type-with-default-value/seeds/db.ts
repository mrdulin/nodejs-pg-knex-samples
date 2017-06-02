import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async (knex: Knex): Promise<any> => {
  await knex('channels').del();
  await knex('channels').insert([
    { channel_nme: faker.name.findName() },
    { channel_nme: faker.name.findName() },
    { channel_nme: faker.name.findName() }
  ]);
};
