DROP DATABASE IF EXISTS social_app;

CREATE DATABASE social_app;

\c social_app

CREATE TABLE IF NOT EXISTS people (
  id serial primary key,
  firstname varchar(25),
  lastname varchar(25),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

INSERT INTO people (firstname, lastname) VALUES ('Cameron', 'Jacoby');
INSERT INTO people (firstname, lastname) VALUES ('Alli', 'Cernoch');
INSERT INTO people (firstname, lastname) VALUES ('Connie', 'Chang');
INSERT INTO people (firstname, lastname) VALUES ('Elie', 'Schoppik');

\d+ people
\q

