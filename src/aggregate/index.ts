import { knex } from '../db-local';

// https://stackoverflow.com/questions/34504497/division-not-giving-my-answer-in-postgresql
async function overviewRaw() {
  const sql = `
    with result_sum as (
      select
        result_url,
        sum(result_clicks) as clicks,
        sum(result_impressions) as impressions,
        sum(result_spend) as spend,
        sum(result_conversion) as conversion
      from
        results
      group by
        result_url
    )

    select
      result_sum.*,
      trunc((clicks::numeric / impressions), 2) as ctr,
      trunc((spend::numeric / clicks), 2) as cpc,
      trunc((conversion::numeric / clicks), 2) as cvr
    from
      result_sum;
  `;

  return knex
    .raw(sql)
    .get('rows')
    .get(0);
}

export { overviewRaw };
