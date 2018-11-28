import { getBooksByPage, getBooksRelayStylePageByIdRaw, findByIdRaw, paginateModel } from './';
import { knex } from '../db-local';

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
    const first = 100;
    const firstPage = await getBooksRelayStylePageByIdRaw(first);
    expect(firstPage.pageInfo.hasNextPage).toBeFalsy();
  });
});

describe('findByIdRaw', () => {
  it('t-1', async () => {
    const book = await findByIdRaw('books', 'book_id', 1);
    console.log(book);
    expect(book.book_id).toBe(1);
    expect(book).toEqual(expect.objectContaining({ book_id: expect.any(Number), book_name: expect.any(String) }));
  });
});

describe('paginateModel', () => {
  it('t-1', async () => {
    const firstPage = await paginateModel('books', 'book_id', 10);
    console.log(firstPage);
    expect(firstPage);
  });
});
