create table channels (
  channel_id serial primary key,
  channel_nme varchar(50) unique not null
);