CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  surname VARCHAR(150) NOT NULL,
  phone INT NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_id INT NOT NULL,
  active BOOL NOT NULL DEFAULT TRUE,
  CONSTRAINT users_pk PRIMARY KEY (id),
  CONSTRAINT users_phone_u UNIQUE (phone),
  CONSTRAINT users_email_u UNIQUE (email)
)