import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
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
  IconButton,
  Badge,
  Tooltip,
  Collapse
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  Notifications as NotificationIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const SidebarAdmin = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [openSections, setOpenSections] = useState({
    gestion: true,
    administration: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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
        'Content-Type': 'application/json', // parfois nécessaire même si pas de body
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
          <PersonIcon fontSize="large" />
        </Avatar>
        <Typography variant="body1" fontWeight="bold" color="text.primary">
          Admin Dashboard
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
          Espace administrateur
        </Typography>

        <Badge 
          badgeContent={7} 
          color="error" 
          sx={{ mt: 1, mx: 'auto', display: 'inline-flex' }}
        >
          <NotificationIcon color="action" fontSize="medium" />
        </Badge>
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

        {/* Section Gestion */}
        <Box sx={{ mt: 1 }}>
          <ListItem
            button
            onClick={() => toggleSection('gestion')}
            sx={{
              py: 0.25,
              borderRadius: 1,
              bgcolor: 'background.default'
            }}
          >
            <ListItemText
              primary="GESTION"
              primaryTypographyProps={{
                fontSize: '0.65rem',
                fontWeight: 600,
                color: 'text.secondary',
                letterSpacing: 0.5
              }}
            />
            <IconButton edge="end" size="small" sx={{ p: 0 }}>
              {openSections.gestion ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </IconButton>
          </ListItem>

          <Collapse in={openSections.gestion} timeout="auto" unmountOnExit>
            {/* Managers */}
            <ListItem
              component={NavLink}
              to="/admin/manager"
              sx={{
                pl: 2,
                borderRadius: 1,
                mt: 0.5,
                color: location.pathname === '/admin/manager' ? 'primary.main' : 'text.primary',
                bgcolor: location.pathname === '/admin/manager' ? `${theme.palette.primary.main}10` : 'transparent',
                '&:hover': {
                  bgcolor: location.pathname === '/admin/manager' ? `${theme.palette.primary.main}20` : 'action.hover'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}>
                <PeopleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Managers"
                primaryTypographyProps={{
                  fontSize: '0.8rem',
                  fontWeight: location.pathname === '/admin/manager' ? 600 : 400
                }}
              />
            </ListItem>
          </Collapse>
        </Box>

        {/* Section Administration */}
        <Box sx={{ mt: 1 }}>
          <ListItem
            button
            onClick={() => toggleSection('administration')}
            sx={{
              py: 0.25,
              borderRadius: 1,
              bgcolor: 'background.default'
            }}
          >
            <ListItemText
              primary="ADMINISTRATION"
              primaryTypographyProps={{
                fontSize: '0.65rem',
                fontWeight: 600,
                color: 'text.secondary',
                letterSpacing: 0.5
              }}
            />
            <IconButton edge="end" size="small" sx={{ p: 0 }}>
              {openSections.administration ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </IconButton>
          </ListItem>

          <Collapse in={openSections.administration} timeout="auto" unmountOnExit>
            {/* Exemples d'items Administration */}
            <ListItem
              component={NavLink}
              to="/admin/rapports"
              sx={{
                pl: 2,
                borderRadius: 1,
                mt: 0.5,
                color: location.pathname === '/admin/rapports' ? 'primary.main' : 'text.primary',
                bgcolor: location.pathname === '/admin/rapports' ? `${theme.palette.primary.main}10` : 'transparent',
                '&:hover': {
                  bgcolor: location.pathname === '/admin/rapports' ? `${theme.palette.primary.main}20` : 'action.hover'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}>
                <HistoryIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Rapports"
                primaryTypographyProps={{
                  fontSize: '0.8rem',
                  fontWeight: location.pathname === '/admin/rapports' ? 600 : 400
                }}
              />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/parametres"
              sx={{
                pl: 2,
                borderRadius: 1,
                mt: 0.5,
                color: location.pathname === '/admin/parametres' ? 'primary.main' : 'text.primary',
                bgcolor: location.pathname === '/admin/parametres' ? `${theme.palette.primary.main}10` : 'transparent',
                '&:hover': {
                  bgcolor: location.pathname === '/admin/parametres' ? `${theme.palette.primary.main}20` : 'action.hover'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Paramètres"
                primaryTypographyProps={{
                  fontSize: '0.8rem',
                  fontWeight: location.pathname === '/admin/parametres' ? 600 : 400
                }}
              />
            </ListItem>
          </Collapse>
        </Box>

        {/* Déconnexion */}
        <Divider sx={{ my: 1 }} />
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            color: 'text.primary',
            '&:hover': { bgcolor: theme.palette.action.hover }
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
