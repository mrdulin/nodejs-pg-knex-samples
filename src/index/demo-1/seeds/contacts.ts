import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async function(knex: Knex): Promise<any> {
  const HEROKU_FREE_MAX_ROWS_NUM: number = 10000;
  const MAX_ROWS_NUM = HEROKU_FREE_MAX_ROWS_NUM - 1000;

  await knex('contacts').del();

  const contacts: any[] = [];
  for (let i = 0; i < MAX_ROWS_NUM; i++) {
    const phones: string[] = [];
    for (let j = 0; j < faker.random.number({ max: 5 }); j++) {
      phones.push(faker.phone.phoneNumber());
    }
    const contact = {
      contact_nme: faker.company.bs(),
      contact_phone: phones,
      contact_address: faker.address.streetAddress()
    };
    contacts.push(contact);
  }
  return await knex('contacts').insert(contacts);
};
