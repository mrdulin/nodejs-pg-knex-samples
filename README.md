# nodejs-pg-knex-samples

Learning PostgreSQL, knex.js by examples.

## Usage

start `pg` docker container

```bash
docker-compose up
```

access docker container

```bash
docker exec -it <Container Id> bash
```

connect `postgres` using `psql`

```bash
psql -U sampleadmin nodejs-pg-knex-samples
```

list all relations

```bahs
nodejs-pg-knex-samples-# \d
                        List of relations
 Schema |              Name              |   Type   |    Owner
--------+--------------------------------+----------+-------------
 public | books                          | table    | sampleadmin
 public | books_book_id_seq              | sequence | sampleadmin
 public | knex_migrations                | table    | sampleadmin
 public | knex_migrations_id_seq         | sequence | sampleadmin
 public | knex_migrations_lock           | table    | sampleadmin
 public | knex_migrations_lock_index_seq | sequence | sampleadmin
(6 rows)
```

run sample

```bash
npx ts-node ./src/<sample>/index.ts
```

## knex workflow

[knex workflow](./src/seed-with-json-data-cli/readme.md)

## references

- http://www.postgresqltutorial.com/
- http://www.postgres.cn/docs/9.6/
