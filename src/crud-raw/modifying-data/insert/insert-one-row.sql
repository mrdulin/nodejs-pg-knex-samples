INSERT INTO link (url, name)
VALUES
  ('http://github.com', 'GitHub')
ON CONFLICT (url) DO NOTHING;