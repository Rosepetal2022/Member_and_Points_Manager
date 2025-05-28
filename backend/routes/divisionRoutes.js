const express = require('express');
const router = express.Router();
const divisionController = require('../controllers/divisionController');

router.post('/divisions', divisionController.createDivision);
router.get('/divisions/:id', divisionController.getDivision);
router.patch('/divisions/:id', divisionController.updateDivision);
router.delete('/divisions/:id', divisionController.deleteDivision);

module.exports = router;
