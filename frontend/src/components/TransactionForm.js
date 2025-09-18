// In frontend/src/components/TransactionForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TransactionForm = ({ onTransactionAdded }) => {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState('Groceries');
  const [otherCategory, setOtherCategory] = useState('');

  const expenseCategories = ['Groceries', 'Healthcare', 'Entertainment', 'Bills', 'Other'];
  const incomeCategories = ['Online', 'Business', 'Freelancing', 'Side Hustle', 'Other'];

  // This effect now correctly lists its dependencies
  useEffect(() => {
    if (type === 'expense') {
      setCategory(expenseCategories[0]);
    } else {
      setCategory(incomeCategories[0]);
    }
  }, [type, expenseCategories, incomeCategories]); // Dependencies added here

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCategory = category === 'Other' ? otherCategory : category;
    if (!finalCategory) {
      alert('Please specify a category.');
      return;
    }
    const newTransaction = { type, amount: parseFloat(amount), category: finalCategory, date };
    try {
      await api.post('/api/transactions', newTransaction);
      onTransactionAdded();
      setAmount('');
      setCategory(type === 'expense' ? expenseCategories[0] : incomeCategories[0]);
      setOtherCategory('');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const currentCategories = type === 'expense' ? expenseCategories : incomeCategories;

  return (
    <>
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="form-group">
          <label>Amount (₹)</label>
          <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {currentCategories.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        {category === 'Other' && (
          <div className="form-group">
            <label>Custom Category</label>
            <input type="text" value={otherCategory} onChange={(e) => setOtherCategory(e.target.value)} placeholder="e.g., Trip to Mumbai" required />
          </div>
        )}
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <button type="submit" className="btn">Add Transaction</button>
      </form>
    </>
  );
};

export default TransactionForm;