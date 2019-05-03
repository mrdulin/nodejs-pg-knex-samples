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

async function updateClickRecords(newRecord: string) {
  const sql = `
    with cte as (
      select
      clicks_records[2: array_length(clicks_records, 1)] as clicks_records_tmp
      from
      "RESULT"
    )
    update
      "RESULT"
    set
      clicks_records = array_append(clicks_records_tmp::varchar[], ?)
    from
      cte;
  `;
  try {
    await knex.raw(sql, [newRecord]);
  } catch (error) {
    console.error(error);
    throw new Error('update clicks records failed.');
  }
}

async function updateClickRecordsByResultClicks() {
  const sql = `
    with cte as (
      select
        result_id,
        result_clicks,
        clicks_records[2: array_length(clicks_records, 1)] as clicks_records_tmp
      from
        "RESULT"
      order by result_id asc
    )
    update
      "RESULT" AS r
    set
      clicks_records = array_append(clicks_records_tmp, cte.result_clicks::varchar)
    from
      cte
    where
      r.result_id = cte.result_id;
  `;

  try {
    await knex.raw(sql);
  } catch (error) {
    console.error(error);
    throw new Error('update click records by result clicks failed.');
  }
}

async function findClicksGte(num: number) {
  const sql = `
    with cte as (
      select
      *,
      clicks_records[array_length(clicks_records, 1)] as current_clicks_records,
      clicks_records[1] as seven_days_ago_clicks_records
    from
      "RESULT"
    )
    select * from cte where current_clicks_records::integer - seven_days_ago_clicks_records::integer >= num;

  `;
  try {
    await knex.raw(sql, [num]);
  } catch (error) {
    console.error(error);
    throw new Error(`find clicks greater than ${num} failed.`);
  }
}

export {
  findClicksGte,
  updateResultLastClicksRaw,
  findResultsByLastSeveralDaysClicks,
  updateResultLastClicks,
  updateClickRecords,
  updateClickRecordsByResultClicks
};
