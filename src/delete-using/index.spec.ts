import faker from 'faker';

import { knex } from '../db-local';
import { deleteUsingByType, deleteByType } from './';

afterAll(async () => {
  await knex.destroy();
});

describe('deleteUsingByType', () => {
  afterEach(async () => {
    await knex('books').insert({ book_id: 1, book_name: faker.name.findName(), user_id: 1 });
  });
  it('t-1', async () => {
    const type = 'computer';
    const actualValue = await deleteUsingByType(type);
    console.log(actualValue);
    actualValue.forEach(row => {
      expect(row.book_id).toBe(1);
    });
  });
});

describe('deleteByType', () => {
  afterEach(async () => {
    await knex('books').insert({ book_id: 1, book_name: faker.name.findName(), user_id: 1 });
  });
  it('t-1', async () => {
    const type = 'computer';
    const actualValue = await deleteByType(type);
    console.log(actualValue);
    actualValue.forEach(row => {
      expect(row.book_id).toBe(1);
    });
  });
});
