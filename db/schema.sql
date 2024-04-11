CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    city VARCHAR(255),
    state VARCHAR(255),
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL
);
