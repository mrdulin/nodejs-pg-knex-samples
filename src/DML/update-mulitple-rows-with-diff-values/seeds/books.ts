import * as Knex from 'knex';
import faker from 'faker';
import moment from 'moment';

exports.seed = async function(knex: Knex): Promise<any> {
  return knex('books')
    .del()
    .then(() => {
      return knex('books').insert([
        {
          book_id: 1,
          book_name: faker.name.findName(),
          book_active: true,
          book_new: false,
          book_start_dte: moment().toISOString(),
          book_end_dte: moment()
            .add(1, 'days')
            .toISOString(),
          created_at: moment()
            .subtract(31, 'days')
            .toISOString()
        },
        {
          book_id: 2,
          book_name: faker.name.findName(),
          book_active: true,
          book_new: false,
          book_start_dte: moment().toISOString(),
          book_end_dte: moment()
            .add(1, 'days')
            .toISOString()
        },
        {
          book_id: 3,
          book_name: faker.name.findName(),
          book_active: true,
          book_new: false,
          book_start_dte: moment().toISOString(),
          book_end_dte: moment()
            .subtract(1, 'days')
            .toISOString()
        }
      ]);
    });
};
