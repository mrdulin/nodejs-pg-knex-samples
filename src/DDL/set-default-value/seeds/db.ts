import * as Knex from 'knex';

exports.seed = async function(knex: Knex): Promise<any> {
  return knex('channels')
    .del()
    .then(function() {
      return knex('channels').insert([{ channel_id: 1 }, { channel_id: 2 }, { channel_id: 3 }]);
    });
};
