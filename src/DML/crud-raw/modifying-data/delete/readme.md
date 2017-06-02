# delete

delete using `psql`, delete with where clause

```bash
dvdrental=# \i ~/workspace/nodejs-pg-knex-samples/src/crud-raw/modifying-data/delete/delete-with-where-clause.sql
DELETE 1
dvdrental=# select * from link order by id;
 id |        url         |  name   | description |   rel    | last_update
----+--------------------+---------+-------------+----------+-------------
  2 | http://github.com  | GitHub  | GitHub      | nofollow | 2018-11-19
  3 | http://google.com  | Google  | Google      | nofollow | 2013-06-22
  4 | http://twitter.com | Twitter | Twitter     | nofollow | 2018-11-19
  5 | http://google.com  | Google  | Google      | nofollow | 2013-06-22
  6 | http://twitter.com | Twitter | Twitter     | nofollow | 2018-11-19
  7 | http://youtube.com | Youtube | Youtube     | nofollow | 2018-11-19
(6 rows)
```

delete all rows:

```bash
dvdrental=# \i ~/workspace/nodejs-pg-knex-samples/src/crud-raw/modifying-data/delete/delete-all-rows-and-return.sql
 id |        url         |  name   | description |   rel    | last_update
----+--------------------+---------+-------------+----------+-------------
  3 | http://google.com  | Google  | Google      | nofollow | 2013-06-22
  4 | http://twitter.com | Twitter | Twitter     | nofollow | 2018-11-19
  5 | http://google.com  | Google  | Google      | nofollow | 2013-06-22
  6 | http://twitter.com | Twitter | Twitter     | nofollow | 2018-11-19
  7 | http://youtube.com | Youtube | Youtube     | nofollow | 2018-11-19
  2 | http://github.com  | GitHub  | GitHub      | nofollow | 2018-11-19
(6 rows)

DELETE 6
dvdrental=# select * from link order by id;
 id | url | name | description | rel | last_update
----+-----+------+-------------+-----+-------------
(0 rows)
```
