-- File for loading some initial data into the database

-- Insert data into members table
INSERT INTO members (first_name, last_name, date_of_birth, email_address, street_address, city, us_state, zip_code, phone_number, member_status)
VALUES ('Chris', 'Black', '2009-06-12', 'chris.black@fakeemail.com', '2036 Heron Way', 'Portland', 'OR', 97204, '503-284-1937', 'Junior'),
('Nancy', 'Blue', '1979-03-18', 'nancy.blue@fakeemail.com', '5800 NE Skidmore Street', 'Portland', 'OR', 97218, '206-510-8423', 'Amateur'),
('Tina', 'Blue', '2008-08-16', 'tina.blue@fakeemail.com', '5800 NE Skidmore Street', 'Portland', 'OR', 97218, '971-636-5508', 'Junior'),
('Rebecca', 'Brown', '1989-07-17', 'rebecca.brown@fakeemail.com', '2400 SE 70th Avenue', 'Portland', 'OR', 97206, '425-332-1095', 'Amateur'),
('Bob', 'Brown', '2002-12-22', 'bob.brown@fakeemail.com', '2400 SE 70th Avenue', 'Portland', 'OR', 97206, '360-728-1142', 'Amateur'),
('Emily', 'Clark', '1990-06-26', 'emily.clark@fakeemail.com', '1133 17th Avenue', 'Seattle', 'WA', 98059, '503-908-2714', 'Professional'),
('John', 'Doe', '1996-04-01', 'john.doe@fakeemail.com', '123 Elm Street', 'Seattle', 'WA', 98101, '555-555-5678', 'Professional'),
('Quinn', 'Gray', '1983-04-09', 'quinn.gray@fakeemail.com', '23900 35th Avenue', 'Monroe', 'WA', 98272, '206-889-7341', 'Amateur'),
('Sam', 'Green', '1978-11-25', 'sam.green@fakeemail.com', '11580 SE Mather Road', 'Clackamas', 'OR', 97015, '971-402-6652', 'Professional'),
('Laura', 'Green', '1987-05-20', 'laura.green@fakeemail.com', '11580 SE Mather Road', 'Clackamas', 'OR', 97015, '425-219-3880', 'Amateur'),
('Alice', 'Johnson', '1981-12-09', 'alice.johnson@fakeemail.com', '4125 SW Barbur Boulevard', 'Portland', 'OR', 97239, '360-943-0294', 'Professional'),
('David', 'Lee', '2007-09-19', 'david.lee@fakeemail.com', '9821 NW Evergreen Parkway', 'Hillsboro', 'OR', 97006, '503-614-8593', 'Junior'),
('Linda', 'Orange', '2010-02-28', 'linda.orange@fakeemail.com', '15201 179th Avenue', 'Monroe', 'WA', 98272, '206-715-9420', 'Junior'),
('Sophia', 'Pink', '1998-03-05', 'sophia.pink@fakeemail.com', '14900 NE 132nd Avenue', 'Vancouver', 'WA', 98682, '971-252-3491', 'Amateur'),
('Peter', 'Purple', '1992-09-05', 'peter.purple@fakeemail.com', '1550 East Powell Boulevard', 'Gresham', 'OR', 97030, '425-693-7406', 'Professional'),
('Uma', 'Red', '1986-07-30', 'uma.red@fakeemail.com', '8472 Taylor Street', 'Portland', 'OR', 97214, '360-587-4448', 'Professional'),
('Tom', 'Red', '2008-11-03', 'tom.red@fakeemail.com', '8472 Taylor Street', 'Portland', 'OR', 97214, '503-761-1182', 'Junior'),
('Sally', 'Smith', '1975-02-02', 'sally.smith@fakeemail.com', '1234 Main Street', 'Portland', 'OR', 97321, '206-934-6705', 'Professional'),
('Michael', 'Smith', '1984-08-04', 'michael.smith@fakeemail.com', '1234 Main Street', 'Portland', 'OR', 97321, '971-743-9227', 'Professional'),
('Tom', 'Smith', '2010-09-30', 'tom.smith@fakeemail.com', '1234 Main Street', 'Portland', 'OR', 97321, '425-411-3950', 'Junior'),
('Jane', 'Smith', '2011-04-15', 'jane.smith@fakeemail.com', '1234 Main Street', 'Portland', 'OR', 97321, '360-227-8623', 'Junior' ),
('Sarah', 'White', '2002-12-22', 'sarah.white@fakeemail.com', '1234 Main Street', 'Portland', 'OR', 97321, '503-472-6284', 'Amateur'),
('Oliver', 'Yellow', '1982-02-14', 'oliver.yellow@fakeemail.com', '9513 Maple Lane', 'Oregon City', 'OR', 97045, '206-848-3721', 'Professional'),
('Victor', 'Yellow', '2012-01-05', 'victor.yellow@fakeemail.com', '9513 Maple Lane', 'Oregon City', 'OR', 97045, '971-580-9045', 'Junior');

-- Insert data into horses table
INSERT INTO horses (horse_name, foaled_date, sex, color, hands, horse_size, breed)
VALUES ('Cerafina', '2016-04-06', 'Gelding', 'Chestnut', 16.1, 'Horse', 'Arabian Horse'), 
('Starlight', '2013-04-07', 'Gelding', 'Bay', 16.1, 'Horse', 'Thoroughbred'), 
('Moonlight', '2019-04-16', 'Mare', 'Gray', 16.2, 'Horse', 'Lipizzan'), 
('Sunshine', '2011-10-01', 'Gelding', 'Bay', 17.1, 'Horse', 'Holsteiner'), 
('Twilight','2008-01-01', 'Gelding', 'Gray', 17, 'Horse', 'Irish Draught'), 
('Aurora', '2016-06-27', 'Gelding', 'Palomino', 16.1, 'Horse', 'American Quarter Horse'), 
('Galaxy', '2019-04-26', 'Mare', 'Chestnut', 16, 'Horse', 'Trakehner'), 
('Comet', '2012-02-03', 'Gelding', 'Chestnut', 16, 'Horse', 'Westphalian'),
('Meteor', '2006-04-25', 'Mare', 'Paint', 16.2, 'Horse', 'American Paint Horse'),
('Nebula', '2015-01-11', 'Gelding', 'Black', 15.1, 'Horse', 'Oldenburg'),
('Starburst', '2011-01-01', 'Gelding', 'Roan', 12.2, 'Small Pony', 'Connemara Pony'),
('Supernova', '2018-04-03', 'Gelding', 'Dun', 16.5, 'Horse', 'Appaloosa'),
('Star', '2020-03-24', 'Mare', 'Chestnut', 16.2, 'Horse', 'Hanovarian'),
('Thunder','2017-11-26', 'Gelding', 'Brown', 16, 'Horse', 'Dutch Warmblood');

-- Insert data into divisions table
INSERT INTO divisions (division_name, division_category)
VALUES ('Childrens Equitation', 'Equitation'),
('Childrens Hunter', 'Hunter'),
('Low Childrens Hunter', 'Hunter'),
('Short Stirrup Hunter', 'Hunter'),
('.70m Jumper', 'Jumper'),
('.80m Jumper', 'Jumper'),
('.90m Jumper', 'Jumper'),
('1.0m Jumper', 'Jumper'),
('1.10m Jumper', 'Jumper'),
('1,20m Jumper', 'Jumper'),
('1.30m Jumper', 'Jumper'),
('Junior Equitation', 'Equitation'),
('Junior Hunter', 'Hunter'),
('Adult Equitation', 'Equitation'),
('Adult Hunter', 'Hunter'),
('Low Adult Hunter', 'Hunter'),
('Amateur Owner Hunter', 'Hunter');

-- Insert data into seasons table
INSERT INTO seasons (show_year, season_start_date, season_end_date)
VALUES (2022, '2021-12-01', '2022-11-30'),
(2023, '2022-12-01', '2023-11-30'),
(2024, '2023-12-01', '2024-11-30'),
(2025, '2024-12-01', '2025-11-30'),
(2026, '2025-12-01', '2026-11-30')

-- Insert data into families table
INSERT INTO families (family_name)
VALUES('Blue Family'),
('Brown Family'),
('Green Family'), 
('Red Family'), 
('Smith Family'), 
('Yellow Family')

-- TODO:
-- Insert data into horse owners table
-- Insert data into family members table
-- Insert data into shows table
-- Insert data into classes table
-- Insert data into class results table


