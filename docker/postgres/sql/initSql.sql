CREATE TABLE
IF NOT EXISTS todo_table
(
  id SERIAL,
  content text NOT NULL,
  deadline time NOT NULL
);

INSERT INTO todo_table
  (content,deadline)
VALUES
  ('歯磨きをする', '12:00:00');

INSERT INTO todo_table
  (content,deadline)
VALUES
  ('散歩をする', '13:00:00');

INSERT INTO todo_table
  (content,deadline)
VALUES
  ('勉強をする', '14:00:00');