COPY persons(first_name, last_name, email)
TO '/Users/ldu020/workspace/nodejs-pg-knex-samples/src/import-and-export-csv-file/persons_partial_db.csv' DELIMITER ',' CSV HEADER;