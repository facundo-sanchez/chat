
-- Chat - ChatTypes
ALTER TABLE chats ADD CONSTRAINT fk_chat_chat_types_id FOREIGN KEY (chat_type_id) REFERENCES chat_types(id)

-- Chat Members
ALTER TABLE chat_members ADD CONSTRAINT fk_chat_members_chat_id FOREIGN KEY (chat_id) REFERENCES chats(id);


ALTER TABLE chat_members ADD CONSTRAINT fk_chat_members_user_id FOREIGN KEY (user_id) REFERENCES users(id)

ALTER TABLE chat_members ADD CONSTRAINT fk_chat_members_group_role_id FOREIGN KEY (group_role_id) REFERENCES group_roles(id)

-- Messages
ALTER TABLE messages ADD CONSTRAINT fk_messages_chat_id FOREIGN KEY (chat_id) REFERENCES chats(id);
ALTER TABLE messages ADD CONSTRAINT fk_messages_user_id FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE messages ADD CONSTRAINT fk_messages_type_id FOREIGN KEY (message_type_id) REFERENCES messages_types(id);

-- FeaturedMessages
ALTER TABLE featured_messages ADD CONSTRAINT fk_featured_messages_id FOREIGN KEY (message_id) REFERENCES messages(id);
ALTER TABLE featured_messages ADD CONSTRAINT fk_featured_messages_user_id FOREIGN KEY (user_id) REFERENCES users(id);

-- User
ALTER TABLE users ADD CONSTRAINT fk_user_password_id FOREIGN KEY (password_id) REFERENCES user_passwords(id);

-- UserPassword
ALTER TABLE user_passwords ADD CONSTRAINT fk_user_passwords_user_id FOREIGN KEY (user_id) REFERENCES users(id);