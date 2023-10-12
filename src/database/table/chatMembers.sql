CREATE TABLE IF NOT EXISTS chat_members (
  id INT NOT NULL,
  chat_id INT NOT NULL,
  user_id INT NOT NULL,
  group_role_id INT NOT NULL,
  CONSTRAINT chat_members_pk PRIMARY KEY (id),
  CONSTRAINT chat_members_chat_user_u UNIQUE (chat_id, user_id)
);