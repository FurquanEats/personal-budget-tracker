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
import RecentActivity from '../components/RecentActivity'; // New component import

const DashboardPage = () => {
  // --- STATE MANAGEMENT ---
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // --- API & DATA HANDLING ---
  const fetchTransactions = async () => {
    try {
      // Note: This API call will fail until we build the frontend for login,
      // as it requires an authentication token. This is expected for now.
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // In the next phase, we'll handle token errors and redirect to login.
    }
  };

  // Fetch transactions on initial component load
  useEffect(() => {
    fetchTransactions();
  }, []);

  // --- EVENT HANDLERS ---
  const handleTransactionAdded = () => fetchTransactions();

  const handleTransactionDeleted = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/transactions/${id}`);
      fetchTransactions();
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

  // --- MODAL STATE HANDLERS ---
  const handleEdit = (transaction) => setEditingTransaction(transaction);
  const handleCloseModal = () => setEditingTransaction(null);

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- Top Row: Summary --- */}
        <motion.div variants={itemVariants}>
          <Summary transactions={transactions} />
        </motion.div>
        
        {/* --- Main Two-Column Layout --- */}
        <div className="dashboard-grid-layout" style={{ marginTop: '1.5rem' }}>
          
          {/* Left Column */}
          <motion.div variants={itemVariants} className="dashboard-column">
            <div className="card">
              <TransactionForm onTransactionAdded={handleTransactionAdded} />
            </div>
            <div className="card">
              <TransactionList
                transactions={transactions}
                onDelete={handleTransactionDeleted}
                onEdit={handleEdit}
              />
            </div>
          </motion.div>
          
          {/* Right Column */}
          <motion.div variants={itemVariants} className="dashboard-column">
            <div className="card">
              <CategoryPieChart transactions={transactions} />
            </div>
            <div className="card">
              <RecentActivity />
            </div>
          </motion.div>

        </div>
      </motion.div>
      
      {/* --- Edit Modal (rendered outside the main layout) --- */}
      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          onClose={handleCloseModal}
          onSave={handleSaveTransaction}
        />
      )}
    </div>
  );
};

export default DashboardPage;