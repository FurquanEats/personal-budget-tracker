// In backend/src/routes/transactions.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes are now protected by the authMiddleware
router.get('/', authMiddleware, transactionController.getTransactions);
router.post('/', authMiddleware, transactionController.addTransaction);
router.put('/:id', authMiddleware, transactionController.updateTransaction);
router.delete('/:id', authMiddleware, transactionController.deleteTransaction);

module.exports = router;