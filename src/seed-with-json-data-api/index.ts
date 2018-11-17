import { latestMigrate } from './migrate-run';
import { runSeed } from './seed-run';
import { knex } from '../db';

async function main() {
  await latestMigrate();
  await runSeed();
  await knex.destroy();
}

main();
