import { knex } from '../db-local';
import { findDuplicateRowsRaw } from './';

afterAll(async () => {
  await knex.destroy();
});

describe('findDuplicateRowsRaw', () => {
  it('t-1', async () => {
    const actualValue = await findDuplicateRowsRaw();
    console.log(actualValue);
    // expect().toBe();
  });
});
