const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Transaction = sequelize.define('Transaction', {
  amount: {
    type: DataTypes.REAL,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false 
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
});

module.exports = Transaction;