import { getSubordinates, getAllCampaigns } from '.';
import { knex } from '../../db';

afterAll(async () => {
  await knex.destroy();
});

describe.skip('getSubordinates test suites', () => {
  it('t-1', async () => {
    const employeeId = 2;
    const actualValue = await getSubordinates(employeeId);
    console.log(actualValue);
    // expect().toBe();
  });
});

describe('getAllCampaigns', () => {
  it('t-1', async () => {
    const orgId = 2;
    const actualValue = await getAllCampaigns(orgId);
    console.log(actualValue);
    // expect().toBe();
  });
});
