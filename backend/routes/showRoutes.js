const express = require('express');
const router = express.Router();
const showController = require('../controllers/showController');


router.post('/', showController.createShow);
router.get('/:id', showController.getShow);
router.patch('/:id', showController.updateShow);
router.delete('/:id', showController.deleteShow);
router.get("/", showController.getAllShows)

module.exports = router;
