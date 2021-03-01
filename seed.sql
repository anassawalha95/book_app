DROP TABLE IF EXISTS book;

CREATE TABLE book(
    id SERIAL PRIMARY KEY,
    img_url TEXT,
    title VARCHAR(255),
    author VARCHAR(255),
    description TEXT,
    isbn TEXT,
    book_shelf VARCHAR(255)
)