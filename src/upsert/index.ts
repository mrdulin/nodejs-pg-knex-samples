import { knex } from '../db-local';

async function upsert() {
  const sql = `
    INSERT INTO users (user_id, user_nme, user_email)
    VALUES
    (3, 'ez2dj', 'ez2dj@qq.com')
    ON CONFLICT (user_id)
    DO
      UPDATE
        SET user_email = 'ez2dj@qq.com', user_nme = 'ez2dj';
  `;

  try {
    await knex.raw(sql);
  } catch (error) {
    console.error('upsert failed.');
    throw error;
  }
}

function batchUpsert() {
  // TODO
}

export { upsert, batchUpsert };
