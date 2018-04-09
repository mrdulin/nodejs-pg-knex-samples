import { knex } from '../db-local';

describe('knex Other', () => {
  it('toString() - should get query string without running against DB', () => {
    const toStringQuery = knex('RESULT')
      .update({ result_last_clicks: knex.raw('result_clicks') })
      .returning('*')
      .toString();
    console.log(toStringQuery);
  });

  it('toSQL() - should get query object without running against DB', () => {
    const query = knex('RESULT')
      .update({ result_last_clicks: knex.raw('result_clicks') })
      .returning('*')
      .toSQL();
    console.log(query);
  });
});
