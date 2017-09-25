import { knex } from '../db-heroku';
import { migratorConfig, migratorName } from './migrate-conf';

knex.migrate
  .make(migratorName, migratorConfig)
  .then(() => {
    console.log('make migration success');
  })
  .catch(err => console.error(err));
