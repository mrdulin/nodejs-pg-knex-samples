import * as Knex from 'knex';
import { OrganizationType } from '../types';

const regexp = {
  email: `^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$`
};

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.raw(`
      create table if not exists users (
        user_id serial primary key,
        user_name varchar(50) not null,
        user_email varchar(50) not null
        constraint ck_email check (user_email ~* '${regexp.email}')
      )
    `),

    knex.schema
      .createTable('organizations', (t: Knex.TableBuilder) => {
        t.increments('organization_id');
        t.enum('organization_type', [OrganizationType.CLIENT, OrganizationType.ORG]);
        t.integer('parent_id')
          .references('organization_id')
          .inTable('organizations');
      })
      .raw(`alter table "organizations" add constraint ck_tree_node_id check (parent_id != organization_id)`)
      .raw(
        `alter table "organizations" add constraint ck_org_type check (
          (parent_id is null and organization_type = '${OrganizationType.ORG}')
          or (parent_id is not null and organization_type = '${OrganizationType.CLIENT}')
        ) `
      )
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all(
    ['users', 'organizations'].map((table: string) => knex.raw(`drop table if exists ?? cascade`, [table]))
  );
};
