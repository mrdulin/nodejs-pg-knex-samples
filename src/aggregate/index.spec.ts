import { knex } from '../db-local';
import { overviewRaw, getUniqueDateRange } from './';

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

describe('getUniqueDateRange', () => {
  it('t1', async () => {
    const actualValue = await getUniqueDateRange();
    expect(actualValue).toEqual([
      '2018-08-01T00:00:00.000Z',
      '2018-08-02T00:00:00.000Z',
      '2018-08-03T00:00:00.000Z',
      '2018-08-04T00:00:00.000Z',
      '2018-08-05T00:00:00.000Z',
      '2018-08-06T00:00:00.000Z',
      '2018-08-07T00:00:00.000Z',
      '2018-08-08T00:00:00.000Z',
      '2018-08-09T00:00:00.000Z',
      '2018-08-10T00:00:00.000Z'
    ]);
  });
});
