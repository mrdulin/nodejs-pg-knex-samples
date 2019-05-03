import * as Knex from 'knex';

exports.up = async (knex: Knex): Promise<any> => {
  await knex.schema.alterTable('RESULT', (t: Knex.AlterTableBuilder) => {
    t.specificType('clicks_records', 'VARCHAR(255)[]').defaultTo('{}');
  }).raw(`
    ALTER TABLE "RESULT" ADD CONSTRAINT "fixed_size_array"
    CHECK ( array_ndims(clicks_records) = 1 AND array_length(clicks_records, 1) <= 7);
  `);
};

exports.down = async (knex: Knex): Promise<any> => {
  await knex.schema.alterTable('RESULT', (t: Knex.AlterTableBuilder) => {
    t.dropColumn('clicks_records');
  });
};
