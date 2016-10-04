import { knex } from '../db-local';

async function findFirstAddressByUserId(id: number) {
  const sql = `
    select
      user_id,
      user_name,
      user_email,
      user_addresses[1]->'street' as street,
      user_addresses[1]->'city' as city
    from users
    where user_id = ?
  `;
  return knex
    .raw(sql, [id])
    .get('rows')
    .get(0);
}

async function findFirstAddressByUserIdV2(id: number) {
  const sql = `
    select
      users.user_id,
      users.user_email,
      users.user_name,
      addr#>'{0, street}' as street,
      addr#>'{0, city}' as city
    from users, array_to_json(users.user_addresses) as addr
    where users.user_id = ?;
  `;
  return knex
    .raw(sql, [id])
    .get('rows')
    .get(0);
}

async function findFirstAddressByUserIdV3(id: number) {
  const sql = `
    select
      users.user_id,
      users.user_email,
      users.user_name,
      users.user_addresses_v3#>>'{0, city}' as city,
      users.user_addresses_v3#>>'{0, street}' as street
    from users
    where users.user_id = ?;
  `;
  return knex
    .raw(sql, [id])
    .get('rows')
    .get(0);
}

export { findFirstAddressByUserId, findFirstAddressByUserIdV2, findFirstAddressByUserIdV3 };
