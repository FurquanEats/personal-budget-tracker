import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ onTransactionAdded }) => {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // YYYY-MM-DD

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount.');
      return;
    }

    const newTransaction = {
      type,
      amount: parseFloat(amount),
      category,
      date,
    };

    try {
      const response = await axios.post('http://localhost:5001/api/transactions', newTransaction);
      onTransactionAdded(response.data);
      setAmount('');
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add transaction.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Add New Transaction</h3>
      <div>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Food" />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;