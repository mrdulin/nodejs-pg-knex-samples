import { knex } from '../db-local';

async function findResultsByLastSeveralDaysClicks(clicks: number) {
  const sql = `
    SELECT
      r.*
    FROM
      "RESULT" AS r
    WHERE
      (r.result_clicks - r.result_last_clicks) >= ?;
  `;

  try {
    const rows = await knex.raw(sql, [clicks]).get('rows');
    await updateResultLastClicksRaw();
    return rows;
  } catch (error) {
    console.log('findResultsByLastSeveralDaysClicks failed');
    console.log(error);
    return [];
  }
}

async function updateResultLastClicksRaw() {
  const sql = `
    UPDATE
      "RESULT" AS r
    SET
      result_last_clicks = result_clicks;
  `;

  try {
    await knex.raw(sql);
  } catch (error) {
    console.log('update result last clicks failed');
    console.log(error);
  }
}

async function updateResultLastClicks() {
  return knex('RESULT')
    .update({ result_last_clicks: knex.raw('result_clicks') })
    .returning('*');
}

export { updateResultLastClicksRaw, findResultsByLastSeveralDaysClicks, updateResultLastClicks };
