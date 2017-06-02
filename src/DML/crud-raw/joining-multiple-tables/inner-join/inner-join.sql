SELECT
  customer.customer_id,
  first_name,
  last_name,
  email,
  amount,
  payment_date
FROM
  customer 
INNER JOIN payment ON payment.customer_id = customer.customer_id 
WHERE
  customer.customer_id = ?;
