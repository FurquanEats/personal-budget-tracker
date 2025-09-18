// In frontend/src/components/MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="main-content">
        <Outlet /> {/* Child routes will be rendered here */}
      </div>
    </>
  );
};

export default MainLayout;