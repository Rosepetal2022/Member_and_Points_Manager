const HorseModel = require('../models/horseModel');

exports.createHorse = async (request, response) => {
  try {
    const horse = await HorseModel.createHorse(request.body);
    return response.status(201).json({ message: 'Horse created', horse });
  } catch (error) {
    console.error('Error creating horse:', error);
    return response.status(500).json({ message: 'Error creating horse' });
  }
};

exports.getHorse = async (request, response) => {
  try {
    const horse = await HorseModel.getHorseById(request.params.id);
    if (!horse) {
      return response.status(404).json({ message: 'Horse not found' });
    }
    return response.status(200).json(horse);
  } catch (error) {
    console.error('Error fetching horse:', error);
    return response.status(500).json({ message: 'Error fetching horse' });
  }
};

exports.updateHorse = async (request, response) => {
  const horseId = request.params.id;
  const { member_id } = request.body;

  try {
    const result = await db.query(
      'UPDATE horse_owner SET member_id = $1 WHERE horse_id = $2 RETURNING *',
      [member_id, horseId]
    );

    if (result.rows.length === 0) {
      return response.status(404).json({ message: 'Horse not found or no ownership record exists' });
    }

    return response.status(200).json({ message: 'Horse ownership updated', horse: result.rows[0] });
  } catch (error) {
    console.error('Error updating horse ownership:', error);
    return response.status(500).json({ message: 'Error updating horse ownership' });
  }
};


exports.deleteHorse = async (request, response) => {
  try {
    const horse = await HorseModel.deleteHorse(request.params.id);
    if (!horse) {
      return response.status(404).json({ message: 'Horse not found' });
    }
    return response.status(200).json({ message: 'Horse deleted', horse });
  } catch (error) {
    console.error('Error deleting horse:', error);
    return response.status(500).json({ message: 'Error deleting horse' });
  }
};
