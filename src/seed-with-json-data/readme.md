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
