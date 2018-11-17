import { knex } from '../db';
import { seedConfig } from './seed-conf';

function runSeed() {
  return knex.seed
    .run(seedConfig)
    .then(() => {
      console.log('run seed success');
    })
    .catch(err => console.error(err));
}

export { runSeed };
