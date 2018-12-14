import { knex } from '../db-local';

// https://stackoverflow.com/questions/34504497/division-not-giving-my-answer-in-postgresql
async function overviewRaw() {
  const sql = `
    with calc_end_dte as (
      select
        *,
        case
          when result_status='active' then '2018-08-06'::timestamp
          else end_dte
        end
          as tmp_end_dte
      from
        results
    ) , unique_date_count as (
      select
        count(*) as duration
      from
        (select
            distinct generate_series
        from
          calc_end_dte,
          generate_series(calc_end_dte.start_dte, calc_end_dte.tmp_end_dte, '1 day'::interval)
        order by
          generate_series asc)
        as date_range
    ), result_sum as (
      select
        result_url,
        duration,
        -- date_part('days', MAX(end_dte)::timestamp - MIN(start_dte)::timestamp) as duration,
        sum(result_clicks) as clicks,
        sum(result_impressions) as impressions,
        sum(result_spend) as spend,
        sum(result_conversion) as conversion
      from
        calc_end_dte, unique_date_count
      group by
        result_url,
        duration
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

async function getUniqueDateRange() {
  const sql = `
    select
      distinct generate_series as date
    from
      results,
      generate_series(results.start_dte, results.end_dte, '1 day'::interval)
    order by
      date asc
  `;

  return knex
    .raw(sql)
    .get('rows')
    .map((row: any) => new Date(row.date).toISOString());
}

export { overviewRaw, getUniqueDateRange };
