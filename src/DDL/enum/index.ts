import { Client } from 'pg';
import { ChannelEnum } from './types';

const client = new Client({
  host: 'localhost',
  port: 5431,
  user: 'sampleadmin',
  password: 'samplepass',
  database: 'nodejs-pg-knex-samples'
});

async function main() {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }

  try {
    const sql = `
      create type "channel_nme_d" as enum ($1, $2, $3);
    `;
    const res = await client.query(sql, [ChannelEnum.FACEBOOK, ChannelEnum.GOOGLE, ChannelEnum.INSTAGRAM]);
    console.log(res);
  } catch (error) {
    console.error(error);
  }

  try {
    const sql = `
      create type "channel_nme_e" as enum ('${ChannelEnum.FACEBOOK}','${ChannelEnum.GOOGLE}','${
      ChannelEnum.INSTAGRAM
    }');
    `;
    const res = await client.query(sql);
    console.log(res);
  } catch (error) {
    console.error(error);
  }

  try {
    await client.end();
  } catch (error) {
    console.error(error);
  }
}

main();
