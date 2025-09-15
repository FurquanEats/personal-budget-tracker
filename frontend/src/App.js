import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import CategoryPieChart from './components/CategoryPieChart';
import EditTransactionModal from './components/EditTransactionModal';
import { FiDollarSign } from 'react-icons/fi';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/transactions');
      setTransactions(response.data);
    } catch (error) { console.error('Error fetching transactions:', error); }
  };

  useEffect(() => { fetchTransactions(); }, []);

  const handleTransactionAdded = () => fetchTransactions();
  const handleTransactionDeleted = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/transactions/${id}`);
      fetchTransactions();
    } catch (error) { console.error('Error deleting transaction:', error); }
  };

  const handleEdit = (transaction) => setEditingTransaction(transaction);
  const handleCloseModal = () => setEditingTransaction(null);

  const handleSaveTransaction = async (updatedTransaction) => {
    try {
      await axios.put(`http://localhost:5001/api/transactions/${updatedTransaction.id}`, updatedTransaction);
      fetchTransactions();
      handleCloseModal();
    } catch (error) { console.error('Error updating transaction:', error); }
  };

  return (
    <>
      <div className="sidebar">
        <h1><FiDollarSign /> BudgetApp</h1>
        {/* Navigation links can go here later */}
      </div>
      <div className="main-content">
        <Summary transactions={transactions} />
        <div className="dashboard-layout">
          <TransactionForm onTransactionAdded={handleTransactionAdded} />
          <CategoryPieChart transactions={transactions} />
          <TransactionList transactions={transactions} onDelete={handleTransactionDeleted} onEdit={handleEdit} />
        </div>
      </div>
      {editingTransaction && (
        <EditTransactionModal 
          transaction={editingTransaction} 
          onClose={handleCloseModal} 
          onSave={handleSaveTransaction} 
        />
      )}
    </>
  );
}

export default App;