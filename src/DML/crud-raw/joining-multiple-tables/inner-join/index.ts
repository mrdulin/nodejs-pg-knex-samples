import fs from 'fs';
import path from 'path';

import { knex } from '../../../../db-dvdrental';

async function findPaymentCustomersByCustomerId(customerId: number) {
  const sql = fs.readFileSync(path.resolve(__dirname, './inner-join.sql')).toString();
  return knex.raw(sql, [customerId]).get('rows');
}

async function findPaymentCustomersByCustomerIdV2(customerId: number) {
  const sql = `
    SELECT
      customer.customer_id,
      first_name,
      last_name,
      email,
      amount,
      payment_date
    FROM
      customer
    INNER JOIN payment using (customer_id)
    WHERE
      customer.customer_id = ?;
  `;
  return knex.raw(sql, customerId).get('rows');
}

export { findPaymentCustomersByCustomerId, findPaymentCustomersByCustomerIdV2 };
