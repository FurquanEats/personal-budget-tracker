// In backend/src/controllers/transactionController.js
const Transaction = require('../models/Transaction');

// GET: now finds transactions only for the logged-in user
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.userId }, // Filter by userId from middleware
      order: [['date', 'DESC']]
    });
    res.status(200).json(transactions);
  } catch (error) { res.status(500).json({ error: 'Something went wrong' }); }
};

// ADD: now associates the new transaction with the logged-in user
exports.addTransaction = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;
    const newTransaction = await Transaction.create({
      amount, type, category, date, notes,
      userId: req.userId // Set userId from middleware
    });
    res.status(201).json(newTransaction);
  } catch (error) { res.status(500).json({ error: 'Failed to add transaction' }); }
};

// UPDATE: ensures a user can only update their own transactions
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    
    await transaction.update(req.body);
    res.status(200).json(transaction);
  } catch (error) { res.status(500).json({ error: 'Failed to update transaction' }); }
};

// DELETE: ensures a user can only delete their own transactions
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

    await transaction.destroy();
    res.status(204).send();
  } catch (error) { res.status(500).json({ error: 'Failed to delete transaction' }); }
};