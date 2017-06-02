import * as Knex from 'knex';
import faker from 'faker';

exports.seed = async function(knex: Knex): Promise<any> {
  return Promise.all([
    knex('employees')
      .del()
      .then(() => {
        const sql = `
        INSERT INTO employees (
          employee_id,
          employee_full_name,
          employee_manager_id
        )
        VALUES
          (1, 'Michael North', NULL),
          (2, 'Megan Berry', 1),
          (3, 'Sarah Berry', 1),
          (4, 'Zoe Black', 1),
          (5, 'Tim James', 1),
          (6, 'Bella Tucker', 2),
          (7, 'Ryan Metcalfe', 2),
          (8, 'Max Mills', 2),
          (9, 'Benjamin Glover', 2),
          (10, 'Carolyn Henderson', 3),
          (11, 'Nicola Kelly', 3),
          (12, 'Alexandra Climo', 3),
          (13, 'Dominic King', 3),
          (14, 'Leonard Gray', 4),
          (15, 'Eric Rampling', 4),
          (16, 'Piers Paige', 7),
          (17, 'Ryan Henderson', 7),
          (18, 'Frank Tucker', 8),
          (19, 'Nathan Ferguson', 8),
          (20, 'Kevin Rampling', 8);
        `;
        return knex.raw(sql).get('rows');
      }),

    knex('organizations')
      .del()
      .then(() => {
        return knex('organizations').insert([
          { organization_id: 1, organization_name: faker.name.findName(), parent_id: null },
          { organization_id: 2, organization_name: faker.name.findName(), parent_id: 1 },
          { organization_id: 3, organization_name: faker.name.findName(), parent_id: 1 },
          { organization_id: 4, organization_name: faker.name.findName(), parent_id: 2 }
        ]);
      })
      .then(() => {
        return knex('locations')
          .del()
          .then(() => {
            return knex('locations').insert([
              { location_id: 1, location_name: faker.name.findName(), organization_id: 2 },
              { location_id: 2, location_name: faker.name.findName(), organization_id: 3 },
              { location_id: 3, location_name: faker.name.findName(), organization_id: 3 },
              { location_id: 4, location_name: faker.name.findName(), organization_id: 4 }
            ]);
          });
      })
      .then(() => {
        return knex('campaigns')
          .del()
          .then(() => {
            return knex('campaigns').insert([
              { campaign_id: 1, campaign_name: faker.name.findName(), location_id: 1, organization_id: null },
              { campaign_id: 2, campaign_name: faker.name.findName(), location_id: 2, organization_id: null },
              { campaign_id: 3, campaign_name: faker.name.findName(), location_id: 2, organization_id: null },
              { campaign_id: 4, campaign_name: faker.name.findName(), location_id: 3, organization_id: null },
              { campaign_id: 5, campaign_name: faker.name.findName(), location_id: 4, organization_id: null }
            ]);
          });
      })
  ]);
};
