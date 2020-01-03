# nodejs-pg-knex-samples

Learning PostgreSQL, knex.js by examples.

## Usage

```txt
SQL_HOST=127.0.0.1
SQL_DATABASE=nodejs-pg-knex-samples
SQL_USER=sampleadmin
SQL_PORT=5431
SQL_PASSWORD=sampleadmin
SQL_SSL=false
```

start `pg` docker container

```bash
docker-compose up -d
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

Test example:

```bash
cd src/window-function
```

create migration files

```bash
☁  window-function [master] ⚡  npx knex migrate:make init --knexfile ./knexfile.ts
```

create seed files

```bash
☁  window-function [master] ⚡  npx knex seed:make initialize_db --knexfile ./knexfile.ts -x ts
```

migrate database

```bash
window-function [master] ⚡  npx knex migrate:latest
```

seed database

```bash
☁  window-function [master] ⚡  npx knex seed:run
```

## knex workflow

[knex workflow](./src/seed-with-json-data-cli/readme.md)

## references

- http://www.postgresqltutorial.com/
- http://www.postgres.cn/docs/9.6/
- https://github.com/tgriesser/knex
- http://knexjs.org/
