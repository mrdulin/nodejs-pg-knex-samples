import { knex } from '../db-local';
import { findAdNotRunningByLast24Hours, findAdNotRunningByLast24HoursV2 } from './';

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

describe('findAdNotRunningByLast24HoursV2', () => {
  it('t1', async () => {
    const actualValue = await findAdNotRunningByLast24HoursV2();
    console.log('actualValue: ', actualValue);
    // expect().toBe();
  });
});
