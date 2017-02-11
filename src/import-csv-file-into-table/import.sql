COPY persons(first_name, last_name, dob, email)
FROM '/Users/ldu020/workspace/nodejs-pg-knex-samples/src/import-csv-file-into-table/persons.csv' DELIMITER ',' CSV HEADER;