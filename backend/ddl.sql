-- This SQL script creates the database schema for the horse show management system

-- Creating the table for members
CREATE TABLE members (
    member_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth DATE,
    email_address VARCHAR(255),
    street_address VARCHAR(255),
    hash_password varchar(255),
    city VARCHAR(50),
    us_state VARCHAR(2),
    zip_code INT,
    phone_number varchar(20),
    member_number VARCHAR(255),
    member_status VARCHAR(50)
);

-- Creating the table for horses
CREATE TABLE horses (
    horse_id SERIAL PRIMARY KEY,
    horse_name VARCHAR(50),
    horse_number VARCHAR(255),
    foaled_date DATE,
    sex VARCHAR(15),
    color VARCHAR(50),
    hands REAL,
    horse_size VARCHAR(255),
    breed VARCHAR(255) 
);

-- Creating the table for seasons
CREATE TABLE seasons (
    season_id SERIAL PRIMARY KEY,
    show_year INT,
    season_start_date DATE,
    season_end_date DATE
);

-- Creating the table for shows
CREATE TABLE shows (
    show_id SERIAL PRIMARY KEY,
    show_name VARCHAR(255),
    season_id SERIAL REFERENCES seasons(season_id),
    show_start_date DATE,
    show_end_date DATE,
    show_type VARCHAR(255),
    show_contact_name VARCHAR(100),
    show_contact_phone VARCHAR(20),
    show_contact_email VARCHAR(50),
    show_venue VARCHAR(255),
    show_address VARCHAR(255),
    result_status VARCHAR(50)
);

-- Creating the table for divisions
CREATE TABLE divisions (
    division_id SERIAL PRIMARY KEY,
    division_name VARCHAR(255),
    division_category VARCHAR(50)
);

-- Creating the table for classes
CREATE TABLE classes (
    class_id SERIAL PRIMARY KEY,
    division_id SERIAL REFERENCES divisions(division_id),
    show_id SERIAL REFERENCES shows(show_id),
    class_name VARCHAR(255)
);

-- Creating the table for horse owners
CREATE TABLE horse_owners (
    owner_id SERIAL PRIMARY KEY,
    member_id SERIAL REFERENCES members(member_id),
    horse_id SERIAL REFERENCES horses(horse_id),
    effective_date DATE
);

-- Creating the table for class entries
CREATE TABLE class_entries (
    entry_id SERIAL PRIMARY KEY,
    class_id SERIAL REFERENCES classes(class_id),
    member_id SERIAL REFERENCES members(member_id),
    horse_id SERIAL REFERENCES horses(horse_id),
    entry_date DATE
);

-- Creating the table for class results
CREATE TABLE class_results (
    result_id SERIAL PRIMARY KEY,
    entry_id SERIAL REFERENCES class_entries(entry_id),
    place INT,
    points_earned INT,
    money_awarded REAL
);

-- Creating the table for result disputes
CREATE TABLE result_disputes (
    dispute_id SERIAL PRIMARY KEY,
    result_id SERIAL REFERENCES class_results(result_id),
    point_dispute BOOLEAN,
    place_dispute BOOLEAN,
    award_dispute BOOLEAN,
    rider_comments VARCHAR(255)
);

-- Creating the table for families
CREATE TABLE families (
    family_id SERIAL PRIMARY KEY,
    family_name VARCHAR(255)
);

-- Creating the table for family members
CREATE TABLE family_members (
    family_member_id SERIAL PRIMARY KEY,
    family_id SERIAL REFERENCES families(family_id),
    member_id SERIAL REFERENCES members(member_id)
);

-- Creating the table for roles -- Update ERD
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50),
    role_description TEXT
);

-- Creating the table for permissions  -- Update ERD
CREATE TABLE permissions (
    permission_id SERIAL PRIMARY KEY,
    permission_name VARCHAR(255),
    permission_description TEXT,
    permission_resource VARCHAR (255),
    permission_action VARCHAR (255)
);

-- Creating the table for role permissions
CREATE TABLE role_permissions(
    role_permission_id SERIAL PRIMARY KEY,
    role_id SERIAL REFERENCES roles(role_id),
    permission_id SERIAL REFERENCES permissions(permission_id)
);

-- Creating the table for user_roles
CREATE TABLE user_roles (
    user_role_id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES members(member_id),
    role_id SERIAL REFERENCES roles(role_id)
);