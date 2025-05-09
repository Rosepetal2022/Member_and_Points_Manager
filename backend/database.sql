CREATE DATABASE memberpointsmanager;

CREATE TABLE members (
    member_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    date_of_birth DATE,
    email_address VARCHAR(255),
    street_address VARCHAR(255),
    city VARCHAR(255),
    zip_code INT,
    phone_number varchar(255)


);

CREATE TABLE horses (
    horse_id SERIAL PRIMARY KEY,
    horse_name VARCHAR(255),
    foaled_date DATE,
    sex VARCHAR(255),
    color VARCHAR(255),
    hands REAL,
    horse_size VARCHAR(255),
    breed VARCHAR(255) 

);

CREATE TABLE seasons (
    season_id SERIAL PRIMARY KEY,
    season_start_date DATE,
    season_end_date DATE
);

CREATE TABLE shows (
    show_id SERIAL PRIMARY KEY
    season_id SERIAL REFERENCES seasons(season_id),
    show_start_date DATE,
    show_end_date DATE,
    show_type VARCHAR(255),
    show_contact_name VARCHAR(255),
    show_contact_phone VARCHAR(255),
    show_contact_email VARCHAR(255),
    show_location VARCHAR(255),
    result_status VARCHAR(255)
);

CREATE TABLE divisions (
    division_id SERIAL PRIMARY KEY,
    division_name VARCHAR(255)

);

CREATE TABLE classes (
    class_id SERIAL PRIMARY KEY
    division_id SERIAL REFERENCES divisions(division_id),
    show_id SERIAL REFERENCES shows(show_id),
    class_name VARCHAR(255)
);

CREATE TABLE horse_owners (
    owner_id SERIAL PRIMARY KEY,
    member_id SERIAL REFERENCES members(member_id),
    horse_id SERIAL REFERENCES horses(horse_id),
    effective_date DATE
);

CREATE TABLE class_entries (
    entry_id SERIAL PRIMARY KEY,
    member_id SERIAL REFERENCES members(member_id),
    horse_id SERIAL REFERENCES horses(horse_id),
    entry_date DATE
);

CREATE TABLE class_results (
    result_id SERIAL PRIMARY KEY
    entry_id SERIAL REFERENCES class_entries(entry_id)
    place INT,
    points_earned INT,
    money_awarded REAL
);

CREATE TABLE result_disputes (
    dispute_id SERIAL PRIMARY KEY
    result_id SERIAL REFERENCES class_results(result_id)
    point_dispute BOOLEAN,
    place_dispute BOOLEAN,
    award_dispute BOOLEAN,
    rider_comments VARCHAR(255)

);

CREATE TABLE families (
    family_id SERIAL PRIMARY KEY
    family_name VARCHAR(255)
);

CREATE TABLE family_members (
    family_member_id SERIAL PRIMARY KEY
    family_id SERIAL REFERENCES families(family_id),
    member_id SERIAL REFERENCES members(member_id)
);

