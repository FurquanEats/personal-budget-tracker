// In frontend/src/pages/GroupDetailPage.js

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GroupDetailPage = () => {
  const { id } = useParams(); // Gets the group ID from the URL
  const [group, setGroup] = useState(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');

  // We wrap fetchGroupDetails in useCallback to stabilize the function.
  // This tells React that the function itself only changes when the `id` from the URL changes.
  const fetchGroupDetails = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/groups/${id}`);
      setGroup(res.data);
    } catch (error) {
      console.error("Failed to fetch group details:", error);
    }
  }, [id]);

  // Now, useEffect can safely depend on the stable fetchGroupDetails function.
  // This satisfies the dependency array warning and follows best practices.
  useEffect(() => {
    fetchGroupDetails();
  }, [fetchGroupDetails]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const expenseData = { description, amount: parseFloat(amount), paidBy };
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/groups/${id}/expenses`, expenseData);
      fetchGroupDetails(); // Refresh details after adding a new expense
      // Reset form fields
      setDescription('');
      setAmount('');
      setPaidBy('');
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  // Display a loading state while the group data is being fetched
  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-layout">
      <div className="card">
        <h3>Add Expense to "{group.name}"</h3>
        <form onSubmit={handleAddExpense}>
          <div className="form-group">
            <label>Description</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Amount (₹)</label>
            <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Paid By (Member Name)</label>
            <input type="text" value={paidBy} onChange={e => setPaidBy(e.target.value)} required />
          </div>
          <button type="submit" className="btn">Add Expense</button>
        </form>
      </div>

      <div className="card">
        <h3>Expense History</h3>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Paid By</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {group.GroupExpenses.map(exp => (
              <tr key={exp.id}>
                <td>{exp.description}</td>
                <td>{exp.paidBy}</td>
                <td>₹{exp.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupDetailPage;