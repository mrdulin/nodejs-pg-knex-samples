# seed with json data

## create knexfile

```bash
☁  nodejs-pg-knex-samples [master] ⚡  cd src/seed-with-json-data
☁  seed-with-json-data [master] ⚡  npx knex init -x ts
Created ./knexfile.ts
```

## Build the Tables: Knex Migration

```bash
☁  nodejs-pg-knex-samples [master] ⚡  cd src/seed-with-json-data
☁  seed-with-json-data [master] ⚡  npx knex migrate:make merchants_products
Requiring external module ts-node/register
Using environment: development
Created Migration: /Users/ldu020/workspace/nodejs-pg-knex-samples/src/seed-with-json-data/migrations/20181114162934_merchants_products.ts
```

run the migration, use the command:

```bash
☁  seed-with-json-data [master] ⚡  npx knex migrate:latest
Requiring external module ts-node/register
Using environment: development
Batch 1 run: 1 migrations
/Users/ldu020/workspace/nodejs-pg-knex-samples/src/seed-with-json-data/migrations/20181114162934_merchants_products.ts
```

## Connnect heroku PostgreSQL

```bash
☁  seed-with-json-data [master] ⚡  heroku pg:psql postgresql-clean-96108 --app nodejs-pg-knex-samples
--> Connecting to postgresql-clean-96108
psql (9.6.10, server 10.5 (Ubuntu 10.5-2.pgdg14.04+1))
WARNING: psql major version 9.6, server major version 10.
         Some psql features might not work.
SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
Type "help" for help.
```

check `products` and `merchants` tables:

```bash
nodejs-pg-knex-samples::DATABASE=> SELECT * from products;
 id | name | price | merchant_id
----+------+-------+-------------
(0 rows)

nodejs-pg-knex-samples::DATABASE=> SELECT * from merchants;
 id | name
----+------
(0 rows)
```

## Seed Data

```bash
☁  seed-with-json-data [master] ⚡  npx knex seed:make merchants_products --env development
Requiring external module ts-node/register
Using environment: development
Created seed file: /Users/ldu020/workspace/nodejs-pg-knex-samples/src/seed-with-json-data/seeds/merchants_products.ts
```

To run seed files, execute:

```bash
☁  seed-with-json-data [master] npx knex seed:run
Requiring external module ts-node/register
Using environment: development
Ran 1 seed files
/Users/ldu020/workspace/nodejs-pg-knex-samples/src/seed-with-json-data/seeds/merchants_products.ts
```

connect `heroku` `PostgreSQL` service check the seed data

```bash
☁  nodejs-pg-knex-samples [master] ⚡  heroku pg:psql postgresql-clean-96108 --app nodejs-pg-knex-samples
--> Connecting to postgresql-clean-96108
psql (9.6.10, server 10.5 (Ubuntu 10.5-2.pgdg14.04+1))
WARNING: psql major version 9.6, server major version 10.
         Some psql features might not work.
SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
Type "help" for help.

nodejs-pg-knex-samples::DATABASE=> select * from products;
 id |           name           | price | merchant_id
----+--------------------------+-------+-------------
  1 | Sleek Wooden Tuna        |   603 |           8
  2 | Sleek Fresh Fish         |   242 |           7
  3 | Generic Cotton Bike      |   938 |           6
  4 | Fantastic Frozen Chicken |   251 |           9
  5 | Handcrafted Steel Cheese |    88 |          10
(5 rows)

nodejs-pg-knex-samples::DATABASE=> select * from merchants;
 id |            name
----+-----------------------------
  6 | Weimann, Dietrich and Sipes
  7 | Schoen - Ebert
  8 | Kunze and Sons
  9 | Gislason - Carter
 10 | Gutkowski and Sons
(5 rows)

nodejs-pg-knex-samples::DATABASE=>
```
