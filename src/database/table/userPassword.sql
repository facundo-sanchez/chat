CREATE TABLE IF NOT EXISTS user_passwords (
  id INT NOT NULL,
  user_id INT NOT NULL,
  password VARCHAR(255) NOT NULL,
  date DATETIME not null DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT user_passwords_pk PRIMARY KEY (id)
)