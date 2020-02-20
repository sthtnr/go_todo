CREATE TABLE
IF NOT EXISTS todo_table
(
  id SERIAL,
  content text NOT NULL,
  deadline time NOT NULL
);
