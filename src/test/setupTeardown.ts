import { pool } from "../db/db"
export const setup = () => {
    pool.query("DROP TABLE users CASCADE")
    pool.query("DROP TABLE events CASCADE")
    pool.query("DROP TABLE user_event")
    
    pool.query(`
        CREATE TABLE users(
            user_id uuid PRIMARY KEY DEFAULT
            uuid_generate_v4(),
            user_name VARCHAR(255) NOT NULL,
            user_password VARCHAR(255) NOT NULL,
            secret_key VARCHAR(255) NOT NULL
        );`)

    pool.query(`CREATE TABLE events(
        event_id uuid PRIMARY KEY DEFAULT
        uuid_generate_v4(),
        encrypted_event VARCHAR(255) NOT NULL,
        creator_id VARCHAR(255) NOT NULL
    );`)

    pool.query(`CREATE TABLE user_event (
        user_id uuid REFERENCES "users" (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
        event_id uuid REFERENCES "events" (event_id) ON UPDATE CASCADE,
        creator boolean NOT NULL,
        CONSTRAINT user_event_pkey PRIMARY KEY (event_id, user_id)
    );`)
}

export const teardown = () => {
    pool.query("DROP TABLE users CASCADE")
    pool.query("DROP TABLE events CASCADE")
    pool.query("DROP TABLE user_event")

}