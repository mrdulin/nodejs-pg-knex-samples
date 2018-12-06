import _ from 'lodash';

import { knex } from '../db-local';

async function createUserRaw(user) {
  const cols = Object.keys(user);
  const values = cols.map(col => user[col]);
  const sql = `
    insert into users (${cols.map(_ => '?').join(',')})
    values
      (${values.map(_ => '?').join(',')})
    on conflict do nothing;
  `;

  return knex.raw(sql, cols.concat(values));
}

async function createUserWithAddress(data) {
  const user = _.omit(data, ['address']);

  return knex('addresses')
    .insert(data.address, 'address_id')
    .get('0')
    .then(addressId => {
      user.address_id = addressId;
      return knex('users')
        .insert(user)
        .returning('*');
    })
    .get('0');
}

/**
 * https://github.com/tgriesser/knex/issues/1121 - 不支持on conflict，即upsert
 * @param data
 */
async function createUser(data) {
  const user = _.omit(data, ['address']);
  delete user.address;
  return knex('users')
    .insert(user, '*')
    .get('0');
}

async function createUserTransaction() {}

export { createUserRaw, createUser, createUserTransaction, createUserWithAddress };
