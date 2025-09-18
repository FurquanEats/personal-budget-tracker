// In frontend/src/components/RecentActivity.js
import React from 'react';
import { FiBell } from 'react-icons/fi';

const RecentActivity = () => {
  // In the future, this could be populated with real data
  const activities = [
    "You added a new 'Groceries' expense.",
    "Your 'Bills' category is 80% of its budget.",
    "Welcome to BudgetApp!",
  ];

  return (
    <>
      <h3><FiBell /> Recent Activity</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem' }}>
        {activities.map((activity, index) => (
          <li key={index} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-default)' }}>
            {activity}
          </li>
        ))}
      </ul>
    </>
  );
};

export default RecentActivity;