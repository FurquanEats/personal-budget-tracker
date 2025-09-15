const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      order: [['date', 'DESC']] 
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;
    const newTransaction = await Transaction.create({ amount, type, category, date, notes });
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add transaction' });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);
    if (transaction) {
      await transaction.destroy();
      res.status(204).send(); 
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};