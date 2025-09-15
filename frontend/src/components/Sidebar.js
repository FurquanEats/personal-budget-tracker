import React from 'react';
import { Link } from 'react-router-dom';
import { FiDollarSign, FiGrid, FiUsers } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const Sidebar = () => {
  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    color: '#f8fafc',
    textDecoration: 'none',
    padding: '0.75rem 0',
    fontSize: '1.1rem',
    gap: '1rem',
    opacity: 0.8,
    transition: 'opacity 0.2s'
  };

  return (
    <div className="sidebar">
      <div> {}
        <h1><FiDollarSign /> BudgetApp</h1>
        <nav>
          <Link to="/" style={linkStyle}><FiGrid /> Dashboard</Link>
          <Link to="/groups" style={linkStyle}><FiUsers /> Groups</Link>
        </nav>
      </div>
      <ThemeToggle /> {}
    </div>
  );
};

export default Sidebar;