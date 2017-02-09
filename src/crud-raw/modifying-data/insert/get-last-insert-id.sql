INSERT INTO link(url, name, last_update)
VALUES
  ('http://youtube.com', 'Youtube', DEFAULT)
RETURNING id;