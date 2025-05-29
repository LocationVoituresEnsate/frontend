import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Supposons que tu récupères le rôle utilisateur via un contexte, un hook ou localStorage
const getUserRole = () => {
  // Exemple simple : récupérer depuis localStorage
  return localStorage.getItem('userRole'); // ex: 'admin', 'manager', ...
};

const AdminRoute = () => {
  const role = getUserRole();

  if (role !== 'admin') {
    // Redirige vers page de connexion ou une autre page (ex: 403)
    return <Navigate to="/login" replace />;
  }

  // Si admin, rendre les routes enfants
  return <Outlet />;
};

export default AdminRoute;
