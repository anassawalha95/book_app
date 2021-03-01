DROP TABLE IF EXISTS book;

CREATE TABLE book(
    id SERIAL PRIMARY KEY,
    img_url VARCHAR(255),
    title VARCHAR(255),
    author VARCHAR(255),
    description TEXT
)