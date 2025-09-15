import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import CategoryPieChart from './components/CategoryPieChart';

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

  const handleTransactionAdded = () => {
    fetchTransactions(); 
  };

  const handleTransactionDeleted = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/transactions/${id}`);
      fetchTransactions(); 
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Personal Budget Tracker</h1>
      </header>

      <Summary transactions={transactions} />

      <main className="main-layout">
        <div className="left-column">
          <TransactionForm onTransactionAdded={handleTransactionAdded} />
        </div>
        <div className="right-column">
          <CategoryPieChart transactions={transactions} />
          <TransactionList transactions={transactions} onDelete={handleTransactionDeleted} />
        </div>
      </main>
    </div>
  );
}

export default App;