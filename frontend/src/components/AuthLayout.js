// In frontend/src/components/AuthLayout.js

import React from 'react';
import { FiDollarSign } from 'react-icons/fi';

// This component will provide the centered container for our forms
const AuthLayout = ({ title, children }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <FiDollarSign />
          <h3>{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;