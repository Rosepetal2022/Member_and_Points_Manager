-- File for loading some initial data into the database

-- Insert data into members table
-- Existing hash passwords represent the password 'changeme123' for all members
INSERT INTO members (
    first_name, last_name, date_of_birth, email_address, street_address,
    city, us_state, zip_code, phone_number, member_status,
    member_number, hash_password
) VALUES
('Chris', 'Black', '2009-06-12', 'chris.black@fakeemail.com', '2036 Heron Way', 'Portland', 'OR', 97204, '503-284-1937', 'Junior', '770487', '$2b$12$Yr6Ur3BUqgX.9HXgCDgJveXPpn8qOOG3ufkWvM.XNf1vdlNQ7dAt6'),
('Nancy', 'Blue', '1979-03-18', 'nancy.blue@fakeemail.com', '5800 NE Skidmore Street', 'Portland', 'OR', 97218, '206-510-8423', 'Amateur', '216739', '$2b$12$WYxunZJ.5CNKFqY8cdg9tunjciPLMgKftToY6JZvMOXBe5PMqyLiO'),
('Tina', 'Blue', '2008-08-16', 'tina.blue@fakeemail.com', '5800 NE Skidmore Street', 'Portland', 'OR', 97218, '971-636-5508', 'Junior', '12622'5, '$2b$12$/J8ISaFVr5R4s50ciL8Vbe59tA8oUDAcAeXoK60XC28KnlVo5G9Ym'),
('Rebecca', 'Brown', '1989-07-17', 'rebecca.brown@fakeemail.com', '2400 SE 70th Avenue', 'Portland', 'OR', 97206, '425-332-1095', 'Amateur', '129944', '$2b$12$KQ6HZH4oMTQSL28HGP9FJOM4G3gX4BiI3FYYeJ8AKTOnI9buw6b6S'),
('Bob', 'Brown', '2002-12-22', 'bob.brown@fakeemail.com', '2400 SE 70th Avenue', 'Portland', 'OR', 97206, '360-728-1142', 'Amateur', '837370', '$2b$12$4E6RZ9Va2BLjHJl9vtyMs.xe4u0uydxSkRx3WcLZkFo/3.Gs6kG7u'),
('Emily', 'Clark', '1990-06-26', 'emily.clark@fakeemail.com', '1133 17th Avenue', 'Seattle', 'WA', 98059, '503-908-2714', 'Professional', '472593', '$2b$12$UQQhtPiZf6xzGPI0EBl9ZewQs3RZ6fJzJe.JZ0OOBIQDSlkFrSDv6'),
('John', 'Doe', '1996-04-01', 'john.doe@fakeemail.com', '123 Elm Street', 'Seattle', 'WA', 98101, '555-555-5678', 'Professional', '931489', '$2b$12$2uvH3sK1oUOsijKrPhTFXehF3Z2MmpaZhv8YXeTKNW7FGOPtsUjSO'),
('Quinn', 'Gray', '1983-04-09', 'quinn.gray@fakeemail.com', '23900 35th Avenue', 'Monroe', 'WA', 98272, '206-889-7341', 'Amateur', '512690', '$2b$12$kKaEf1iY2y1uNOhPDhlsseJGMjch6vHugBa2VvJY6LMUJCNzS.dCa'),
('Sam', 'Green', '1978-11-25', 'sam.green@fakeemail.com', '11580 SE Mather Road', 'Clackamas', 'OR', 97015, '971-402-6652', 'Professional', '157496', '$2b$12$qcbA7.cwvGbO0rKkRKn4nOnxUSONwV1uxw39sIQtCBreQUkgkXtQi'),
('Laura', 'Green', '1987-05-20', 'laura.green@fakeemail.com', '11580 SE Mather Road', 'Clackamas', 'OR', 97015, '425-219-3880', 'Amateur', '978803', '$2b$12$HMuYox2ZUPt77BBXUmqZkOXKu2ABuzwD4tEDAzW/.cfaM8V13zCj.'),
('Alice', 'Johnson', '1981-12-09', 'alice.johnson@fakeemail.com', '4125 SW Barbur Boulevard', 'Portland', 'OR', 97239, '360-943-0294', 'Professional', '139274', '$2b$12$6Vu.fjECGSFkkRxuAV/g7.LPH2SrVbQZ/I2zCWIdklHuKyFSVcb8e'),
('David', 'Lee', '2007-09-19', 'david.lee@fakeemail.com', '9821 NW Evergreen Parkway', 'Hillsboro', 'OR', 97006, '503-614-8593', 'Junior', '570911', '$2b$12$ErEGvJ2sR0QhzOUJ5cJX8eM.0gOPmQ.8oYuTXw7MyWim78DuO2URa'),
('Linda', 'Orange', '2010-02-28', 'linda.orange@fakeemail.com', '15201 179th Avenue', 'Monroe', 'WA', 98272, '206-715-9420', 'Junior', '867838', '$2b$12$ZhI.dE4h.fj0LDkdhV7kOuJgJzefX3Zs/9IHZ4M3ik6WqroEwPvGa'),
('Sophia', 'Pink', '1998-03-05', 'sophia.pink@fakeemail.com', '14900 NE 132nd Avenue', 'Vancouver', 'WA', 98682, '971-252-3491', 'Amateur', '145053', '$2b$12$4TiRHK6D8eXkykAcRztR1O0efp5WkQKWaBiUXxMJhFWiD.jz0Kx9O'),
('Peter', 'Purple', '1992-09-05', 'peter.purple@fakeemail.com', '1550 East Powell Boulevard', 'Gresham', 'OR', 97030, '425-693-7406', 'Professional', '423372', '$2b$12$lufw0a7y0ISmKZKxnd2b/OEJk3D4g1fyZFi.d/SfnNq.S0GvJgDHi'),
('Uma', 'Red', '1986-07-30', 'uma.red@fakeemail.com', '8472 Taylor Street', 'Portland', 'OR', 97214, '360-587-4448', 'Professional', '962417', '$2b$12$D2AwUtTyEMTt2Q9G6C3Zeu2oCykw3ee4iX1CFmBNOGtRe58VNW0na'),
('Tom', 'Red', '2008-11-03', 'tom.red@fakeemail.com', '8472 Taylor Street', 'Portland', 'OR', 97214, '503-761-1182', 'Junior', '929265', '$2b$12$PIKr3xxov9NQkaYrDBhRXOZ8dzm7FlWaf8QZ7E40s7i5koHx/WmAK'),
('Sally', 'Smith', '1975-02-02', 'sally.smith@fakeemail.com', '1234 Main Street', 'Portland', 'OR', 97321, '206-934-6705', 'Professional', '299985', '$2b$12$yR6vC2tWWIbiybc1oSDwEuDASrfwaV8rrjLhC9zW.LB9Q2r9gcByG'),
('Michael', 'Smith', '1984-08-04', 'michael.smith@fakeemail.com', '1234 Main Street', 'Portland', 'OR', 97321, '971-743-9227', 'Professional', '903326', '$2b$12$ieGZQAGvwWc8O8v5Ao3nGu7yRurZ5.x6t2nmbgtXLCa8TuLoSvVC.'),
('Tom', 'Smith', '2010-09-30', 'tom.smith@fakeemail.com', '1234 Main Street', 'Portland', 'OR', 97321, '425-411-3950', 'Junior', '122841', '$2b$12$6LssMsDtxuDFeHxZbsNaWeUyBbGs71qxW1SpNidVxQhxMAlU9okZW'),
('Jane', 'Smith', '2011-04-15', 'jane.smith@fakeemail.com', '1234 Main Street', 'Portland', 'OR', 97321, '360-227-8623', 'Junior', '361044', '$2b$12$BQYSEBzV/AYrcqGnQphvEewEm3yaJtzhy0hHOpXzqEhu2kKJ4P4Um'),
('Sarah', 'White', '2002-12-22', 'sarah.white@fakeemail.com', '1234 Main Street', 'Portland', 'OR', 97321, '503-472-6284', 'Amateur', '193018', '$2b$12$MSFtOggoBO1gN3Pvn4VtReNby9KrAnedZfU7uOY5L8jE.T9XDxJ3e'),
('Oliver', 'Yellow', '1982-02-14', 'oliver.yellow@fakeemail.com', '9513 Maple Lane', 'Oregon City', 'OR', 97045, '206-848-3721', 'Professional', '839924', '$2b$12$U7vG44rmtJxgdQpHFjX3peM12IS3XhnFCuvka0FgoV2ZCKDLn1Orq'),
('Victor', 'Yellow', '2012-01-05', 'victor.yellow@fakeemail.com', '9513 Maple Lane', 'Oregon City', 'OR', 97045, '971-580-9045', 'Junior', '207509', '$2b$12$TfFbZPptzNHXqb7BIAcASe5nqMb2bf3cnhwblhHedUyeHTceNgvTS');

-- Insert data into horses table
INSERT INTO horses (horse_name, foaled_date, sex, color, hands, horse_size, breed, horse_number)
VALUES ('Cerafina', '2016-04-06', 'Gelding', 'Chestnut', 16.1, 'Horse', 'Arabian Horse', '48219'), 
('Starlight', '2013-04-07', 'Gelding', 'Bay', 16.1, 'Horse', 'Thoroughbred', '13047'), 
('Moonlight', '2019-04-16', 'Mare', 'Gray', 16.2, 'Horse', 'Lipizzan', '95731'), 
('Sunshine', '2011-10-01', 'Gelding', 'Bay', 17.1, 'Horse', 'Holsteiner', '60482'), 
('Twilight','2008-01-01', 'Gelding', 'Gray', 17, 'Horse', 'Irish Draught', '31875'), 
('Aurora', '2016-06-27', 'Gelding', 'Palomino', 16.1, 'Horse', 'American Quarter Horse', '76904'), 
('Galaxy', '2019-04-26', 'Mare', 'Chestnut', 16, 'Horse', 'Trakehner', '25196'), 
('Comet', '2012-02-03', 'Gelding', 'Chestnut', 16, 'Horse', 'Westphalian', '70358'),
('Meteor', '2006-04-25', 'Mare', 'Paint', 16.2, 'Horse', 'American Paint Horse', '89412'),
('Nebula', '2015-01-11', 'Gelding', 'Black', 15.1, 'Horse', 'Oldenburg', '16703'),
('Starburst', '2011-01-01', 'Gelding', 'Roan', 12.2, 'Small Pony', 'Connemara Pony', '54027'),
('Supernova', '2018-04-03', 'Gelding', 'Dun', 16.5, 'Horse', 'Appaloosa', '69284'),
('Star', '2020-03-24', 'Mare', 'Chestnut', 16.2, 'Horse', 'Hanovarian', '10396'),
('Thunder','2017-11-26', 'Gelding', 'Brown', 16, 'Horse', 'Dutch Warmblood', '37915');

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


-- Insert data into horse owners table
INSERT INTO horse_owners (member_id, horse_id, effective_date)
VALUES (
    (SELECT member_id FROM members WHERE first_name = 'Tom' AND last_name = 'Smith'), 
    (SELECT horse_id FROM horses WHERE horse_name = 'Cerafina'), 
    '2022-01-01'),

    (
    (SELECT member_id FROM members WHERE first_name = 'John' AND last_name = 'Doe'), 
    (SELECT horse_id FROM horses WHERE horse_name = 'Starlight'), 
    '2022-02-02'),

    (
    (SELECT member_id FROM members WHERE first_name = 'Alice' AND last_name = 'Johnson'), 
    (SELECT horse_id FROM horses WHERE horse_name = 'Moonlight'), 
    '2022-03-03'),

    (
    (SELECT member_id FROM members WHERE first_name = 'Emily' AND last_name = 'Clark'), 
    (SELECT horse_id FROM horses WHERE horse_name = 'Sunshine'), 
    '2022-04-04'),

    (
    (SELECT member_id FROM members WHERE first_name = 'Michael' AND last_name = 'Smith'), 
    (SELECT horse_id FROM horses WHERE horse_name = 'Twilight'), 
    '2022-05-05'),

    (
    (SELECT member_id FROM members WHERE first_name = 'Laura' AND last_name = 'Green'), 
    (SELECT horse_id FROM horses WHERE horse_name = 'Aurora'), 
    '2022-06-06'),

    (
    (SELECT member_id FROM members WHERE first_name = 'Nancy' AND last_name = 'Blue'), 
    (SELECT horse_id FROM horses WHERE horse_name = 'Galaxy'), 
    '2022-07-07'),

    (
    (SELECT member_id FROM members WHERE first_name = 'Oliver' AND last_name = 'Yellow'), 
    (SELECT horse_id FROM horses WHERE horse_name = 'Comet'), 
    '2022-08-08'),

    (
    (SELECT member_id FROM members WHERE first_name = 'Peter' AND last_name = 'Purple'), 
    (SELECT horse_id FROM horses WHERE horse_name = 'Meteor'), 
    '2022-09-09'),

    (
    (SELECT member_id FROM members WHERE first_name = 'Quinn' AND last_name = 'Gray'), 
    (SELECT horse_id FROM horses WHERE horse_name = 'Nebula'), 
    '2022-10-10'),

    (
    (SELECT member_id FROM members WHERE first_name = 'Sam' AND last_name = 'Green'), 
    (SELECT horse_id FROM horses WHERE horse_name = 'Starburst'), 
    '2022-11-11'),

    (
    (SELECT member_id FROM members WHERE first_name = 'Uma' AND last_name = 'Red'), 
    (SELECT horse_id FROM horses WHERE horse_name = 'Supernova'), 
    '2022-12-12');


-- Insert data into shows table
INSERT INTO shows (season_id, show_name, show_start_date, show_end_date, show_type, show_contact_name, show_contact_phone, show_contact_email, show_venue, show_address, result_status)
VALUES (
    (SELECT season_id FROM seasons WHERE show_year = 2025),
    'Spring Fling','2025-04-01','2025-04-05','Hunter/Jumper','Amanda Brooks','503-555-1829','amanda.brooks@fakeemail.com', 'Evergreen Meadows Equestrian Center','4412 NE Canyon Rd, Hillsboro, OR 97123','Pending'),
(
    (SELECT season_id FROM seasons WHERE show_year = 2025),
    'Jumpstart Jubilee', '2025-02-21', '2025-02-25', 'Jumper Classic', 'Lexi Tran','206-555-4471', 'lexi.tran@fakeemail.com', 'Cedar Hollow Farm', '18210 244th Ave SE, Maple Valley, WA 98038', 'Posted'),
(
    (SELECT season_id FROM seasons WHERE show_year = 2025),
    'Summer Sizzler', '2025-06-04', '2025-06-09', 'Equitation', 'Daniel Kruger', '350-555-9022', 'dan.kruger@fakeemail.com','Summit Hill Equestrian', '13215 Avondale Rd NE, Redmond, WA 98052', 'Pending'),

(
    (SELECT season_id FROM seasons WHERE show_year = 2025),
    'Fall Finale', '2025-09-01', '2025-09-05', 'Hunter Derby', 'Tara Ellison', '541-555-7281', 'tara.ellison@fakeemail.com', 'High Desert Horse Park', '10985 Sage Valley Rd, Redmond, OR 97756', 'Pending'),

(
    (SELECT season_id FROM seasons WHERE show_year = 2025),
    'Winter Wonderland', '2024-12-01', '2024-12-05', 'Hunter/Jumper', 'Laura Meyers', '458-555-3902', 'laura.meyers@fakeemail.com', 'Twin Fir Equestrian Grounds', '5620 Hunter Way, Creswell, OR 97426', 'Posted');


-- Insert Data into Classes table
-- Winter Wonderland Classes
INSERT INTO classes (show_id, division_id, class_name)
VALUES 
((SELECT show_id FROM shows WHERE show_name = 'Winter Wonderland'),
 (SELECT division_id FROM divisions WHERE division_name = 'Junior Hunter'), 'Junior Hunter O/F'),

((SELECT show_id FROM shows WHERE show_name = 'Winter Wonderland'),
 (SELECT division_id FROM divisions WHERE division_name = 'Childrens Equitation'), 'Eq Flat'),

((SELECT show_id FROM shows WHERE show_name = 'Winter Wonderland'),
 (SELECT division_id FROM divisions WHERE division_name = 'Low Childrens Hunter'), 'Low Hunter U/S');

-- Jumpstart Jubilee Classes
INSERT INTO classes (show_id, division_id, class_name)
VALUES 
((SELECT show_id FROM shows WHERE show_name = 'Jumpstart Jubilee'),
 (SELECT division_id FROM divisions WHERE division_name = '.80m Jumper'), '.80m Table II'),

((SELECT show_id FROM shows WHERE show_name = 'Jumpstart Jubilee'),
 (SELECT division_id FROM divisions WHERE division_name = '1.0m Jumper'), '1.0m Power & Speed'),

((SELECT show_id FROM shows WHERE show_name = 'Jumpstart Jubilee'),
 (SELECT division_id FROM divisions WHERE division_name = '.70m Jumper'), '.70m Table IV');

-- Spring Fling Classes
INSERT INTO classes (show_id, division_id, class_name)
VALUES 
((SELECT show_id FROM shows WHERE show_name = 'Spring Fling'),
 (SELECT division_id FROM divisions WHERE division_name = 'Adult Hunter'), 'Adult Hunter O/F'),

((SELECT show_id FROM shows WHERE show_name = 'Spring Fling'),
 (SELECT division_id FROM divisions WHERE division_name = 'Amateur Owner Hunter'), 'AO Hunter U/S'),

((SELECT show_id FROM shows WHERE show_name = 'Spring Fling'),
 (SELECT division_id FROM divisions WHERE division_name = 'Junior Equitation'), 'Junior Eq Flat');


 -- Insert Data into Class Entries Table
 -- Entries for Winter Wonderland
INSERT INTO class_entries (class_id, member_id, horse_id, entry_date)
VALUES
((SELECT class_id FROM classes WHERE class_name = 'Junior Hunter O/F' AND show_id = (SELECT show_id FROM shows WHERE show_name = 'Winter Wonderland')),
 (SELECT member_id FROM members WHERE first_name = 'Tom' AND last_name = 'Smith'),
 (SELECT horse_id FROM horses WHERE horse_name = 'Cerafina'), '2024-11-15'),

((SELECT class_id FROM classes WHERE class_name = 'Eq Flat' AND show_id = (SELECT show_id FROM shows WHERE show_name = 'Winter Wonderland')),
 (SELECT member_id FROM members WHERE first_name = 'David' AND last_name = 'Lee'),
 (SELECT horse_id FROM horses WHERE horse_name = 'Starlight'), '2024-11-16'),

((SELECT class_id FROM classes WHERE class_name = 'Low Hunter U/S' AND show_id = (SELECT show_id FROM shows WHERE show_name = 'Winter Wonderland')),
 (SELECT member_id FROM members WHERE first_name = 'Tina' AND last_name = 'Blue'),
 (SELECT horse_id FROM horses WHERE horse_name = 'Galaxy'), '2024-11-17');

-- Entries for Jumpstart Jubilee
INSERT INTO class_entries (class_id, member_id, horse_id, entry_date)
VALUES
((SELECT class_id FROM classes WHERE class_name = '.80m Table II' AND show_id = (SELECT show_id FROM shows WHERE show_name = 'Jumpstart Jubilee')),
 (SELECT member_id FROM members WHERE first_name = 'Emily' AND last_name = 'Clark'),
 (SELECT horse_id FROM horses WHERE horse_name = 'Sunshine'), '2025-02-10'),

((SELECT class_id FROM classes WHERE class_name = '1.0m Power & Speed' AND show_id = (SELECT show_id FROM shows WHERE show_name = 'Jumpstart Jubilee')),
 (SELECT member_id FROM members WHERE first_name = 'Peter' AND last_name = 'Purple'),
 (SELECT horse_id FROM horses WHERE horse_name = 'Meteor'), '2025-02-11'),

((SELECT class_id FROM classes WHERE class_name = '.70m Table IV' AND show_id = (SELECT show_id FROM shows WHERE show_name = 'Jumpstart Jubilee')),
 (SELECT member_id FROM members WHERE first_name = 'Quinn' AND last_name = 'Gray'),
 (SELECT horse_id FROM horses WHERE horse_name = 'Nebula'), '2025-02-12');

-- Entries for Spring Fling
INSERT INTO class_entries (class_id, member_id, horse_id, entry_date)
VALUES
((SELECT class_id FROM classes WHERE class_name = 'Adult Hunter O/F' AND show_id = (SELECT show_id FROM shows WHERE show_name = 'Spring Fling')),
 (SELECT member_id FROM members WHERE first_name = 'Laura' AND last_name = 'Green'),
 (SELECT horse_id FROM horses WHERE horse_name = 'Aurora'), '2025-03-15'),

((SELECT class_id FROM classes WHERE class_name = 'AO Hunter U/S' AND show_id = (SELECT show_id FROM shows WHERE show_name = 'Spring Fling')),
 (SELECT member_id FROM members WHERE first_name = 'Michael' AND last_name = 'Smith'),
 (SELECT horse_id FROM horses WHERE horse_name = 'Twilight'), '2025-03-16'),

((SELECT class_id FROM classes WHERE class_name = 'Junior Eq Flat' AND show_id = (SELECT show_id FROM shows WHERE show_name = 'Spring Fling')),
 (SELECT member_id FROM members WHERE first_name = 'Jane' AND last_name = 'Smith'),
 (SELECT horse_id FROM horses WHERE horse_name = 'Cerafina'), '2025-03-17');

-- Insert Data into Class Results Table
-- Winter Wonderland Results
INSERT INTO class_results (entry_id, place, points_earned, money_awarded)
VALUES
((SELECT entry_id FROM class_entries
  WHERE horse_id = (SELECT horse_id FROM horses WHERE horse_name = 'Cerafina')
    AND class_id = (SELECT class_id FROM classes WHERE class_name = 'Junior Hunter O/F'
                    AND show_id = (SELECT show_id FROM shows WHERE show_name = 'Winter Wonderland'))),
 1, 10, 0),

((SELECT entry_id FROM class_entries
  WHERE horse_id = (SELECT horse_id FROM horses WHERE horse_name = 'Starlight')),
 2, 8, 0),

((SELECT entry_id FROM class_entries
  WHERE horse_id = (SELECT horse_id FROM horses WHERE horse_name = 'Galaxy')),
 3, 6, 0);

-- Jumpstart Jubilee Results
INSERT INTO class_results (entry_id, place, points_earned, money_awarded)
VALUES
((SELECT entry_id FROM class_entries
  WHERE horse_id = (SELECT horse_id FROM horses WHERE horse_name = 'Sunshine')),
 1, 10, 500.00),

((SELECT entry_id FROM class_entries
  WHERE horse_id = (SELECT horse_id FROM horses WHERE horse_name = 'Meteor')),
 2, 8, 300.00),

((SELECT entry_id FROM class_entries
  WHERE horse_id = (SELECT horse_id FROM horses WHERE horse_name = 'Nebula')),
 3, 6, 150.00);

-- Spring Fling Results
INSERT INTO class_results (entry_id, place, points_earned, money_awarded)
VALUES
((SELECT entry_id FROM class_entries
  WHERE horse_id = (SELECT horse_id FROM horses WHERE horse_name = 'Aurora')),
 1, 10, 0),

((SELECT entry_id FROM class_entries
  WHERE horse_id = (SELECT horse_id FROM horses WHERE horse_name = 'Twilight')),
 2, 8, 0),

((SELECT entry_id FROM class_entries
  WHERE horse_id = (SELECT horse_id FROM horses WHERE horse_name = 'Cerafina')
    AND class_id = (SELECT class_id FROM classes WHERE class_name = 'Junior Eq Flat'
                    AND show_id = (SELECT show_id FROM shows WHERE show_name = 'Spring Fling'))),
 3, 6, 0);