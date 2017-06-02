import { knex } from '../../db';

async function findChannelById(id: string) {
  try {
    const sql = `
      select * from channels where channel_id = ?;
    `;
    return await knex
      .raw(sql, [id])
      .get('rows')
      .get(0);
  } catch (error) {
    console.error(error);
  }
}

export { findChannelById, knex };
