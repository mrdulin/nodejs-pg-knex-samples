import { knex } from '../../db';
import { findFirstAddressByUserId, findFirstAddressByUserIdV2, findFirstAddressByUserIdV3 } from '.';

afterAll(async () => {
  await knex.destroy();
});

describe('findFirstAddressByUserId', () => {
  it('t1', async () => {
    const id = 2;
    const actualValue = await findFirstAddressByUserId(id);
    console.log(actualValue);
    expect(actualValue).toEqual(
      expect.objectContaining({
        user_id: id,
        user_name: expect.any(String),
        user_email: expect.any(String),
        street: expect.any(String),
        city: expect.any(String)
      })
    );
  });
});

describe('findFirstAddressByUserIdV2', () => {
  it('t1', async () => {
    const id = 2;
    const actualValue = await findFirstAddressByUserIdV2(id);
    console.log(actualValue);
    expect(actualValue).toEqual(
      expect.objectContaining({
        user_id: id,
        user_name: expect.any(String),
        user_email: expect.any(String),
        street: expect.any(String),
        city: expect.any(String)
      })
    );
  });
});

describe('findFirstAddressByUserIdV3', () => {
  it('t1', async () => {
    const id = 2;
    const actualValue = await findFirstAddressByUserIdV3(id);
    console.log(actualValue);
    expect(actualValue).toEqual(
      expect.objectContaining({
        user_id: id,
        user_name: expect.any(String),
        user_email: expect.any(String),
        street: expect.any(String),
        city: expect.any(String)
      })
    );
  });
});
