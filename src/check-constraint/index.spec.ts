import faker from 'faker';

import { knex } from '../db-local';
import { createUser } from './';

afterAll(async () => {
  await knex.destroy();
});

describe('createUser', () => {
  it('t1', async () => {
    const user = { user_name: faker.name.findName(), user_email: 123 };
    await expect(createUser(user)).rejects.toThrowError(
      /new row for relation "users" violates check constraint "ck_email"/
    );
  });
});
