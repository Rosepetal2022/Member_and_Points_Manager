// controllers/adminController.js
const db = require('../db');

const addResults = async (req, res) => {
    const client = await db.connect();
 console.log('Incoming payload:', req.body);
    try {
        await client.query('BEGIN');

        const { entry, result } = req.body;

        // Insert class entry
        const entryRes = await client.query(
            'INSERT INTO class_entries (class_id, member_id, horse_id) VALUES ($1, $2, $3) RETURNING entry_id',
            [entry.class_id, entry.member_id, entry.horse_id]
        );
        const entryId = entryRes.rows[0].entry_id;

        // Insert class result
        await client.query(
            'INSERT INTO class_results (entry_id, place, points_earned, money_awarded) VALUES ($1, $2, $3, $4)',

            [entryId, result.place, result.points_earned, result.money_awarded]

        );

        await client.query('COMMIT');
        res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    } finally {
        client.release();
    }
};

module.exports = { addResults };
