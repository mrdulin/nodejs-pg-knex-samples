import { getSubordinates } from './';
import { knex } from '../db-local';

afterAll(async () => {
  await knex.destroy();
});

describe('getSubordinates test suites', () => {
  it('t-1', async () => {
    const employeeId = 2;
    const actualValue = await getSubordinates(employeeId);
    console.log(actualValue);
    // expect().toBe();
  });
});
