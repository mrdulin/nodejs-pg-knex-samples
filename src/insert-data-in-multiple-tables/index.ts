import _ from 'lodash';
import Knex from 'knex';

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

async function createUserTransaction(data) {
  const user = _.omit(data, ['address']);
  return knex
    .transaction((trx: Knex.Transaction) => {
      knex('addresses')
        .transacting(trx)
        .insert(data.address, 'address_id')
        .get('0')
        .then(addressId => {
          console.log('insert address success. addressId: ', addressId, typeof addressId);
          user.address_id = addressId;
          return knex('users')
            .transacting(trx)
            .insert(user)
            .returning('*');
        })
        .get('0')
        .then(val => {
          console.log('val: ', val);
          console.log('transaction commit');
          trx.commit(val);
        })
        .catch(err => {
          console.log('transaction rollback');
          trx.rollback(err);
        });
    })
    .then(resp => {
      console.log('Transaction complete.');
      return resp;
    })
    .catch(err => {
      // console.error(err);
      console.log('Transaction failed.');
      return Promise.reject(err);
    });
}

export { createUserRaw, createUser, createUserTransaction, createUserWithAddress };
