import { knex } from '../db-local';

async function findAdNotRunningByLast24Hours() {
  const adIds: number[] = [];

  for (let i = 1; i < 100; i++) {
    adIds.push(i);
  }

  const sql = `
    SELECT
      *
    FROM
      "AD"
    WHERE
      (
        ad_end_dte < (CURRENT_TIMESTAMP - (INTERVAL '24 hours'))
        OR
        ad_start_dte > CURRENT_TIMESTAMP
      ) AND
      ad_id IN (${adIds.map(() => '?').join(',')})
  `;

  return knex.raw(sql, adIds).get('rows');
}

async function findAdNotRunningByLast24HoursV2() {
  const adIds: number[] = [];

  for (let i = 1; i < 100; i++) {
    adIds.push(i);
  }

  const queryBuilder = knex('AD')
    .where(function() {
      this.where('ad_end_dte', '<', knex.raw("CURRENT_TIMESTAMP - (INTERVAL '24 hours')")).orWhere(
        'ad_start_dte',
        '>',
        knex.raw('CURRENT_TIMESTAMP')
      );
    })
    .whereIn('ad_id', adIds);

  // console.log(queryBuilder.toSQL());
  // console.log(queryBuilder.toString());

  try {
    const ads = await queryBuilder;
    console.log('ads: ', ads);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { findAdNotRunningByLast24Hours, findAdNotRunningByLast24HoursV2 };
