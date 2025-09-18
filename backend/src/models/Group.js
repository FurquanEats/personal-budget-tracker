// In backend/src/models/Group.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Group = sequelize.define('Group', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
  // The 'userId' is added automatically by the association in index.js
});

module.exports = Group;