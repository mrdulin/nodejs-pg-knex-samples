import Knex from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'ec2-54-204-40-121.compute-1.amazonaws.com',
    port: 5432,
    database: 'delgu0put0dajp',
    user: 'otacrrqnhvxubd',
    password: 'fd33f58e8a039bc5b4abc0deea60f30b3fc531e453fad8aac592a775cc27c7be',
    ssl: true
  },
  debug: true
};
const knex = Knex(config);

export { knex };
