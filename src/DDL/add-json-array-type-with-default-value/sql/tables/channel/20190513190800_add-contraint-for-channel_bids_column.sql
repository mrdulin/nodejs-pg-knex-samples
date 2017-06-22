create or replace function json_has_keys(json[], text[]) returns boolean 
$$
  select bool_and(value ?& $2)
  from json_array_elements($1)
$$ language sql;

alter table if exists channels add constraint ck_json_has_keys check (json_has_keys(channel_bids, array['bid']))
