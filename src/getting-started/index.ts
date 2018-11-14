import { Client } from 'pg';

const client = new Client({
  host: 'ec2-54-204-40-121.compute-1.amazonaws.com',
  port: 5432,
  user: 'otacrrqnhvxubd',
  password: 'fd33f58e8a039bc5b4abc0deea60f30b3fc531e453fad8aac592a775cc27c7be',
  database: 'delgu0put0dajp',
  ssl: true
});

async function main() {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }

  try {
    const res = await client.query('SELECT $1::text as message', ['Hello world!']);
    console.log(res.rows[0].message);
  } catch (error) {
    console.error(error);
  }

  try {
    await client.end();
  } catch (error) {
    console.error(error);
  }
}

main();
