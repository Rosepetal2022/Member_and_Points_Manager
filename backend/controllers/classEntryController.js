
const pool = require('../db');

// CRUD for class entries

// Create a class entry
exports.createClassEntry = async (request, response) => {
  try {
    const { class_id, horse_id, member_id, entry_date } = request.body;
    const newClassEntry = await pool.query(
      "INSERT INTO class_entries (class_id, horse_id, member_id, entry_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [class_id, horse_id, member_id, entry_date]
    );
    return response.status(201).json({ message: 'Class entry created', classEntry: newClassEntry.rows[0] });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error creating class entry' });
  }
};



// Display a class entry
exports.getClassEntry = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await pool.query("SELECT * FROM class_entries WHERE entry_id = $1", [id]);
    if (result.rows.length === 0) {
      return response.status(404).json({ message: 'Class entry not found' });
    }
    return response.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching class entry' });
  }
};

// Update a class entry
exports.updateClassEntry = async (request, response) => {
  try {
    const { id } = request.params;
    const { class_id, horse_id, member_id, entry_date } = request.body;

    const updatedClassEntry = await pool.query(
      "UPDATE class_entries SET class_id = $1, horse_id = $2, member_id = $3, entry_date = $4 WHERE entry_id = $5 RETURNING *",
      [class_id, horse_id, member_id, entry_date, id]
    );

    if (updatedClassEntry.rows.length === 0) {
      return response.status(404).json({ message: 'Class entry not found' });
    }

    return response.json(updatedClassEntry.rows[0]);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error updating class entry' });
  }
};


// Delete a class entry
exports.deleteClassEntry = async (request, response) => {
  try {
    const { id } = request.params;
    const deletedClassEntry = await pool.query(
      "DELETE FROM class_entries WHERE entry_id = $1 RETURNING *",
      [id]
    );
    if (deletedClassEntry.rows.length === 0) {
      return response.status(404).json({ message: 'Class entry not found' });
    }
    return response.json({ message: 'Class entry deleted', classEntry: deletedClassEntry.rows[0] });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error deleting class entry' });
  }
};



