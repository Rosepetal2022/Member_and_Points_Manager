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
  try {
    const horse = await HorseModel.updateHorse(request.params.id, request.body);
    if (!horse) {
      return response.status(404).json({ message: 'Horse not found' });
    }
    return response.status(200).json({ message: 'Horse updated', horse });
  } catch (error) {
    console.error('Error updating horse:', error);
    return response.status(500).json({ message: 'Error updating horse' });
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
