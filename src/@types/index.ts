import Knex, { Config } from 'knex';

interface ISettings {
  [key: string]: Config;
}

export { ISettings };
