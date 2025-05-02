import express from "express";
import {PORT} from "./config.js";

const express = require("express");
const app = express();

const cors = rerqire('cors');  
const pool = require("./db");

app.use(express.json());
app.use(cors());

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('Entering member and points manager')
})

app.listen(PORT,()=>{
    console.log(`Server is spinning on port: ${PORT}`);
})

// Create a member
app.post('/members', (request, response) => {
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
