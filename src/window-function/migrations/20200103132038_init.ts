import * as Knex from 'knex';

exports.up = function(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable('score', (t: Knex.CreateTableBuilder) => {
    t.increments('id');
    t.string('subject', 32);
    t.string('stu_name', 32);
    t.float('score', 3);
  });
};

exports.down = function(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable('score');
};
