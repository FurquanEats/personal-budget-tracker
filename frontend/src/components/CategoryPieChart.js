import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ transactions }) => {
  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});

  const chartData = {
    labels: Object.keys(expenseData),
    datasets: [{
      data: Object.values(expenseData),
      backgroundColor: ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'],
      borderWidth: 0,
    }],
  };
  
  const options = { plugins: { legend: { position: 'bottom' } } };

  return (
    <div className="card">
      <h3>Spending by Category</h3>
      {Object.keys(expenseData).length > 0 ? (
        <Pie data={chartData} options={options} />
      ) : (
        <p>No expense data to display.</p>
      )}
    </div>
  );
};

export default CategoryPieChart;