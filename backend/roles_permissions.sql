-- File for uploading initial roles and permissions into the database

INSERT INTO roles (role_name, role_description)
VALUES (


)



-- Creating the table for roles -- Update ERD
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50),
    role_description TEXT
);

INSERT INTO permissions (permission_name, permission_description, permission_resource, permission_action)
VALUES 

-- Creating the table for permissions  -- Update ERD
CREATE TABLE permissions (
    permission_id SERIAL PRIMARY KEY,
    permission_name VARCHAR(255),
    permission_description TEXT,
    permission_resource VARCHAR (255),
    permission_action VARCHAR (255)
);

INSERT INTO role_permissions (role_id, permission_id)
VALUES


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