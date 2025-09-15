import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
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
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>Personal Budget Tracker</h1>
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;