const express = require('express');
const router = express.Router();
const classEntryController = require('../controllers/classEntryController');

router.post('/', classEntryController.createClassEntry);
router.get('/:id', classEntryController.getClassEntry);
router.patch('/:id', classEntryController.updateClassEntry);
router.delete('/:id', classEntryController.deleteClassEntry);

module.exports = router;
