import { knex } from '../db-local';
import { findByIds, findByShareIds } from './';

afterAll(async () => {
  await knex.destroy();
});

describe('findByIds', () => {
  it('t-1', async () => {
    const ids = [1, 2];
    const actualValue = await findByIds(ids);
    console.log(actualValue);
    // expect().toBe();
  });
});

describe('findByShareIds', () => {
  it('t-1', async () => {
    const ids = [5, 9];
    const actualValue = await findByShareIds(ids);
    console.log(actualValue);
    // expect().toBe();
  });
});
