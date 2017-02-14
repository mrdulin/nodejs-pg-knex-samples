CREATE TABLE IF NOT EXISTS persons (
  id serial NOT NULL,
  first_name varchar(50),
  last_name varchar(50),
  dob date,
  email varchar(255),
  CONSTRAINT persons_pkey PRIMARY KEY (id)
)