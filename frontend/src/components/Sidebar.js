// In frontend/src/components/Sidebar.js
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FiDollarSign, FiGrid, FiUsers, FiSun, FiMoon } from 'react-icons/fi';
import { ThemeContext } from '../context/ThemeContext';

const Sidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-header">
          <FiDollarSign /> BudgetApp
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/"><FiGrid /> Dashboard</NavLink>
          <NavLink to="/groups"><FiUsers /> Groups</NavLink>
        </nav>
      </div>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? <FiMoon /> : <FiSun />}
        <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
      </button>
    </div>
  );
};

export default Sidebar;