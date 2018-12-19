import faker from 'faker';

import { createOrg } from './';
import { knex } from '../db-local';

afterAll(async () => {
  await knex.destroy();
});

describe('createOrg', () => {
  it('t1', async () => {
    const org = { org_name: faker.lorem.word() };
    const actualValue = await createOrg(org);
    console.log(actualValue);
    // expect().toBe();
  });
});
