// components/Dashboard/ManagerLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarManager from './SidebarManager';

const ManagerLayout = () => {
  return (
    <div className="flex">
      <SidebarManager />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ManagerLayout;