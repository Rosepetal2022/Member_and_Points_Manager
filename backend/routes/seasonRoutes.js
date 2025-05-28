const express = require('express');
const router = express.Router();
const seasonController = require('../controllers/seasonController');


router.post('/', seasonController.createSeason);
router.get('/:id', seasonController.getSeason);
router.patch('/:id', seasonController.updateSeason);
router.delete('/:id', seasonController.deleteSeason);

module.exports = router;
