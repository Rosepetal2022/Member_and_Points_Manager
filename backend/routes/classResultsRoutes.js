const express = require('express');
const router = express.Router();
const classResultsController = require('../controllers/classResultsController');

router.post('/', classResultsController.createClassResult);
router.get('/:id', classResultsController.getClassResult);
router.patch('/:id', classResultsController.updateClassResult);
router.delete('/:id', classResultsController.deleteClassResult);

module.exports = router;
