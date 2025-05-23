require('dotenv').config();

const { PORT } = require("./config.js");
const express = require("express");
const app = express();
const cors = require('cors');  
const bcrypt = require('bcrypt');
// const pool = require("./db");

const jwt = require('jsonwebtoken');

// testing database
// const users = [{name: 'oyama'}, {name:'rachel'}, {name:'tessa'}]
const users = []

// const pool = require("./database.sql");

app.use(express.json());
app.use(cors());

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(200).send('Entering member and points manager')
})

app.get('/testUsers', authenticateToken, (req,res)=>{
    res.json(users)
})

app.post('/newUser', async (req, res)=>{
    try {
        const salt = await  bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        console.log(salt);
        console.log(hashPassword);
        const user = {name: req.body.name, password: hashPassword};
        users.push(user); // will create new record in database
        res.status(201).send(); // new record created
    } catch {
        res.status(500); // error during the send up of the new user
    }
})

app.post('/login', async (req, res)=>{
    const user = users.find(user=> user.name === req.body.name)
    // possible connection based on below query calls 
    // const user = await pool.query('SELECT member_id, name, password from Users where name = $1', [req.body.name])
    if (user ==null){ // user.rows.length ===0{
        return res.status(400).send('Cannot find user for horses :(')
    }
    // connect to database to get password and compare database password to passed in pwd
    try {
       if  (await bcrypt.compare(req.body.password, user.password)){
        // res.send('Success')
        const currentUser = {name: user};
        // const permission = await pool.query('Select permissions from permissions where member_id = $1',
        //if (permission == 'USER')
        const accessToken = jwt.sign(currentUser, process.env.ACCESS_TOKEN_SECRET);
        res.json({accessToken: accessToken});
        // else if (permission == 'ADMIN')
        // const accessToken = jwt.sign(currentUser, process.env.ACCESS_TOKEN_SECRET_ADMIN);
        // res.json({accessToken: accessToken});
       } else {
        res.send('Not allowed')
       }
    } catch {
        res.status(500).send('Login failed for user' + req.body.name)
    }
})

app.listen(PORT,()=>{
    console.log(`Server is spinning on port: ${PORT}`);
})


// athentication -- testing for conditional checking for access to paths
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if (err) return res.sendStatus(403); // not valid
        req.user = user;
        next();
    });
}


// CRUD for Members

// Create a member
app.post('/members', async (request, response) => {
    try {
        const { first_name, last_name, date_of_birth, email_address, street_address, city, zip_code, phone_number, member_status} = request.body;
        const newMember = await pool.query(
            "INSERT INTO members (first_name, last_name, date_of_birth, email_address, street_address, city, zip_code, phone_number, member_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [first_name, last_name, date_of_birth, email_address, street_address, city, zip_code, phone_number, member_status]
        );
        response.json(newMember.rows[0]);
        return response.status(201).json({ message: 'Member created', member: newMember.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error creating member' });
    }
    
});

// Display a member
app.get('/members/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const member = await pool.query("SELECT * FROM members WHERE member_id = $1", [id]);
        if (member.rows.length === 0) {
            return response.status(404).json({ message: 'Member not found' });
        }
        return response.json(member.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error fetching member' });
    }
});

// Update a member
app.patch('/members/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { first_name, last_name, date_of_birth, email_address, street_address, city, zip_code, phone_number, member_status } = request.body;
        const updatedMember = await pool.query(
            "UPDATE members SET first_name = $1, last_name = $2, date_of_birth = $3, email_address = $4, street_address = $5, city = $6, zip_code = $7, phone_number = $8, member_status = $9, WHERE member_id = $10 RETURNING *",
            [first_name, last_name, date_of_birth, email_address, street_address, city, zip_code, phone_number, member_status, id]
        );
        if (updatedMember.rows.length === 0) {
            return response.status(404).json({ message: 'Member not found' });
        }
        return response.json(updatedMember.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error updating member' });
    }
});

// Delete a member
app.delete('/members/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedMember = await pool.query("DELETE FROM members WHERE member_id = $1 RETURNING *", [id]);
        if (deletedMember.rows.length === 0) {
            return response.status(404).json({ message: 'Member not found' });
        }
        return response.json({ message: 'Member deleted', member: deletedMember.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error deleting member' });
    }
});

// CRUD for horses

// Create a horse
app.post('/horses', async (request, response) => {
    try {
        const { horse_name, foaled_date, sex, color, hands, horse_size, breed} = request.body;
        const newHorse = await pool.query(
            "INSERT INTO horses (horse_name, foaled_date, sex, color, hands, horse_size, breed) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [horse_name, foaled_date, sex, color, hands, horse_size, breed]
        );
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error creating horse' });
    }
});

// Display a horse
app.get('/horses/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const horse = await pool.query("SELECT * FROM horses WHERE horse_id = $1", [id]);
        if (horse.rows.length === 0) {
            return response.status(404).json({ message: 'Horse not found' });
        }
        return response.json(horse.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error fetching horse' });
    }
});

// Update a horse
app.patch('/horses/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { horse_name, foaled_date, sex, color, hands, horse_size, breed} = request.body;
        const updatedHorse = await pool.query(
            "UPDATE horses SET horse_name = $1, foaled_date = $2, sex = $3, color = $4, hands = $5, horse_size = $6, breed = $7 WHERE horse_id = $8 RETURNING *",
            [horse_name, foaled_date, sex, color, hands, horse_size, breed, id]
        );
        if (updatedHorse.rows.length === 0) {
            return response.status(404).json({ message: 'Horse not found' });
        }
        return response.json(updatedHorse.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error updating horse' });
    }
});

// Delete a horse
app.delete('/horses/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedHorse = await pool.query("DELETE FROM horses WHERE horse_id = $1 RETURNING *", [id]);
        if (deletedHorse.rows.length === 0) {
            return response.status(404).json({ message: 'Horse not found' });
        }
        return response.json({ message: 'Horse deleted', horse: deletedHorse.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error deleting horse' });
    }
});

// CRUD for seasons

// Create a season

app.post('/seasons', async (request, response) => {
    try {
        const { season_name, start_date, end_date } = request.body;
        const newSeason = await pool.query(
            "INSERT INTO seasons (season_name, start_date, end_date) VALUES ($1, $2, $3) RETURNING *",
            [season_name, start_date, end_date]
        );
        response.json(newSeason.rows[0]);
        return response.status(201).json({ message: 'Season created', season: newSeason.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error creating season' });
    }
    
});

// Display a season
app.get('/seasons/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const season = await pool.query("SELECT * FROM seasons WHERE season_id = $1", [id]);
        if (season.rows.length === 0) {
            return response.status(404).json({ message: 'Season not found' });
        }
        return response.json(season.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error fetching season' });
    }
});

// Update a season
app.patch('/seasons/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { season_name, start_date, end_date } = request.body;
        const updatedSeason = await pool.query(
            "UPDATE seasons SET season_name = $1, start_date = $2, end_date = $3 WHERE season_id = $4 RETURNING *",
            [season_name, start_date, end_date, id]
        );
        if (updatedSeason.rows.length === 0) {
            return response.status(404).json({ message: 'Season not found' });
        }
        return response.json(updatedSeason.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error updating season' });
    }
});

// Delete a season
app.delete('/seasons/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedSeason = await pool.query("DELETE FROM seasons WHERE season_id = $1 RETURNING *", [id]);
        if (deletedSeason.rows.length === 0) {
            return response.status(404).json({ message: 'Season not found' });
        }
        return response.json({ message: 'Season deleted', season: deletedSeason.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error deleting season' });
    }
});

// CRUD for divisions

// Create a division
app.post('/divisions', async (request, response) => {
    try {
        const { division_name, season_id } = request.body;
        const newDivision = await pool.query(
            "INSERT INTO divisions (division_name, season_id) VALUES ($1, $2) RETURNING *",
            [division_name, season_id]
        );
        response.json(newDivision.rows[0]);
        return response.status(201).json({ message: 'Division created', division: newDivision.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error creating division' });
    }
    
});

// Display a division
app.get('/divisions/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const division = await pool.query("SELECT * FROM divisions WHERE division_id = $1", [id]);
        if (division.rows.length === 0) {
            return response.status(404).json({ message: 'Division not found' });
        }
        return response.json(division.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error fetching division' });
    }
});

// Update a division
app.patch('/divisions/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { division_name, season_id } = request.body;
        const updatedDivision = await pool.query(
            "UPDATE divisions SET division_name = $1, season_id = $2 WHERE division_id = $3 RETURNING *",
            [division_name, season_id, id]
        );
        if (updatedDivision.rows.length === 0) {
            return response.status(404).json({ message: 'Division not found' });
        }
        return response.json(updatedDivision.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error updating division' });
    }
});

// Delete a division
app.delete('/divisions/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedDivision = await pool.query("DELETE FROM divisions WHERE division_id = $1 RETURNING *", [id]);
        if (deletedDivision.rows.length === 0) {
            return response.status(404).json({ message: 'Division not found' });
        }
        return response.json({ message: 'Division deleted', division: deletedDivision.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error deleting division' });
    }
});

// CRUD for families

// Create a family
app.post('/families', async (request, response) => {
    try {
        const { family_name } = request.body;
        const newFamily = await pool.query(
            "INSERT INTO families (family_name) VALUES ($1) RETURNING *",
            [family_name]
        );
        response.json(newFamily.rows[0]);
        return response.status(201).json({ message: 'Family created', family: newFamily.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error creating family' });
    } 
});

// Display a family
app.get('/families/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const family = await pool.query("SELECT * FROM families WHERE family_id = $1", [id]);
        if (family.rows.length === 0) {
            return response.status(404).json({ message: 'Family not found' });
        }
        return response.json(family.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error fetching family' });
    }
});

// Update a family
app.patch('/families/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { family_name } = request.body;
        const updatedFamily = await pool.query(
            "UPDATE families SET family_name = $1 WHERE family_id = $2 RETURNING *",
            [family_name, id]
        );
        if (updatedFamily.rows.length === 0) {
            return response.status(404).json({ message: 'Family not found' });
        }
        return response.json(updatedFamily.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error updating family' });
    }
});

// Delete a family
app.delete('/families/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedFamily = await pool.query("DELETE FROM families WHERE family_id = $1 RETURNING *", [id]);
        if (deletedFamily.rows.length === 0) {
            return response.status(404).json({ message: 'Family not found' });
        }
        return response.json({ message: 'Family deleted', family: deletedFamily.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error deleting family' });
    }
});


// CRUD for horse owners

// Create a horse owner
app.post('/horseOwners', async (request, response) => {
    try {
        const { horse_id, member_id } = request.body;
        const newHorseOwner = await pool.query(
            "INSERT INTO horse_owners (horse_id, member_id, effective_date) VALUES ($1, $2, $3) RETURNING *",
            [horse_id, member_id, effective_date]
        );
        response.json(newHorseOwner.rows[0]);
        return response.status(201).json({ message: 'Horse owner created', horseOwner: newHorseOwner.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error creating horse owner' });
    }
    
});

// Display a horse owner
app.get('/horseOwners/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const horseOwner = await pool.query("SELECT * FROM horse_owners WHERE horse_owner_id = $1", [id]);
        if (horseOwner.rows.length === 0) {
            return response.status(404).json({ message: 'Horse owner not found' });
        }
        return response.json(horseOwner.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error fetching horse owner' });
    }
});

// Update a horse owner
app.patch('/horseOwners/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { horse_id, member_id, effective_date } = request.body;
        const updatedHorseOwner = await pool.query(
            "UPDATE horse_owners SET horse_id = $1, member_id = $2, effective_date = $3 WHERE horse_owner_id = $4 RETURNING *",
            [horse_id, member_id, effective_date, id]
        );
        if (updatedHorseOwner.rows.length === 0) {
            return response.status(404).json({ message: 'Horse owner not found' });
        }
        return response.json(updatedHorseOwner.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error updating horse owner' });
    }
});

// Delete a horse owner
app.delete('/horseOwners/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedHorseOwner = await pool.query("DELETE FROM horse_owners WHERE horse_owner_id = $1 RETURNING *", [id]);
        if (deletedHorseOwner.rows.length === 0) {
            return response.status(404).json({ message: 'Horse owner not found' });
        }
        return response.json({ message: 'Horse owner deleted', horseOwner: deletedHorseOwner.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error deleting horse owner' });
    }
});


// CRUD for shows

// Create a show
app.post('/shows', async (request, response) => {
    try {
        const { season_id, show_name, show_start_date, show_end_date, show_type, show_contact_name, show_contact_phone, show_contact_email, show_venue, show_address, result_status } = request.body;
        const newShow = await pool.query(
            "INSERT INTO shows (season_id, show_name, show_start_date, show_end_date, show_type, show_contact_name, show_contact_phone, show_contact_email, show_venue, show_address, result_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
            [season_id, show_name, show_start_date, show_end_date, show_type, show_contact_name, show_contact_phone, show_contact_email, show_venue, show_address, result_status]
        );
        response.json(newShow.rows[0]);
        return response.status(201).json({ message: 'Show created', show: newShow.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error creating show' });
    }
    
});

// Display a show
app.get('/shows/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const show = await pool.query("SELECT * FROM shows WHERE show_id = $1", [id]);
        if (show.rows.length === 0) {
            return response.status(404).json({ message: 'Show not found' });
        }
        return response.json(show.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error fetching show' });
    }
});

// Update a show
app.patch('/shows/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { season_id, show_name, show_start_date, show_end_date, show_type, show_contact_name, show_contact_phone, show_contact_email, show_venue, show_address, result_status } = request.body;
        const updatedShow = await pool.query(
            "UPDATE shows SET season_id = $1, show_name = $2, show_start_date = $3, show_end_date = $4, show_type = $5, show_contact_name = $6, show_contact_phone = $7, show_contact_email = $8, show_venue = $9, show_address = $10, result_status = $11 WHERE show_id = $12 RETURNING *",
            [season_id, show_name, show_start_date, show_end_date, show_type, show_contact_name, show_contact_phone, show_contact_email, show_venue, show_address, result_status]
        );
        if (updatedShow.rows.length === 0) {
            return response.status(404).json({ message: 'Show not found' });
        }
        return response.json(updatedShow.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error updating show' });
    }
});

// Delete a show
app.delete('/shows/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedShow = await pool.query("DELETE FROM shows WHERE show_id = $1 RETURNING *", [id]);
        if (deletedShow.rows.length === 0) {
            return response.status(404).json({ message: 'Show not found' });
        }
        return response.json({ message: 'Show deleted', show: deletedShow.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error deleting show' });
    }
});

// CRUD for classes

// Create a class
app.post('/classes', async (request, response) => {
    try {
        const {show_id, division_id, class_name} = request.body;
        const newClass = await pool.query(
            "INSERT INTO classes (show_id, division_id, class_name) VALUES ($1, $2, $3) RETURNING *",
            [show_id, division_id, class_name]
        );
        response.json(newClass.rows[0]);
        return response.status(201).json({ message: 'Class created', class: newClass.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error creating class' });
    }
    
});

// Display a class
app.get('/classes/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const class = await pool.query("SELECT * FROM classes WHERE class_id = $1", [id]);
        if (class.rows.length === 0) {
            return response.status(404).json({ message: 'Class not found' });
        }
        return response.json(class.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error fetching class' });
    }
});

// Update a class
app.patch('/classes/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { show_id, division_id, class_name } = request.body;
        const updatedClass = await pool.query(
            "UPDATE classes SET show_id = $1, division_id = $2, class_name = $3 WHERE class_id = $4 RETURNING *",
            [show_id, division_id, class_name, id]
        );
        if (updatedClass.rows.length === 0) {
            return response.status(404).json({ message: 'Class not found' });
        }
        return response.json(updatedClass.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error updating class' });
    }
});

// Delete a class
app.delete('/classes/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedClass = await pool.query("DELETE FROM classes WHERE class_id = $1 RETURNING *", [id]);
        if (deletedClass.rows.length === 0) {
            return response.status(404).json({ message: 'Class not found' });
        }
        return response.json({ message: 'Class deleted', class: deletedClass.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error deleting class' });
    }
});

// CRUD for class entries

// Create a class entry
app.post('/classEntries', async (request, response) => {
    try {
        const { class_id, horse_id, member_id, entry_date } = request.body;
        const newClassEntry = await pool.query(
            "INSERT INTO class_entries (class_id, horse_id, member_id, entry_date) VALUES ($1, $2, $3, $4) RETURNING *",
            [class_id, horse_id, member_id, entry_date]
        );
        response.json(newClassEntry.rows[0]);
        return response.status(201).json({ message: 'Class entry created', classEntry: newClassEntry.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error creating class entry' });
    }
    
});

// Display a class entry
app.get('/classEntries/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const classEntry = await pool.query("SELECT * FROM class_entries WHERE entry_id = $1", [id]);
        if (classEntry.rows.length === 0) {
            return response.status(404).json({ message: 'Class entry not found' });
        }
        return response.json(classEntry.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error fetching class entry' });
    }
});

// Update a class entry
app.patch('/classEntries/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { class_id, horse_id, member_id, entry_date } = request.body;
        const updatedClassEntry = await pool.query(
            "UPDATE class_entries SET class_id = $1, horse_id = $2, member_id = $3, entry_date = $4 WHERE entry_id = $5 RETURNING *",
            [class_id, horse_id, member_id, entry_date, id]
        );
        if (updatedClassEntry.rows.length === 0) {
            return response.status(404).json({ message: 'Class entry not found' });
        }
        return response.json(updatedClassEntry.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error updating class entry' });
    }
});

// Delete a class entry
app.delete('/classEntries/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedClassEntry = await pool.query("DELETE FROM class_entries WHERE entry_id = $1 RETURNING *", [id]);
        if (deletedClassEntry.rows.length === 0) {
            return response.status(404).json({ message: 'Class entry not found' });
        }
        return response.json({ message: 'Class entry deleted', classEntry: deletedClassEntry.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error deleting class entry' });
    }
});


// CRUD for class results

// Create a class result
app.post('/classResults', async (request, response) => {
    try {
        const { entry_id, place, points_earned, money_awarded } = request.body;
        const newClassResult = await pool.query(
            "INSERT INTO class_results (entry_id, place, points_earned, money_awarded) VALUES ($1, $2, $3, $4) RETURNING *",
            [entry_id, place, points_earned, money_awarded]
        );
        response.json(newClassResult.rows[0]);
        return response.status(201).json({ message: 'Class result created', classResult: newClassResult.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error creating class result' });
    }
    
});

// Display a class result
app.get('/classResults/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const classResult = await pool.query("SELECT * FROM class_results WHERE result_id = $1", [id]);
        if (classResult.rows.length === 0) {
            return response.status(404).json({ message: 'Class result not found' });
        }
        return response.json(classResult.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error fetching class result' });
    }
});

// Update a class result
app.patch('/classResults/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { entry_id, place, points_earned, money_awarded } = request.body;
        const updatedClassResult = await pool.query(
            "UPDATE class_results SET entry_id = $1, place = $2, points_earned = $3, money_awarded = $4 WHERE result_id = $5 RETURNING *",
            [entry_id, place, points_earned, money_awarded, id]
        );
        if (updatedClassResult.rows.length === 0) {
            return response.status(404).json({ message: 'Class result not found' });
        }
        return response.json(updatedClassResult.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error updating class result' });
    }
});

// Delete a class result
app.delete('/classResults/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedClassResult = await pool.query("DELETE FROM class_results WHERE result_id = $1 RETURNING *", [id]);
        if (deletedClassResult.rows.length === 0) {
            return response.status(404).json({ message: 'Class result not found' });
        }
        return response.json({ message: 'Class result deleted', classResult: deletedClassResult.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error deleting class result' });
    }
});



// TODO:
// CRUD for result disputes
// CRUD for family members

