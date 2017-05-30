import * as Knex from 'knex';

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
    `)
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all(['users'].map((table: string) => knex.raw(`drop table if exists ??`, [table])));
};
