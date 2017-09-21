import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async function(knex: Knex): Promise<any> {
  const HEROKU_FREE_MAX_ROWS_NUM: number = 10000;
  const MAX_ROWS_NUM = HEROKU_FREE_MAX_ROWS_NUM - 1000;

  await knex('contacts').del();

  const contacts: any[] = [];
  for (let i = 0; i < MAX_ROWS_NUM; i++) {
    const contact = {
      contact_nme: faker.company.bs(),
      contact_phone: [],
      contact_address: faker.address.streetAddress()
    };
    contacts.push(contact);
  }
  return await knex('contacts').insert(contacts);
};
