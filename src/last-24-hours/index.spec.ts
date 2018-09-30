import { knex } from '../db-local';
import { findAdNotRunningByLast24Hours } from './';

afterAll(async () => {
  await knex.destroy();
});

describe('findAdNotRunningByLast24Hours', () => {
  it('t1', async () => {
    const actualValue = await findAdNotRunningByLast24Hours();
    console.log('actualValue: ', actualValue);
    // expect().toBe();
  });
});
