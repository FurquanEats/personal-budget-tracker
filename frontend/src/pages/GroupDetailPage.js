import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GroupDetailPage = () => {
  const { id } = useParams(); 
  const [group, setGroup] = useState(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');

  const fetchGroupDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/groups/${id}`);
      setGroup(res.data);
    } catch (error) {
      console.error("Failed to fetch group details:", error);
    }
  };

  useEffect(() => {
    fetchGroupDetails();
  }, [id]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const expenseData = { description, amount: parseFloat(amount), paidBy };
    try {
      await axios.post(`http://localhost:5001/api/groups/${id}/expenses`, expenseData);
      fetchGroupDetails(); 
      setDescription('');
      setAmount('');
      setPaidBy('');
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  if (!group) return <div>Loading...</div>;

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
          <thead><tr><th>Description</th><th>Paid By</th><th>Amount</th></tr></thead>
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