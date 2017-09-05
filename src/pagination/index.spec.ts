import { getBooksByPage, getBooksRelayStylePageByIdRaw } from './';
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

describe('getBooksRelayStylePageByIdRaw', () => {
  it('t-1', async () => {
    const first = 10;
    const actualValue = await getBooksRelayStylePageByIdRaw(first);
    console.log(actualValue);
    expect(actualValue.count).toBe(100);
    expect(actualValue.edges).toHaveLength(first);
    expect(actualValue.pageInfo.hasNextPage).toBeTruthy();
    expect(actualValue.edges[actualValue.edges.length - 1].cursor).toBe(actualValue.pageInfo.endCursor);
  });

  it('t-2', async () => {
    const first = 10;
    const firstPage = await getBooksRelayStylePageByIdRaw(first);
  });
});
