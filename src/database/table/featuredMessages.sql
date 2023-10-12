CREATE TABLE IF NOT EXISTS featured_messages (
  id INT NOT NULL,
  message_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT featured_messages_pk PRIMARY KEY (id), 
  CONSTRAINT featured_messages_message_user_u UNIQUE (message_id, user_id)
);