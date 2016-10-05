import { knex } from '../db-local';
import { overviewRaw } from './';

afterAll(async () => {
  await knex.destroy();
});

describe('overviewRaw', () => {
  it('t1', async () => {
    const actualValue = await overviewRaw();
    console.log(actualValue);
    expect(actualValue).toEqual(
      expect.objectContaining({
        clicks: expect.any(String),
        impressions: expect.any(String),
        spend: expect.any(String),
        conversion: expect.any(String),
        ctr: expect.any(String),
        cpc: expect.any(String),
        cvr: expect.any(String)
      })
    );
  });
});
