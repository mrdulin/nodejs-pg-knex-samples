import * as Knex from 'knex';

exports.up = async function(knex: Knex): Promise<any> {
  const createOrganizationTableSQL = `
    create table organizations (
      organization_id serial primary key,
      organization_name varchar (50) unique not null,
      parent_id integer,
      foreign key (parent_id) references organizations (organization_id)
    );
  `;

  const createLocationTableSQL = `
    create table locations (
      location_id serial primary key,
      location_name varchar(50) unique not null,
      organization_id integer,
      foreign key (organization_id) references organizations (organization_id)
    );
  `;

  const createCampaignTableSQL = `
    create table campaigns (
      campaign_id serial primary key,
      campaign_name varchar(50) unique not null,
      location_id integer,
      organization_id integer,
      foreign key (location_id) references locations (location_id),
      foreign key (organization_id) references organizations (organization_id)
    );
  `;

  return Promise.all([
    knex.schema.createTable('employees', (t: Knex.TableBuilder) => {
      t.increments('employee_id')
        .unsigned()
        .primary();
      t.string('employee_full_name');
      t.integer('employee_manager_id')
        .references('employee_id')
        .inTable('employees');
    }),

    knex.raw(createOrganizationTableSQL),
    knex.raw(createLocationTableSQL),
    knex.raw(createCampaignTableSQL)
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all(
    ['employees', 'organizations', 'locations', 'campaigns'].map((t: string) =>
      knex.raw(`drop table if exists ?? cascade`, [t])
    )
  );
};
