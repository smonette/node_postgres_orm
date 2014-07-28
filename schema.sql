DROP DATABASE IF EXISTS social_app;

CREATE DATABASE social_app;

\c social_app

CREATE TABLE IF NOT EXISTS people (
  id serial primary key,
  firstname varchar(25),
  lastname varchar(25),
  twitter varchar(25),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

INSERT INTO people (firstname, lastname, twitter) VALUES ('Cameron', 'Jacoby', 'cejtweets');
INSERT INTO people (firstname, lastname, twitter) VALUES ('Alli', 'Cernoch','msalli');
INSERT INTO people (firstname, lastname, twitter) VALUES ('Connie', 'Chang','conjrc');
INSERT INTO people (firstname, lastname, twitter) VALUES ('Lauren', 'Biron','laurenbiron');

\d+ people
\q

