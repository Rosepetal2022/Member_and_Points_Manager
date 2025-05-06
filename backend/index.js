import express from "express";
import {PORT} from "./config.js";
require('dotenv').config()

const app = express();

const jwt = require('jsonwebtoken')

app.use(express.json())

// testing database
// const users = [{name: 'oyama'}, {name:'rachel'}, {name:'tessa'}]
const users = []

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('Entering member and points manager')
})

app.get('/testUsers', (req,res)=>{
    res.json(users)
})

app.post('/newUser', (req, res)=>{
    const user = {name: req.body.name, password: req.body.password}
    users.push(user) // will create new record in database
    res.status(201).send() // new record created
})

app.post('/login', (req, res)=>{
    const user = users.find(user=> user.name = req.body.name)
    if (user ==null){
        return res.status(400).send('Cannot find user for horses :(')
    }
    // connect to database to get password and compare database password to passed in pwd
    if (req.body.password == user.password){
        res.send('logging in')
    } else {
        res.send('Login failed for user' + req.body.name)
    }
})

app.listen(PORT,()=>{
    console.log(`Server is spinning on port: ${PORT}`);
})