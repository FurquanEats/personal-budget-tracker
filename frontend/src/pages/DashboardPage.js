// In frontend/src/pages/DashboardPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

// Component Imports
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import Summary from '../components/Summary';
import CategoryPieChart from '../components/CategoryPieChart';
import EditTransactionModal from '../components/EditTransactionModal';

const DashboardPage = () => {
  // State Management
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // API Call to fetch all transactions
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Fetch transactions on initial component load
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handler Functions
  const handleTransactionAdded = () => {
    fetchTransactions(); // Refetch all data to ensure UI is up to date
  };

  const handleTransactionDeleted = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/transactions/${id}`);
      fetchTransactions(); // Refetch data to update the UI
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleSaveTransaction = async (updatedTransaction) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/transactions/${updatedTransaction.id}`, updatedTransaction);
      fetchTransactions();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  // Modal State Handlers
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleCloseModal = () => {
    setEditingTransaction(null);
  };

  return (
    <>
      <motion.div
        className="dashboard-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="summary-grid">
          <Summary transactions={transactions} />
        </div>

        <motion.div
          className="add-transaction-card card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TransactionForm onTransactionAdded={handleTransactionAdded} />
        </motion.div>

        <motion.div
          className="pie-chart-card card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CategoryPieChart transactions={transactions} />
        </motion.div>

        <motion.div
          className="history-card card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <TransactionList transactions={transactions} onDelete={handleTransactionDeleted} onEdit={handleEdit} />
        </motion.div>
      </motion.div>

      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          onClose={handleCloseModal}
          onSave={handleSaveTransaction}
        />
      )}
    </>
  );
};

export default DashboardPage;