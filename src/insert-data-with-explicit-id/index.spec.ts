import faker from 'faker';
import { insert } from './';
import { knex } from '../db-local';

afterAll(async () => {
  await knex.destroy();
});

describe('insert-data-with-explicit-id', () => {
  it('t1', async () => {
    const data = {
      user_id: undefined,
      user_email: faker.internet.email()
    };
    const user = await insert(data);
    expect(user).toEqual(
      expect.objectContaining({
        user_id: expect.any(Number),
        user_email: expect.any(String)
      })
    );
  });
});
