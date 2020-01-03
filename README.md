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

check postgresql database files

```bash
root@f29a16a93352:/# ls /db-data/pgdata/
base	pg_clog       pg_dynshmem  pg_ident.conf  pg_multixact	pg_replslot  pg_snapshots  pg_stat_tmp	pg_tblspc    PG_VERSION  postgresql.auto.conf  postmaster.opts
global	pg_commit_ts  pg_hba.conf  pg_logical	  pg_notify	pg_serial    pg_stat	   pg_subtrans	pg_twophase  pg_xlog	 postgresql.conf       postmaster.pid
```

## pgbench

initialize testing datas

```bash
root@f29a16a93352:/# pgbench -i -s 2 -F 80 -U sampleadmin -d nodejs-pg-knex-samples
NOTICE:  table "pgbench_history" does not exist, skipping
NOTICE:  table "pgbench_tellers" does not exist, skipping
NOTICE:  table "pgbench_accounts" does not exist, skipping
NOTICE:  table "pgbench_branches" does not exist, skipping
creating tables...
100000 of 200000 tuples (50%) done (elapsed 2.29 s, remaining 2.29 s)
200000 of 200000 tuples (100%) done (elapsed 4.90 s, remaining 0.00 s)
vacuum...
set primary keys...
done.
```

## knex workflow

[knex workflow](./src/seed-with-json-data-cli/readme.md)

## references

- http://www.postgresqltutorial.com/
- http://www.postgres.cn/docs/9.6/
- https://github.com/tgriesser/knex
- http://knexjs.org/
