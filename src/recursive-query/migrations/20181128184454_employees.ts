import * as Knex from 'knex';

exports.up = async function(knex: Knex): Promise<any> {
  return knex.schema.createTable('employees', (t: Knex.TableBuilder) => {
    t.increments('employee_id')
      .unsigned()
      .primary();
    t.string('employee_full_name');
    t.integer('employee_manager_id')
      .references('employee_id')
      .inTable('employees');
  });
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all([knex.schema.dropTable('employees')]);
};
