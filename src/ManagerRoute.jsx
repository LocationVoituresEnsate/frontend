import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const getUserRole = () => localStorage.getItem('userRole');

const ManagerRoute = () => {
  const role = getUserRole();

  if (role !== 'manager') {
    // Redirige vers login ou page interdite si pas manager
    return <Navigate to="/login" replace />;
  }

  // Rendre ManagerLayout ET les routes enfants via Outlet
  return <Outlet />;
};

export default ManagerRoute;
