import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  return (
    <div className="card transaction-list-container">
      <h3>History</h3>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.category}</td>
              <td>{t.date}</td>
              <td style={{ color: t.type === 'expense' ? 'var(--danger-color)' : 'var(--success-color)' }}>
                {t.type}
              </td>
              <td>${t.amount.toFixed(2)}</td>
              <td>
                <div className="action-buttons">
                  <button onClick={() => onEdit(t)} className="action-btn edit-btn"><FiEdit /></button>
                  <button onClick={() => onDelete(t.id)} className="action-btn delete-btn"><FiTrash2 /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;