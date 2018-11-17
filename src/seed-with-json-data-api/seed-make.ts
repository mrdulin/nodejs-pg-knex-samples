import { knex } from '../db';
import { seedName, seedConfig } from './seed-conf';

knex.seed
  .make(seedName, seedConfig)
  .then(() => {
    console.log('make seed success');
  })
  .catch(err => console.error(err));
