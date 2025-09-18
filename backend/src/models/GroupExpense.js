// In backend/src/models/GroupExpense.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const GroupExpense = sequelize.define('GroupExpense', {
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.REAL,
    allowNull: false
  },
  paidBy: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = GroupExpense;