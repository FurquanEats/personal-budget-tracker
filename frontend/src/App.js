import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import CategoryPieChart from './components/CategoryPieChart';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleTransactionAdded = (newTransaction) => {
    fetchTransactions();
  };

  return (
    <div style={{ padding: '30px' }}>
      <header>
        <h1>Personal Budget Tracker</h1>
      </header>

      <main>
        <Summary transactions={transactions} />

        <div style={{ display: 'flex', gap: '30px' }}>
          <div style={{ flex: 1 }}>
            <CategoryPieChart transactions={transactions} />
          </div>
          <div style={{ flex: 2 }}>
            <TransactionForm onTransactionAdded={handleTransactionAdded} />
            <TransactionList transactions={transactions} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;