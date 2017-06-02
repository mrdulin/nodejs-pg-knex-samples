alter table if exists channels 
add column if not exists channel_bids json[] not null default (array[
  '{"bid": {"microAmount": 0}, "type": "CpcBid"}', 
  '{"bid": {"microAmount": 0}, "type": "CpmBid"}'
]::json[]);

