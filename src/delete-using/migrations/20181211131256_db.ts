import * as Knex from 'knex';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema
      .raw(
        `
          create table if not exists users (
            user_id serial primary key,
            user_name text not null
          );
        `
      )
      .then(() => {
        return knex.schema.raw(`
          create table if not exists "books" (
            book_id serial primary key,
            book_name text not null,
            user_id integer references users (user_id) on delete restrict
          );
        `);
      })
      .then(() => {
        return knex.schema.raw(`
          create table if not exists books_tmp (
            book_id serial primary key,
            book_name text not null,
            book_type varchar(50) not null
          )
        `);
      })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.raw(`drop table if exists books;`),
    knex.schema.raw(`drop table if exists users;`),
    knex.schema.raw(`drop table if exists books_tmp;`)
  ]);
};
