#!/bin/bash

npx knex migrate:rollback && npx knex migrate:latest && npx knex seed:run