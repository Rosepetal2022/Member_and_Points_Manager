const pool = require('../db');

exports.createSeason = async (request, response) => {
    try {
        const { season_name, start_date, end_date } = request.body;
        const newSeason = await pool.query(
            "INSERT INTO seasons (season_name, start_date, end_date) VALUES ($1, $2, $3) RETURNING *",
            [season_name, start_date, end_date]
        );
        return response.status(201).json({ message: 'Season created', season: newSeason.rows[0] });
    } catch (error) {
        console.error('Error creating season:', error);
        return response.status(500).json({ message: 'Error creating season' });
    }
};

exports.getSeason = async (request, response) => {
    try {
        const { id } = request.params;
        const season = await pool.query("SELECT * FROM seasons WHERE season_id = $1", [id]);

        if (season.rows.length === 0) {
            return response.status(404).json({ message: 'Season not found' });
        }

        return response.status(200).json(season.rows[0]);
    } catch (error) {
        console.error('Error fetching season:', error);
        return response.status(500).json({ message: 'Error fetching season' });
    }
};

exports.updateSeason = async (request, response) => {
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

        return response.status(200).json(updatedSeason.rows[0]);
    } catch (error) {
        console.error('Error updating season:', error);
        return response.status(500).json({ message: 'Error updating season' });
    }
};

exports.deleteSeason = async (request, response) => {
    try {
        const { id } = request.params;
        const deletedSeason = await pool.query("DELETE FROM seasons WHERE season_id = $1 RETURNING *", [id]);

        if (deletedSeason.rows.length === 0) {
            return response.status(404).json({ message: 'Season not found' });
        }

        return response.status(200).json({ message: 'Season deleted', season: deletedSeason.rows[0] });
    } catch (error) {
        console.error('Error deleting season:', error);
        return response.status(500).json({ message: 'Error deleting season' });
    }
};
