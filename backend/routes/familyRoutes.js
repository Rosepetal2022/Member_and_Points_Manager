const express = require('express');
const router = express.Router();
const familyController = require('../controllers/familyController');

router.post('/families', familyController.createFamily);
router.get('/families/:id', familyController.getFamily);
router.patch('/families/:id', familyController.updateFamily);
router.delete('/families/:id', familyController.deleteFamily);

module.exports = router;
