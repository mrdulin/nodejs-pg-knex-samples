import * as Knex from 'knex';

exports.up = async function(knex: Knex): Promise<any> {
  return knex.schema.createTable('contacts', (t: Knex.TableBuilder) => {
    t.increments('contact_id');
    t.string('contact_nme', 255).nullable();
    t.specificType('contact_phone', 'VARCHAR(32)[]').notNullable();
    t.text('contact_address');
  });
};

exports.down = async function(knex: Knex): Promise<any> {
  return knex.schema.dropTable('contacts');
};
