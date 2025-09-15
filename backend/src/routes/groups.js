const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.get('/', groupController.getGroups);
router.post('/', groupController.createGroup);
router.get('/:id', groupController.getGroupDetails);
router.post('/:id/expenses', groupController.addGroupExpense);

module.exports = router;