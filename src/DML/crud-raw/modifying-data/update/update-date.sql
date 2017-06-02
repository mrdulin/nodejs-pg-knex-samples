UPDATE link
SET last_update = DEFAULT
WHERE 
  last_update IS NULL;