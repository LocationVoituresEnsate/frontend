import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { 
  Tooltip,
  Box, 
  Paper, 
  Typography, 
  Avatar, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  useTheme,
  IconButton
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const SidebarAdmin = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Aucun token trouvé, impossible de se déconnecter.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/logout/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.clear();
        navigate('/login');
      } else {
        console.error('Erreur lors de la déconnexion', await response.text());
      }
    } catch (error) {
      console.error('Erreur réseau lors de la déconnexion', error);
    }
  };

  return (
    <Paper 
      elevation={0} 
      square 
      sx={{ 
        width: 240,
        minHeight: '100vh',
        borderRight: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Avatar 
          sx={{ 
            width: 48, 
            height: 48, 
            bgcolor: `${theme.palette.primary.main}20`,
            color: theme.palette.primary.main,
            mx: 'auto',
            mb: 1
          }}
        >
          <PeopleIcon fontSize="large" />
        </Avatar>
        <Typography variant="body1" fontWeight="bold" color="text.primary">
          Admin Dashboard
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
          Espace administrateur
        </Typography>
      </Box>

      <Divider />

      {/* Navigation */}
      <List dense sx={{ flex: 1, px: 1 }}>
        {/* Dashboard */}
        <ListItem
          component={NavLink}
          to="/admin"
          end
          sx={{
            borderRadius: 1,
            mb: 0.5,
            color: location.pathname === '/admin' ? 'primary.main' : 'text.primary',
            bgcolor: location.pathname === '/admin' ? `${theme.palette.primary.main}10` : 'transparent',
            '&:hover': {
              bgcolor: location.pathname === '/admin' ? `${theme.palette.primary.main}20` : 'action.hover'
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary="Dashboard"
            primaryTypographyProps={{ 
              fontSize: '0.85rem',
              fontWeight: location.pathname === '/admin' ? 600 : 400
            }}
          />
        </ListItem>

        {/* Manager */}
        <ListItem
          component={NavLink}
          to="/admin/manager"
          sx={{
            borderRadius: 1,
            mb: 0.5,
            color: location.pathname === '/admin/manager' ? 'primary.main' : 'text.primary',
            bgcolor: location.pathname === '/admin/manager' ? `${theme.palette.primary.main}10` : 'transparent',
            '&:hover': {
              bgcolor: location.pathname === '/admin/manager' ? `${theme.palette.primary.main+'10'}` : 'action.hover'
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
            <PeopleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary="Managers"
            primaryTypographyProps={{ 
              fontSize: '0.85rem',
              fontWeight: location.pathname === '/admin/manager' ? 600 : 400
            }}
          />
        </ListItem>

        {/* Déconnexion */}
        <Divider sx={{ my: 1 }} />
        <ListItem
          button
          component={NavLink}
          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            color: 'text.primary',
            '&:hover': { bgcolor: theme.palette.primary.main+'10' }
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Déconnexion"
            primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 400 }}
          />
        </ListItem>
      </List>

      {/* Footer */}
      <Box
        sx={{
          p: 1.5,
          pt: 1,
          borderTop: `1px solid ${theme.palette.divider}`,
          mt: 'auto'
        }}
      >
        <Tooltip title="Admin Panel">
          <Box sx={{ position: 'relative' }}>
            <Typography
              variant="body2"
              fontWeight="medium"
              color="primary.main"
              sx={{ fontSize: '0.75rem' }}
            >
              AdminPanel
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                bottom: -2,
                left: 0,
                width: 80,
                height: 1.5,
                bgcolor: 'primary.main',
                borderRadius: 1
              }}
            />
          </Box>
        </Tooltip>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: '0.65rem', display: 'block', mt: 0.5 }}
        >
          Version 1.0
        </Typography>
      </Box>
    </Paper>
  );
};

export default SidebarAdmin;
