const pool = require('../db');

exports.createShow = async (request, response) => {
    try {
        const {
            season_id, show_name, show_start_date, show_end_date, show_type,
            show_contact_name, show_contact_phone, show_contact_email,
            show_venue, show_address, result_status
        } = request.body;

        const newShow = await pool.query(
            `INSERT INTO shows (
                season_id, show_name, show_start_date, show_end_date, show_type,
                show_contact_name, show_contact_phone, show_contact_email,
                show_venue, show_address, result_status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [
                season_id, show_name, show_start_date, show_end_date, show_type,
                show_contact_name, show_contact_phone, show_contact_email,
                show_venue, show_address, result_status
            ]
        );

        return response.status(201).json({ message: 'Show created', show: newShow.rows[0] });
    } catch (error) {
        console.error('Error creating show:', error);
        return response.status(500).json({ message: 'Error creating show' });
    }
};

exports.getShow = async (request, response) => {
    try {
        const { id } = request.params;
        const show = await pool.query("SELECT * FROM shows WHERE show_id = $1", [id]);

        if (show.rows.length === 0) {
            return response.status(404).json({ message: 'Show not found' });
        }

        return response.status(200).json(show.rows[0]);
    } catch (error) {
        console.error('Error fetching show:', error);
        return response.status(500).json({ message: 'Error fetching show' });
    }
};

exports.updateShow = async (request, response) => {
    try {
        const { id } = request.params;
        const {
            season_id, show_name, show_start_date, show_end_date, show_type,
            show_contact_name, show_contact_phone, show_contact_email,
            show_venue, show_address, result_status
        } = request.body;

        const updatedShow = await pool.query(
            `UPDATE shows SET
                season_id = $1, show_name = $2, show_start_date = $3, show_end_date = $4,
                show_type = $5, show_contact_name = $6, show_contact_phone = $7,
                show_contact_email = $8, show_venue = $9, show_address = $10,
                result_status = $11
             WHERE show_id = $12 RETURNING *`,
            [
                season_id, show_name, show_start_date, show_end_date, show_type,
                show_contact_name, show_contact_phone, show_contact_email,
                show_venue, show_address, result_status, id
            ]
        );

        if (updatedShow.rows.length === 0) {
            return response.status(404).json({ message: 'Show not found' });
        }

        return response.status(200).json(updatedShow.rows[0]);
    } catch (error) {
        console.error('Error updating show:', error);
        return response.status(500).json({ message: 'Error updating show' });
    }
};

exports.deleteShow = async (request, response) => {
    try {
        const { id } = request.params;
        const deletedShow = await pool.query("DELETE FROM shows WHERE show_id = $1 RETURNING *", [id]);

        if (deletedShow.rows.length === 0) {
            return response.status(404).json({ message: 'Show not found' });
        }

        return response.status(200).json({ message: 'Show deleted', show: deletedShow.rows[0] });
    } catch (error) {
        console.error('Error deleting show:', error);
        return response.status(500).json({ message: 'Error deleting show' });
    }
};

exports.getAllShows = async(req, res) => {
     try {
        const show = await pool.query("SELECT * FROM shows");
        return res.status(200).json(show.rows);
    } catch (error) {
        console.error('Error fetching show:', error);
        return res.status(500).json({ message: 'Error fetching show' });
    }
}