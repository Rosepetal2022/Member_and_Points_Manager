const pool = require('../db');

// Create a division
exports.createDivision = async (request, response) => {
  try {
    const { division_name, season_id } = request.body;
    const newDivision = await pool.query(
      "INSERT INTO divisions (division_name, season_id) VALUES ($1, $2) RETURNING *",
      [division_name, season_id]
    );
    return response.status(201).json({ message: 'Division created', division: newDivision.rows[0] });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error creating division' });
  }
};

// Display a division
exports.getDivision = async (request, response) => {
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
};

// Update a division
exports.updateDivision = async (request, response) => {
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
};

// Delete a division
exports.deleteDivision = async (request, response) => {
  try {
    const { id } = request.params;
    const deletedDivision = await pool.query(
      "DELETE FROM divisions WHERE division_id = $1 RETURNING *",
      [id]
    );
    if (deletedDivision.rows.length === 0) {
      return response.status(404).json({ message: 'Division not found' });
    }
    return response.json({ message: 'Division deleted', division: deletedDivision.rows[0] });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error deleting division' });
  }
};
