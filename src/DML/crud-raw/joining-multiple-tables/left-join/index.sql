SELECT 
  film.film_id, 
  film.title, 
  inventory_id 
FROM film 
LEFT JOIN inventory ON inventory.film_id = film.film_id
WHERE 
  inventory.film_id IS NULL;