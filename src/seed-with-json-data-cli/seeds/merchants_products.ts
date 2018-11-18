import * as Knex from 'knex';
import Bluebird from 'bluebird';

import { createDatas } from '../data';

exports.seed = async function(knex: Knex): Bluebird<any> {
  const { merchants, products } = createDatas();
  // Deletes ALL existing entries
  return knex('products')
    .del()
    .then(() => {
      return knex('merchants').del();
    })
    .then(() => {
      // Inserts seed entries
      return knex('merchants').insert(merchants);
    })
    .then(() => {
      return Promise.all(
        products.map(product => {
          const merchantName = product.merchant;
          return createProduct(knex, product, merchantName);
        })
      );
    });
};

async function createProduct(knex: Knex, product, merchant: string) {
  return knex('merchants')
    .where('name', merchant)
    .first()
    .then(merchantRecord => {
      return knex('products').insert({
        name: product.name,
        price: product.price,
        merchant_id: merchantRecord.id
      });
    });
}
