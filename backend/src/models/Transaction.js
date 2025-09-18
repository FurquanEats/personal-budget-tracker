// In backend/src/models/Transaction.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Transaction = sequelize.define('Transaction', {
  amount: {
    type: DataTypes.REAL,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false // 'income' or 'expense'
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  notes: {
    type: DataTypes.STRING
  }
  // The 'userId' is added automatically by the association in index.js
});

module.exports = Transaction;