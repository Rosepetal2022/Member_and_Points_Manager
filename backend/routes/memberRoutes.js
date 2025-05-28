const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');


router.post('/', memberController.createMember);
router.get('/:id', memberController.getMember);
router.patch('/:id', memberController.updateMember);
router.delete('/:id', memberController.deleteMember);

module.exports = router;
