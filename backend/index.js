require('dotenv').config();

const { PORT } = require("./config.js");
const express = require("express");
const app = express();
const cors = require('cors');  
const bcrypt = require('bcrypt');
const pool = require('./db.js')

const jwt = require('jsonwebtoken');

// testing database
// const users = [{name: 'oyama'}, {name:'rachel'}, {name:'tessa'}]
const users = []

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('DB connection failed:', err);
    } else {
      console.log('Connected to DB at:', res.rows[0].now);
    }
  });

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

// TODO:
// CRUD for horse owners
// CRUD for shows
// CRUD for classes
// CRUD for class entries
// CRUD for class results
// CRUD for family members

