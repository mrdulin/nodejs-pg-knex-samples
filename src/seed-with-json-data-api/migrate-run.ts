import { knex } from '../db-heroku';
import { migratorConfig } from './migrate-conf';

function latestMigrate() {
  return knex.migrate
    .latest(migratorConfig)
    .then(result => {
      console.log('run migration success. result: ', result);
    })
    .catch(err => console.error(err));
}

export { latestMigrate };
