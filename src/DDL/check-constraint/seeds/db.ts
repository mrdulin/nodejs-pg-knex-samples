import * as Knex from 'knex';
import faker from 'faker';

import { OrganizationType } from '../types';

exports.seed = async function(knex: Knex): Promise<any> {
  await knex('users')
    .del()
    .then(function() {
      return knex('users').insert([
        { user_id: 1, user_name: faker.name.findName(), user_email: faker.internet.email() },
        { user_id: 2, user_name: faker.name.findName(), user_email: faker.internet.exampleEmail() }
      ]);
    });

  await knex('organizations')
    .del()
    .then(() =>
      knex('organizations').insert([
        { organization_id: 1, parent_id: null, organization_type: OrganizationType.ORG },
        { organization_id: 2, parent_id: 1, organization_type: OrganizationType.CLIENT },
        { organization_id: 3, parent_id: 1, organization_type: OrganizationType.CLIENT }
      ])
    );
};
