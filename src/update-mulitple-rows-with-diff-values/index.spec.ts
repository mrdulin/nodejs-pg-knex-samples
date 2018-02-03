import { knex } from '../db-local';
import {
  findAndUpdateBooksActive,
  findDurationValidRaw,
  findCreatedValidRaw,
  findValidRaw,
  findAndUpdateBookNewRaw
} from './';

afterAll(async () => {
  await knex.destroy();
});

describe('findAndUpdateBooksActive', () => {
  it('t-1', async () => {
    const rows = await findAndUpdateBooksActive();
    console.log(rows);
    // expect().toBe();
  });
});

describe('findDurationValidRaw', () => {
  it('t-1', async () => {
    const rows = await findDurationValidRaw();
    console.log(rows);
    // expect().toBe();
  });
});

describe('findCreatedValidRaw', () => {
  it('t-1', async () => {
    const rows = await findCreatedValidRaw();
    console.log(rows);
  });
});

describe('findValidRaw', () => {
  it('t-1', async () => {
    const rows = await findValidRaw();
    console.log(rows);
    // expect().toBe();
  });
});

describe('findAndUpdateBookNewRaw', () => {
  it('should set books.book_new to true when duration_valid: true, created_valid: true', async () => {
    const field = 'book_id';
    const value = 2;
    const rows = await findAndUpdateBookNewRaw(field, value);
    const row = rows[0];
    expect(row.book_id).toBe(value);
    expect(row.book_new).toBeTruthy();
  });

  it('should set books.book_active to true when duration_valid: true', async () => {
    const rows = await findAndUpdateBookNewRaw('book_id', 1);
    const row = rows[0];
    expect(row.book_id).toBe(1);
    expect(row.book_active).toBeTruthy();
  });

  it('should set books.book_active to true when duration_valid: false', async () => {
    const rows = await findAndUpdateBookNewRaw('book_id', 3);
    const row = rows[0];
    console.log(row);
    expect(row.book_id).toBe(3);
    expect(row.book_active).toBeFalsy();
  });
});
