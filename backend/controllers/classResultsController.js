const pool = require('../db');
// CRUD for class results

// Create a class result
exports.createClassResult = async (request, response) => {
  try {
    const { entry_id, place, points_earned, money_awarded } = request.body;
    const newClassResult = await pool.query(
      "INSERT INTO class_results (entry_id, place, points_earned, money_awarded) VALUES ($1, $2, $3, $4) RETURNING *",
      [entry_id, place, points_earned, money_awarded]
    );
    return response.status(201).json({ message: 'Class result created', classResult: newClassResult.rows[0] });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error creating class result' });
  }
};


// Display a class result
exports.getClassResult = async (request, response) => {
  try {
    const { id } = request.params;
    const classResult = await pool.query(
      "SELECT * FROM class_results WHERE result_id = $1",
      [id]
    );
    if (classResult.rows.length === 0) {
      return response.status(404).json({ message: 'Class result not found' });
    }
    return response.json(classResult.rows[0]);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error fetching class result' });
  }
};


// Update a class result
exports.updateClassResult = async (request, response) => {
  try {
    const { id } = request.params;
    const { entry_id, place, points_earned, money_awarded } = request.body;
    const updatedClassResult = await pool.query(
      "UPDATE class_results SET entry_id = $1, place = $2, points_earned = $3, money_awarded = $4 WHERE result_id = $5 RETURNING *",
      [entry_id, place, points_earned, money_awarded, id]
    );
    if (updatedClassResult.rows.length === 0) {
      return response.status(404).json({ message: 'Class result not found' });
    }
    return response.json(updatedClassResult.rows[0]);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error updating class result' });
  }
};


// Delete a class result
exports.deleteClassResult = async (request, response) => {
  try {
    const { id } = request.params;
    const deletedClassResult = await pool.query(
      "DELETE FROM class_results WHERE result_id = $1 RETURNING *",
      [id]
    );
    if (deletedClassResult.rows.length === 0) {
      return response.status(404).json({ message: 'Class result not found' });
    }
    return response.json({ message: 'Class result deleted', classResult: deletedClassResult.rows[0] });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error deleting class result' });
  }
};

