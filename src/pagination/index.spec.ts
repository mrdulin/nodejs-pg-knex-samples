import { getBooksByPage } from './';
import { knex } from '../db';

afterAll(async () => {
  await knex.destroy();
});

describe('getBooksByPage test suites', () => {
  it('should get first page books correctly', async () => {
    const { count, books } = await getBooksByPage();
    expect(books).toHaveLength(10);
    expect(count).toBe(100);
  });

  it('should get second page books correctly', async () => {
    const pageNo = 1;
    const { count, books } = await getBooksByPage(pageNo);
    expect(books).toHaveLength(10);
    expect(count).toBe(100);
  });
});
