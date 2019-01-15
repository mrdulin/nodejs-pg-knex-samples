# migration workflow

## migration

创建 `user` 的 migration 文件

```bash
npx knex migrate:make user
```

生成 migrations 文件夹，包含文件`20190116110352_user.ts`，文件名是"年月日时分秒\_\<name\>", 在该文件写好`DDL`，执行 migration

```bash
npx knex migrate:latest
```

输出

```bash
Requiring external module ts-node/register
Using environment: development
Batch 1 run: 1 migrations
/Users/ldu020/workspace/nodejs-pg-knex-samples/src/migration-workflow/migrations/20190116110352_user.ts
```

表示 migration 成功，查看数据库

```bash
nodejs-pg-knex-samples=# \d
                        List of relations
 Schema |              Name              |   Type   |    Owner
--------+--------------------------------+----------+-------------
 public | USER                           | table    | sampleadmin
 public | USER_user_id_seq               | sequence | sampleadmin
 public | knex_migrations                | table    | sampleadmin
 public | knex_migrations_id_seq         | sequence | sampleadmin
 public | knex_migrations_lock           | table    | sampleadmin
 public | knex_migrations_lock_index_seq | sequence | sampleadmin
(6 rows)
```

查看`knex_migrations`表

```bash
nodejs-pg-knex-samples=# select * from knex_migrations;
 id |          name          | batch |       migration_time
----+------------------------+-------+----------------------------
 15 | 20190116110352_user.ts |     1 | 2019-01-16 03:30:19.764+00
(1 row)
```

包含 migrations 的记录

创建`address`的 migration 文件

```bash
npx knex migrate:make address
```

在`migrations`文件夹下生成了`20190116111134_address.ts`文件，写好`DDL`，再次执行

```bash
npx knex migrate:latest
```

输出

```bash
☁  migration-workflow [master] ⚡  npx knex migrate:latest
Requiring external module ts-node/register
Using environment: development
Batch 2 run: 1 migrations
/Users/ldu020/workspace/nodejs-pg-knex-samples/src/migration-workflow/migrations/20190116111134_address.ts
```

可以看到，只执行了`20190116111134_address.ts`这个 migration 文件，并没有再次执行`20190116110352_user.ts`这个 migration

查看数据库

```bash
nodejs-pg-knex-samples=# \d
                        List of relations
 Schema |              Name              |   Type   |    Owner
--------+--------------------------------+----------+-------------
 public | ADDRESS                        | table    | sampleadmin
 public | ADDRESS_address_id_seq         | sequence | sampleadmin
 public | USER                           | table    | sampleadmin
 public | USER_user_id_seq               | sequence | sampleadmin
 public | knex_migrations                | table    | sampleadmin
 public | knex_migrations_id_seq         | sequence | sampleadmin
 public | knex_migrations_lock           | table    | sampleadmin
 public | knex_migrations_lock_index_seq | sequence | sampleadmin
(8 rows)
```

查看`knex_migrations`表

```bash
nodejs-pg-knex-samples=# select * from knex_migrations;
 id |           name            | batch |       migration_time
----+---------------------------+-------+----------------------------
 15 | 20190116110352_user.ts    |     1 | 2019-01-16 03:30:19.764+00
 16 | 20190116111134_address.ts |     2 | 2019-01-16 03:36:42.321+00
(2 rows)
```

包含了两次 migration 的文件信息，migration 的时间

查看`knex migrate:latest`命令的描述

> Run all migrations that have not yet been run.

执行所有还没有被执行过的 migrations

## rollback

回滚到上一个 migration 版本

```bash
☁  migration-workflow [master] ⚡  npx knex migrate:rollback
Requiring external module ts-node/register
Using environment: development
Batch 2 rolled back: 1 migrations
/Users/ldu020/workspace/nodejs-pg-knex-samples/src/migration-workflow/migrations/20190116111134_address.ts
```

查看数据库

```bash
nodejs-pg-knex-samples=# \d
                        List of relations
 Schema |              Name              |   Type   |    Owner
--------+--------------------------------+----------+-------------
 public | USER                           | table    | sampleadmin
 public | USER_user_id_seq               | sequence | sampleadmin
 public | knex_migrations                | table    | sampleadmin
 public | knex_migrations_id_seq         | sequence | sampleadmin
 public | knex_migrations_lock           | table    | sampleadmin
 public | knex_migrations_lock_index_seq | sequence | sampleadmin
(6 rows)

nodejs-pg-knex-samples=# select * from knex_migrations;
 id |          name          | batch |       migration_time
----+------------------------+-------+----------------------------
 15 | 20190116110352_user.ts |     1 | 2019-01-16 03:30:19.764+00
(1 row)
```

也可以通过`knex migrate:currentVersion`查看当前 migration 的版本

```bash
☁  migration-workflow [master] ⚡  npx knex migrate:currentVersion
Requiring external module ts-node/register
Using environment: development
Current Version: 20190116110352
```

可以看到，此次回滚，将`20190116111134_address.ts`文件定义的 migration 回滚了，migration 版本回滚到了`20190116110352`，版本号是`20190116110352_user.ts`文件的时间戳

我们也可以将`20190116110352_user.ts`定义的 migration 回滚掉，只需再次执行`knex migrate:rollback`

```bash
☁  migration-workflow [master] ⚡  npx knex migrate:rollback
Requiring external module ts-node/register
Using environment: development
Batch 1 rolled back: 1 migrations
/Users/ldu020/workspace/nodejs-pg-knex-samples/src/migration-workflow/migrations/20190116110352_user.ts
```

查看数据库

```bash
nodejs-pg-knex-samples=# \d
                        List of relations
 Schema |              Name              |   Type   |    Owner
--------+--------------------------------+----------+-------------
 public | knex_migrations                | table    | sampleadmin
 public | knex_migrations_id_seq         | sequence | sampleadmin
 public | knex_migrations_lock           | table    | sampleadmin
 public | knex_migrations_lock_index_seq | sequence | sampleadmin
(4 rows)

nodejs-pg-knex-samples=# select * from knex_migrations;
 id | name | batch | migration_time
----+------+-------+----------------
(0 rows)
```

`USER`表没有了，`knex_migrations`表中的 migrations 记录也没有了

查看当前 migration 版本

```bash
☁  migration-workflow [master] ⚡  npx knex migrate:currentVersion
Requiring external module ts-node/register
Using environment: development
Current Version: none
```

**注意:** 执行`knex migrate:rollback`命令，需要保证`migrations`目录下的文件名和`knex_migrations`表中文件名一致，否则，将导致回滚失败。演示：

先执行 migration

```bash
☁  migration-workflow [master] ⚡  npx knex migrate:latest
Requiring external module ts-node/register
Using environment: development
Batch 1 run: 2 migrations
/Users/ldu020/workspace/nodejs-pg-knex-samples/src/migration-workflow/migrations/20190116110352_user.ts
/Users/ldu020/workspace/nodejs-pg-knex-samples/src/migration-workflow/migrations/20190116111134_address.ts
```

查看数据库

```bash
nodejs-pg-knex-samples=# \d
                        List of relations
 Schema |              Name              |   Type   |    Owner
--------+--------------------------------+----------+-------------
 public | ADDRESS                        | table    | sampleadmin
 public | ADDRESS_address_id_seq         | sequence | sampleadmin
 public | USER                           | table    | sampleadmin
 public | USER_user_id_seq               | sequence | sampleadmin
 public | knex_migrations                | table    | sampleadmin
 public | knex_migrations_id_seq         | sequence | sampleadmin
 public | knex_migrations_lock           | table    | sampleadmin
 public | knex_migrations_lock_index_seq | sequence | sampleadmin
(8 rows)

nodejs-pg-knex-samples=# select * from knex_migrations;
 id |           name            | batch |       migration_time
----+---------------------------+-------+----------------------------
 17 | 20190116110352_user.ts    |     1 | 2019-01-16 03:51:38.364+00
 18 | 20190116111134_address.ts |     1 | 2019-01-16 03:51:38.375+00
(2 rows)
```

**修改`20190116111134_address.ts`文件名为`20190116111134_address_bk.ts`**，现在进行回滚

```bash
☁  migration-workflow [master] ⚡  npx knex migrate:rollback
Requiring external module ts-node/register
Using environment: development
Error: The migration directory is corrupt, the following files are missing: 20190116111134_address.ts
    at validateMigrationList (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/knex/lib/migrate/index.js:417:11)
    at PassThroughHandlerContext.finallyHandler (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/bluebird/js/release/finally.js:57:23)
    at PassThroughHandlerContext.tryCatcher (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/bluebird/js/release/util.js:16:23)
    at Promise._settlePromiseFromHandler (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/bluebird/js/release/promise.js:512:31)
    at Promise._settlePromise (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/bluebird/js/release/promise.js:569:18)
    at Promise._settlePromise0 (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/bluebird/js/release/promise.js:614:10)
    at Promise._settlePromises (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/bluebird/js/release/promise.js:694:18)
    at Promise._fulfill (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/bluebird/js/release/promise.js:638:18)
    at PromiseArray._resolve (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/bluebird/js/release/promise_array.js:126:19)
    at PromiseArray._promiseFulfilled (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/bluebird/js/release/promise_array.js:144:14)
    at Promise._settlePromise (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/bluebird/js/release/promise.js:574:26)
    at Promise._settlePromise0 (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/bluebird/js/release/promise.js:614:10)
    at Promise._settlePromises (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/bluebird/js/release/promise.js:694:18)
    at _drainQueueStep (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/bluebird/js/release/async.js:138:12)
    at _drainQueue (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/bluebird/js/release/async.js:131:9)
    at Async._drainQueues (/Users/ldu020/workspace/nodejs-pg-knex-samples/node_modules/bluebird/js/release/async.js:147:5)
```

> The migration directory is corrupt, the following files are missing: 20190116111134_address.ts

 错误信息：migration 目录被干扰，找不到`20190116111134_address.ts`文件

将文件名修改回原来的`20190116111134_address.ts`，再次进行回滚

```bash
☁  migration-workflow [master] ⚡  npx knex migrate:rollback
Requiring external module ts-node/register
Using environment: development
Batch 1 rolled back: 2 migrations
/Users/ldu020/workspace/nodejs-pg-knex-samples/src/migration-workflow/migrations/20190116111134_address.ts
/Users/ldu020/workspace/nodejs-pg-knex-samples/src/migration-workflow/migrations/20190116110352_user.ts
```

查看数据库

```bash
nodejs-pg-knex-samples=# \d
                        List of relations
 Schema |              Name              |   Type   |    Owner
--------+--------------------------------+----------+-------------
 public | knex_migrations                | table    | sampleadmin
 public | knex_migrations_id_seq         | sequence | sampleadmin
 public | knex_migrations_lock           | table    | sampleadmin
 public | knex_migrations_lock_index_seq | sequence | sampleadmin
(4 rows)

nodejs-pg-knex-samples=# select * from knex_migrations;
 id | name | batch | migration_time
----+------+-------+----------------
(0 rows)
```

回滚成功
