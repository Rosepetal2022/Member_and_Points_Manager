const express = require('express');
const router = express.Router();
const horseController = require('../controllers/horseController');

router.post('/horses', horseController.createHorse);
router.get('/horses/getAllByMember/:memberId', horseController.getHorsesByMemberId);
router.get('/horses/:id', horseController.getHorse);
router.get('/horses', horseController.getAllHorses);
router.patch('/horses/:id', horseController.updateHorse);
router.delete('/horses/:id', horseController.deleteHorse);


module.exports = router;
