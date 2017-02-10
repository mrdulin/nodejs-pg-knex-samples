UPDATE link
SET 
  description = 'GitHub is awesome',
  rel = 'follow'
WHERE id = 1
RETURNING *;