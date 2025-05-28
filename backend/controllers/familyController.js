const pool = require('../db');

// Create a family
exports.createFamily = async (request, response) => {
  try {
    const { family_name } = request.body;
    const newFamily = await pool.query(
      "INSERT INTO families (family_name) VALUES ($1) RETURNING *",
      [family_name]
    );
    return response.status(201).json({ message: 'Family created', family: newFamily.rows[0] });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error creating family' });
  }
};

// Display a family
exports.getFamily = async (request, response) => {
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
};

// Update a family
exports.updateFamily = async (request, response) => {
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
};

// Delete a family
exports.deleteFamily = async (request, response) => {
  try {
    const { id } = request.params;
    const deletedFamily = await pool.query(
      "DELETE FROM families WHERE family_id = $1 RETURNING *",
      [id]
    );
    if (deletedFamily.rows.length === 0) {
      return response.status(404).json({ message: 'Family not found' });
    }
    return response.json({ message: 'Family deleted', family: deletedFamily.rows[0] });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error deleting family' });
  }
};
