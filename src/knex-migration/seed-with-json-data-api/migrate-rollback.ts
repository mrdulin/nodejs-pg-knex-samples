import { knex } from '../../db';
import { migratorConfig } from './migrate-conf';

knex.migrate
  .rollback(migratorConfig)
  .then(result => {
    console.log('rollback migration success. result: ', result);
  })
  .catch(err => console.error(err))
  .finally(() => knex.destroy());
