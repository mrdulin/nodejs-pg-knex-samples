import { knex } from '../db-local';

async function findAdNotRunningByLast24Hours() {
  const sql = `
    SELECT
      *
    FROM
      "AD"
    WHERE
      ad_end_dte < (CURRENT_TIMESTAMP - (INTERVAL '24 hours'))
      OR
      ad_start_dte > CURRENT_TIMESTAMP;
  `;

  return knex.raw(sql).get('rows');
}

export { findAdNotRunningByLast24Hours };
