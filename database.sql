-- database setup

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (50) NOT NULL,
    "last_name" VARCHAR (50) NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "list" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (200)
);

CREATE TABLE "user_list" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user"(id),
    "list_id" INT REFERENCES "list"(id)
);

CREATE TABLE "location" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (200),
    "city" VARCHAR (100),
    "state" VARCHAR (50),
    "zip" INT,
    "latitude" DECIMAL (8,6),
    "longitude" DECIMAL (9,6)
);

CREATE TABLE "input" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user"(id),
    "list_id" INT REFERENCES "list"(id),
    "location_id" INT REFERENCES "location"(id),
    "rating" VARCHAR (5),
    "comments" VARCHAR (2000)
);

-- test data

-- INSERT INTO "user" ("first_name", "last_name", "username", "password")
-- VALUES ('Pete', 'Stapp', 'petestapp', 'jfjf');

-- INSERT INTO "list" ("name")
-- VALUES ('Favorite Places'), ('Road Trip');

-- INSERT INTO "user_list" ("user_id", "list_id")
-- VALUES (1, 1), (1, 2);

-- INSERT INTO "location" ("name", "city", "state", "zip", "latitude", "longitude")
-- VALUES ('Mattocks Park', 'St. Paul', 'MN', 55105, 44.928927, -93.171873), ('Lyndale Park Rose Garden', 'Minneapolis', 'MN', 55409, 44.927366, -93.296294), ('NCR Trail Entrance', 'Phoenix', 'MD', 21131, 39.519169, -76.619261), ('Downtown Faribault', 'Faribault', 'MN', 55021, 44.294833, -93.268343), ('National Farmer''s Bank', 'Owatonna', 'MN', 55060, 44.084817, -93.225954);

-- INSERT INTO "input" ("user_id", "list_id", "location_id", "rating", "comments")
-- VALUES (1, 1, 1, 'C-', 'Nice park to relax. Not great for pictures'), (1, 1, 2, 'B', 'Beautiful roses in the summer.'), (1, 1, 3, 'A+', 'One of my favorite places!'), (1, 2, 4, 'C', 'Nice but too busy and built up for pictures'), (1, 2, 5, 'B+', 'One of my favorite buildings!');