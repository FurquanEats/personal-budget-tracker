import React from 'react';

const Summary = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const summaryStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '30px',
    textAlign: 'center'
  };

  const boxStyle = {
    padding: '20px',
    borderRadius: '8px',
    color: 'white',
    minWidth: '150px'
  };

  return (
    <div style={summaryStyle}>
      <div style={{ ...boxStyle, backgroundColor: '#28a745' }}>
        <h4>Total Income</h4>
        <p>${totalIncome.toFixed(2)}</p>
      </div>
      <div style={{ ...boxStyle, backgroundColor: '#dc3545' }}>
        <h4>Total Expense</h4>
        <p>${totalExpense.toFixed(2)}</p>
      </div>
      <div style={{ ...boxStyle, backgroundColor: '#007bff' }}>
        <h4>Balance</h4>
        <p>${balance.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Summary;