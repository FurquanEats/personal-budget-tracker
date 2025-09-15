import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h3>Recent Transactions</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th style={{ textAlign: 'left', padding: '8px' }}>Date</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Category</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Type</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{t.date}</td>
              <td style={{ padding: '8px' }}>{t.category}</td>
              <td style={{ padding: '8px', color: t.type === 'expense' ? 'red' : 'green' }}>
                {t.type}
              </td>
              <td style={{ padding: '8px' }}>${t.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;