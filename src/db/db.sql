CREATE DATABASE encrypteventsts;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    secret_key VARCHAR(255) NOT NULL
);

CREATE TABLE events(
    event_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    encrypted_event VARCHAR(255) NOT NULL,
    creator_id VARCHAR(255) NOT NULL
);
