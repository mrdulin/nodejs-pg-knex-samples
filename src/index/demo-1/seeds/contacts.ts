import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async function(knex: Knex): Promise<any> {
  const HEROKU_FREE_MAX_ROWS_NUM: number = 10000;

  return knex('contacts')
    .del()
    .then(function() {
      const contacts: any[] = [];

      for (let i = 0; i++; i < HEROKU_FREE_MAX_ROWS_NUM) {
        const contact = {
          contact_nme: faker.company.bs(),
          contact_phone: [],
          contact_address: faker.address.streetAddress()
        };
        contacts.push(contact);
      }

      return knex('contacts').insert(contacts);
    });
};
