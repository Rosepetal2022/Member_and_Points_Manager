const pool = require('../db');

// Create a horse
exports.createHorse = async (request, response) => {
  try {
    const { horse_name, foaled_date, sex, color, hands, horse_size, breed, member_id } = request.body;

    // Step 1: Insert into horses table
    const newHorse = await pool.query(
      `INSERT INTO horses (horse_name, foaled_date, sex, color, hands, horse_size, breed)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [horse_name, foaled_date, sex, color, hands, horse_size, breed]
    );

    const horseId = newHorse.rows[0].horse_id;

    // Step 2: Insert into horse_owners table
    await pool.query(
      `INSERT INTO horse_owners (horse_id, member_id)
       VALUES ($1, $2)`,
      [horseId, member_id]
    );

    return response.status(201).json({ message: 'Horse created and ownership assigned', horse: newHorse.rows[0] });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error creating horse' });
  }
};


// Display a horse
exports.getHorse = async (request, response) => {
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
};


exports.getAllHorses = async (request, response) => {
  try {
    const { id } = request.params;
    const horse = await pool.query("SELECT horses.*, members.member_id, CONCAT(members.first_name, ' ', members.last_name) AS owner_name FROM Horses JOIN horse_owners ON horses.horse_id = horse_owners.horse_id JOIN Members ON Horse_owners.member_Id = Members.Member_Id ");
    return response.json(horse.rows);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error fetching horse' });
  }
};

exports.getHorsesByMemberId = async (request, response) => {
  try {
    const { memberId } = request.params;
    console.log("TEST memberID in getHorsesByMemberId", memberId)
    const horse = await pool.query(`SELECT horses.*, CONCAT(members.first_name, ' ', members.last_name) AS owner_name FROM Horses JOIN horse_owners ON horses.horse_id = horse_owners.horse_id JOIN Members ON Horse_owners.member_Id = Members.Member_Id 
WHERE members.member_id = $1`, [memberId]
);
    return response.json(horse.rows);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error fetching horse' });
  }
};


// Update a horse
exports.updateHorse = async (request, response) => {
  try {
    const { id } = request.params;
    const { horse_name, foaled_date, sex, color, hands, horse_size, breed } = request.body;
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
};

// Delete a horse
exports.deleteHorse = async (request, response) => {
  try {
    const { id } = request.params;

    // Start a transaction, this will help run these two queries and keep data accurate
    await pool.query('BEGIN');

    // Delete related records from horse_owners
    await pool.query("DELETE FROM horse_owners WHERE horse_id = $1", [id]);

    // Delete the horse
    const deletedHorse = await pool.query("DELETE FROM horses WHERE horse_id = $1 RETURNING *", [id]);

    if (deletedHorse.rows.length === 0) {
      await pool.query('ROLLBACK');
      return response.status(404).json({ message: 'Horse not found' });
    }

    // Commit the transaction
    await pool.query('COMMIT');

    return response.json({ message: 'Horse and related ownerships deleted', horse: deletedHorse.rows[0] });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error(error);
    return response.status(500).json({ message: 'Error deleting horse' });
  }
};
