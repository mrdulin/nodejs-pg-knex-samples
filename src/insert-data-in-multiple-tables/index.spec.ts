import faker from 'faker';

import { knex } from '../db-local';
import { createUserRaw, createUser, createUserWithAddress, createUserTransaction } from './';

afterAll(async () => {
  await knex.destroy();
});

describe('createUserRaw', () => {
  afterEach(async () => {
    await knex.raw(`delete from users where user_id = ?`, [4]);
  });
  it('should create user correctly without address', async () => {
    const user = { user_id: 4, user_name: faker.name.findName(), address_id: 1 };
    const actualValue = await createUserRaw(user);
    expect(actualValue).toEqual(user);
  });
});

describe.skip('createUser', () => {
  afterEach(async () => {
    await knex('users')
      .where({ user_id: 5 })
      .del();
  });
  it('should create user correctly with address', async () => {
    const user = {
      user_id: 5,
      user_name: faker.name.findName(),
      address: { address_id: 2, address_name: faker.address.city() }
    };
    await expect(createUser(user)).rejects.toThrow('null value in column "address_id" violates not-null constraint');
  });
});

describe.skip('createUserWithAddress', () => {
  afterEach(async () => {
    await knex('users')
      .where({ user_id: 5 })
      .del();
    await knex('addresses')
      .where({ address_id: 2 })
      .del();
  });
  it('should insert user and address correctly', async () => {
    const user = {
      user_id: 5,
      user_name: faker.name.findName(),
      address: { address_id: 2, address_name: faker.address.city() }
    };
    const actualValue = await createUserWithAddress(user);
    expect(actualValue).toEqual({
      user_id: user.user_id,
      user_name: user.user_name,
      address_id: user.address.address_id
    });
  });

  it('should insert user, not insert address when there is an address has the same address_id with insert one', async () => {
    const user = {
      user_id: 3,
      user_name: faker.name.findName(),
      address: {
        address_id: 2,
        address_name: faker.address.city()
      }
    };

    await expect(createUserWithAddress(user)).rejects.toThrow();

    const addressInserted = await knex('addresses')
      .where({ address_id: user.address.address_id })
      .first();

    const userCount = await knex('users')
      .where('user_id', '>', user.user_id)
      .select(knex.raw('count(*)::integer'))
      .get('0')
      .get('count');

    expect(userCount).toBe(0);
    expect(addressInserted).toEqual(user.address);
  });
});

describe.skip('createUserTransaction', () => {
  afterEach(async () => {
    await knex('users')
      .where({ user_id: 4 })
      .del();
    await knex('addresses')
      .where({ address_id: 2 })
      .del();
  });
  it('should not insert user and address when there is an address has the same address_id with insert one', async () => {
    const user = {
      user_id: 3,
      user_name: faker.name.findName(),
      address: {
        address_id: 2,
        address_name: faker.address.city()
      }
    };

    await expect(createUserTransaction(user)).rejects.toThrow(
      /duplicate key value violates unique constraint "users_pkey"/
    );
  });

  it('should insert user and address correctly', async () => {
    const user = {
      user_id: 4,
      user_name: faker.name.findName(),
      address: {
        address_id: 2,
        address_name: faker.address.city()
      }
    };

    const actualValue = await createUserTransaction(user);
    console.log(actualValue);
    expect(actualValue).toEqual({
      user_id: user.user_id,
      user_name: user.user_name,
      address_id: user.address.address_id
    });
  });
});
