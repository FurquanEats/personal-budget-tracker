import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';

const Summary = ({ transactions }) => {
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="summary-grid">
      <div className="card summary-card">
        <h4><FiTrendingUp /> Total Income</h4>
        <p className="income">${totalIncome.toFixed(2)}</p>
      </div>
      <div className="card summary-card">
        <h4><FiTrendingDown /> Total Expense</h4>
        <p className="expense">${totalExpense.toFixed(2)}</p>
      </div>
      <div className="card summary-card">
        <h4><FiDollarSign /> Balance</h4>
        <p className="balance">${balance.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Summary;