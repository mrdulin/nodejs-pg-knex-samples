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
  it('t-1', async () => {
    const rows = await findAndUpdateBookNewRaw();
    console.log(rows);
    // expect().toBe();
  });
});
