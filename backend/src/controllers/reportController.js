const { Sequelize } = require('sequelize');
const Transaction = require('../models/Transaction');

// Function to get a summary of expenses by category
exports.getCategorySummary = async (req, res) => {
  try {
    const summary = await Transaction.findAll({
      attributes: [
        'category',
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount'],
      ],
      where: {
        type: 'expense' 
      },
      group: ['category'],
      order: [[Sequelize.literal('total_amount'), 'DESC']]
    });
    res.status(200).json(summary);
  } catch (error) {
    console.error('Error fetching category summary:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};