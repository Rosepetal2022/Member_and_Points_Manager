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

// goes to index.js in the routes folder
const routes = require('./routes');
app.use('/api', routes);

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(200).send('Entering member and points manager')
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



// TODO:
// CRUD for result disputes
// CRUD for family members

