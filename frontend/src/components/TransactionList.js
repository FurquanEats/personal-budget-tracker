import React from 'react';

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="card">
      <h3>Recent Transactions</h3>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.category}</td>
              <td>
                <span className={t.type === 'expense' ? 'text-expense' : 'text-income'}>
                  {t.type}
                </span>
              </td>
              <td>${t.amount.toFixed(2)}</td>
              <td>
                <button onClick={() => onDelete(t.id)} className="delete-btn">
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;