import * as Knex from 'knex';

exports.seed = async function(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex('campaign_templates')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('campaign_templates').insert([
        { campaign_template_id: 1, campaign_template_name: 't-1' },
        { campaign_template_id: 2, campaign_template_name: 't-2' },
        { campaign_template_id: 3, campaign_template_name: 't-3' }
      ]);
    })
    .then(() => knex('locations').del())
    .then(() => {
      return knex('locations').insert([
        { location_id: 1, location_name: 'loc-1 ' },
        { location_id: 2, location_name: 'loc-2 ' }
      ]);
    })
    .then(() => knex('campaign_templates_locations').del())
    .then(() => {
      return knex('campaign_templates_locations').insert([
        { campaign_templates_location_id: 1, campaign_template_id: 1, location_id: 1 },
        { campaign_templates_location_id: 2, campaign_template_id: 1, location_id: 2 },
        { campaign_templates_location_id: 3, campaign_template_id: 2, location_id: 2 }
      ]);
    });
};
