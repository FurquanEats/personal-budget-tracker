const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const transactionRoutes = require('./routes/transactions');

require('./models/Transaction');

const app = express();
const PORT = 5001;

app.use(cors()); 
app.use(express.json());

app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the Personal Budget Tracker Backend!');
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {
    await sequelize.sync({ force: false }); 
    console.log('Database connected and synchronized!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});