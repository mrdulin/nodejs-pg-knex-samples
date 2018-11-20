import * as Knex from 'knex';

exports.up = function(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTableIfNotExists('campaign_templates', (t: Knex.TableBuilder) => {
      t.increments('campaign_template_id').primary();
      t.string('campaign_template_name');
    }),

    knex.schema.createTableIfNotExists('locations', (t: Knex.TableBuilder) => {
      t.increments('location_id').primary();
      t.string('location_name');
    }),

    knex.schema.createTableIfNotExists('campaign_templates_locations', (t: Knex.TableBuilder) => {
      t.increments('campaign_templates_location_id').primary();
      t.integer('campaign_template_id')
        .unsigned()
        .references('campaign_templates.campaign_template_id');
      t.integer('location_id')
        .unsigned()
        .references('locations.location_id');
    })
  ]);
};

exports.down = function(knex: Knex): Promise<any> {
  return Promise.all(
    // 注意删除顺序
    ['campaign_templates_locations', 'campaign_templates', 'locations'].map((tableName: string) => {
      return knex.schema.dropTableIfExists(tableName);
    })
  );
};
