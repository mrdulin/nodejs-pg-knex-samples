import { knex } from '../db-local';
import { findResultsByLastSeveralDaysClicks, updateResultLastClicksRaw, updateResultLastClicks } from './';

afterAll(async () => {
  await knex.destroy();
});

describe('findResultsByLastSeveralDaysClicks', () => {
  describe('first query', () => {
    const clicks = 50;
    afterEach(async () => {
      await knex('RESULT').update({ result_last_clicks: 0 });
    });
    it('should get results correctly', async () => {
      const actualValue = await findResultsByLastSeveralDaysClicks(clicks);
      expect(actualValue).toHaveLength(2);
      expect(actualValue.map((val: any) => val.result_id)).toEqual([1, 2]);
    });
  });

  describe('second query after clicks increased', () => {
    const clicks = 50;
    let originRows: any[];
    beforeEach(async () => {
      originRows = await knex('RESULT').select();
      await updateResultLastClicksRaw();
      await knex('RESULT')
        .update({ result_clicks: 60 })
        .where({ result_id: 3 });
    });
    afterEach(async () => {
      await knex('RESULT').del();
      await knex('RESULT').insert(originRows);
    });
    it('t1', async () => {
      console.log(await knex('RESULT').select());
      const actualValue = await findResultsByLastSeveralDaysClicks(clicks);
      expect(actualValue).toHaveLength(1);
      expect(actualValue.map((val: any) => val.result_id)).toEqual([3]);
    });
  });
});

describe('updateResultLastClicks', () => {
  afterEach(async () => {
    await knex('RESULT').update({ result_last_clicks: 0 });
  });
  it('should update result last clicks correctly', async () => {
    const actualValue: any[] = await updateResultLastClicks();
    actualValue.forEach(row => {
      expect(row.result_clicks).toEqual(row.result_last_clicks);
      expect(row.result_last_clicks).toBeGreaterThan(0);
    });
  });
});
