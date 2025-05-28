const pool = require('../db');

exports.createMember = async (request, response) => {
    try {
        const {
            first_name, last_name, date_of_birth, email_address,
            street_address, city, zip_code, phone_number, member_status
        } = request.body;

        const newMember = await pool.query(
            `INSERT INTO members (
                first_name, last_name, date_of_birth, email_address,
                street_address, city, zip_code, phone_number, member_status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [first_name, last_name, date_of_birth, email_address, street_address, city, zip_code, phone_number, member_status]
        );

        return response.status(201).json({ message: 'Member created', member: newMember.rows[0] });
    } catch (error) {
        console.error('Error creating member:', error);
        return response.status(500).json({ message: 'Error creating member' });
    }
};

exports.getMember = async (request, response) => {
    try {
        const { id } = request.params;
        const member = await pool.query("SELECT * FROM members WHERE member_id = $1", [id]);

        if (member.rows.length === 0) {
            return response.status(404).json({ message: 'Member not found' });
        }

        return response.status(200).json(member.rows[0]);
    } catch (error) {
        console.error('Error fetching member:', error);
        return response.status(500).json({ message: 'Error fetching member' });
    }
};

exports.updateMember = async (request, response) => {
    try {
        const { id } = request.params;
        const {
            first_name, last_name, date_of_birth, email_address,
            street_address, city, zip_code, phone_number, member_status
        } = request.body;

        const updatedMember = await pool.query(
            `UPDATE members SET
                first_name = $1, last_name = $2, date_of_birth = $3,
                email_address = $4, street_address = $5, city = $6,
                zip_code = $7, phone_number = $8, member_status = $9
             WHERE member_id = $10 RETURNING *`,
            [first_name, last_name, date_of_birth, email_address, street_address, city, zip_code, phone_number, member_status, id]
        );

        if (updatedMember.rows.length === 0) {
            return response.status(404).json({ message: 'Member not found' });
        }

        return response.status(200).json({ message: 'Member updated', member: updatedMember.rows[0] });
    } catch (error) {
        console.error('Error updating member:', error);
        return response.status(500).json({ message: 'Error updating member' });
    }
};

exports.deleteMember = async (request, response) => {
    try {
        const { id } = request.params;
        const deletedMember = await pool.query("DELETE FROM members WHERE member_id = $1 RETURNING *", [id]);

        if (deletedMember.rows.length === 0) {
            return response.status(404).json({ message: 'Member not found' });
        }

        return response.status(200).json({ message: 'Member deleted', member: deletedMember.rows[0] });
    } catch (error) {
        console.error('Error deleting member:', error);
        return response.status(500).json({ message: 'Error deleting member' });
    }
};
