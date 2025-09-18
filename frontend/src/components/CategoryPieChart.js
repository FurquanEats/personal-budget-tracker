// In frontend/src/components/CategoryPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ transactions }) => {
  // ... (logic for calculating expenseData remains the same)
  const expenseData = transactions.filter(t => t.type === 'expense').reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(expenseData),
    datasets: [{
      data: Object.values(expenseData),
      backgroundColor: ['#22d3ee', '#ec4899', '#4ade80', '#f59e0b', '#8b5cf6', '#ef4444'],
      borderWidth: 0,
    }],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false, // This is key to controlling the size
    plugins: { legend: { position: 'right' } }
  };

  return (
    <>
      <h3>Spending by Category</h3>
      {/* NEW: Container to control chart size */}
      <div style={{ position: 'relative', height: '300px' }}> 
        {Object.keys(expenseData).length > 0 ? (
          <Pie data={chartData} options={options} />
        ) : (
          <p style={{ textAlign: 'center', paddingTop: '4rem' }}>No expense data to display.</p>
        )}
      </div>
    </>
  );
};

export default CategoryPieChart;