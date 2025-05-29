const express = require('express');
const router = express.Router();
const classController = require('../controllers/classesController');

router.post('/', classController.createClass);
router.get('/:id', classController.getClass);
router.patch('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

module.exports = router;
