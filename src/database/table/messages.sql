CREATE TABLE IF NOT EXISTS messages (
  id int NOT NULL,
  chat_id int not null,
  user_id int NOT NULL,
  message_type_id int NOT NULL,
  message TEXT NOT NULL,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT messages_pk PRIMARY KEY (id)
)