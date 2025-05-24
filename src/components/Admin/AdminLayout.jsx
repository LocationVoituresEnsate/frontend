// components/Dashboard/ManagerLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin';

const AdminLayout = () => {
  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;