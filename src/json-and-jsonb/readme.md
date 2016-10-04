# json and jsonb

```bash
odejs-pg-knex-samples=# \d users;
                                         Table "public.users"
      Column       |          Type          |                        Modifiers
-------------------+------------------------+---------------------------------------------------------
 user_id           | integer                | not null default nextval('users_user_id_seq'::regclass)
 user_name         | character varying(255) | not null
 user_email        | character varying(255) | not null
 user_addresses    | json[]                 |
 user_addresses_v2 | json[]                 |
 user_addresses_v3 | json                   |
 user_tags         | character varying(255) | default ''::character varying
 user_tags_v2      | character varying[]    |
Indexes:
    "users_pkey" PRIMARY KEY, btree (user_id)
    "users_user_email_unique" UNIQUE CONSTRAINT, btree (user_email)

```
