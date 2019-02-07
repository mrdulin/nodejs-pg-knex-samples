import * as Knex from 'knex';
import path from 'path';
import { loadSQL } from '../../util';

exports.up = async function(knex: Knex): Promise<any> {
  await knex.schema.createTable('employees', (t: Knex.TableBuilder) => {
    t.increments('id');
    t.string('first_name', 40).notNullable();
    t.string('last_name', 40).notNullable();
  });

  await knex.schema.createTable('employee_audits', (t: Knex.TableBuilder) => {
    t.increments('id');
    t.integer('employee_id').notNullable();
    t.string('last_name', 40).notNullable();
    t.timestamp('changed_on').notNullable();
  });

  await knex.raw(loadSQL(path.resolve(__dirname, '../logLastNameChanges.sql')));

  await knex.raw(`
    CREATE TRIGGER last_name_changes
      BEFORE UPDATE
      ON employees
      FOR EACH ROW
      EXECUTE PROCEDURE log_last_name_changes();
  `);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all(['employees', 'employee_audits'].map((tableName: string) => knex.schema.dropTable(tableName)));
};
