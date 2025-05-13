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

// Create a member
app.post('/members', async (request, response) => {
    try {
        const { first_name, last_name, date_of_birth, email_address, street_address, city, zip_code, phone_number} = request.body;
        const newMember = await pool.query(
            "INSERT INTO members (first_name, last_name, date_of_birth, email_address, street_address, city, zip_code, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [first_name, last_name, date_of_birth, email_address, street_address, city, zip_code, phone_number]
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
        const { first_name, last_name, date_of_birth, email_address, street_address, city, zip_code, phone_number } = request.body;
        const updatedMember = await pool.query(
            "UPDATE members SET first_name = $1, last_name = $2, date_of_birth = $3, email_address = $4, street_address = $5, city = $6, zip_code = $7, phone_number = $8 WHERE member_id = $9 RETURNING *",
            [first_name, last_name, date_of_birth, email_address, street_address, city, zip_code, phone_number, id]
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
