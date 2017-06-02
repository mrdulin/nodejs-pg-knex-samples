import { knex } from '../../../../db-dvdrental';
import { findPaymentCustomersByCustomerId, findPaymentCustomersByCustomerIdV2 } from '.';

afterAll(async () => {
  await knex.destroy();
});

describe('findPaymentCustomersByCustomerId', () => {
  it('t1', async () => {
    const id = 2;
    const actualValue = await findPaymentCustomersByCustomerId(id);
    console.log(actualValue);
    // expect().toBe();
  });
});

describe('findPaymentCustomersByCustomerIdV2', () => {
  it('t1', async () => {
    const id = 2;
    const actualValue = await findPaymentCustomersByCustomerIdV2(id);
    console.log(actualValue);
    // expect().toBe();
  });
});

describe('compare two methods', () => {
  it('t1', async () => {
    const id = 2;
    const actualValue1 = await findPaymentCustomersByCustomerIdV2(id);
    const actualValue2 = await findPaymentCustomersByCustomerId(id);
    expect(actualValue1).toEqual(actualValue2);
  });
});
