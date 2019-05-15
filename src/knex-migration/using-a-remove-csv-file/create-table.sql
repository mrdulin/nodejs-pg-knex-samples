create table if not exists t1_geotargets (
  id serial primary key not null,
  criteria_id varchar(50) not null,
  criteria_name varchar(255) not null,
  canonical_name varchar(255) not null,
  parent_id varchar(50),
  country_code varchar(50) not null,
  target_type varchar(50) not null,
  status varchar(20) not null
)