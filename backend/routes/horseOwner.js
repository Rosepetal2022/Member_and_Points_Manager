const express = require('express');
const router = express.Router();
const horseController = require('../controllers/horseController');

router.post('/', horseController.createHorse);
router.get('/:id', horseController.getHorse);
router.patch('/:id', horseController.updateHorse);
router.delete('/:id', horseController.deleteHorse);

module.exports = router;
