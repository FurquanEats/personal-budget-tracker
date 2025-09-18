// In backend/src/index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');

// --- Import all routes ---
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const reportRoutes = require('./routes/reports');
const groupRoutes = require('./routes/groups');

// --- Import all models ---
const User = require('./models/User');
const Transaction = require('./models/Transaction');
const Group = require('./models/Group');
const GroupExpense = require('./models/GroupExpense');

// --- Define all database associations ---
User.hasMany(Transaction, { foreignKey: 'userId', onDelete: 'CASCADE' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Group, { foreignKey: 'userId', onDelete: 'CASCADE' });
Group.belongsTo(User, { foreignKey: 'userId' });

Group.hasMany(GroupExpense, { onDelete: 'CASCADE' });
GroupExpense.belongsTo(Group);

// --- Initialize Express App ---
const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/groups', groupRoutes);

// --- Simple root route for testing ---
app.get('/', (req, res) => {
  res.send('Personal Budget Tracker Backend is running!');
});

// --- Start the server and connect to the database ---
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {
    await sequelize.sync();
    console.log('Database connected and synchronized!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});