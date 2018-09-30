import * as Knex from 'knex';
import faker from 'faker';
import moment from 'moment';

exports.seed = async function(knex: Knex): Promise<any> {
  await knex('USER')
    .del()
    .then(function() {
      return knex('USER').insert([
        { user_id: 1, user_email: faker.internet.email(), user_last_login_at: null },
        { user_id: 2, user_email: faker.internet.email(), user_last_login_at: new Date() },
        {
          user_id: 3,
          user_email: faker.internet.email(),
          user_last_login_at: moment()
            .subtract(23, 'h')
            .subtract(59, 'm')
            .toDate()
        }
      ]);
    });

  await knex('AD')
    .del()
    .then(() => {
      return knex('AD').insert([
        {
          ad_id: 1,
          ad_start_dte: moment()
            .subtract(2, 'days')
            .toDate(),
          ad_end_dte: moment()
            .subtract(22, 'h')
            .toDate()
        },
        {
          ad_id: 2,
          ad_start_dte: moment()
            .subtract(3, 'days')
            .toDate(),
          ad_end_dte: moment()
            .subtract(2, 'days')
            .toDate()
        },
        {
          ad_id: 3,
          ad_start_dte: moment()
            .subtract(1, 'days')
            .toDate(),
          ad_end_dte: moment()
            .subtract(23, 'h')
            .subtract(59, 'm')
            .toDate()
        }
      ]);
    });
};
