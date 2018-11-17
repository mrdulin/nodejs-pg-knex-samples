import path from 'path';
import { MigratorConfig } from 'knex';

const migratorConfig: MigratorConfig = {
  directory: path.resolve(__dirname, './migrations'),
  extension: 'ts'
};

const migratorName = 'merchants_products';

export { migratorConfig, migratorName };
