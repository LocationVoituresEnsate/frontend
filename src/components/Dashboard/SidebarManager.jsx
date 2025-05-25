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
  Group as GroupIcon,
  DirectionsCar as CarIcon,
  CalendarToday as CalendarIcon,
  Assignment as AssignmentIcon,
  ManageAccounts as ManageAccountsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';

const SidebarManager = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate(); // Utilisation de useNavigate pour rediriger
  const [openSections, setOpenSections] = useState({
    gestion: true,
    administration: false  // Administration section fermée par défaut
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
        localStorage.clear(); // Effacer le token et les données utilisateur
        navigate('/login');  // Rediriger vers la page de connexion
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
      {/* En-tête compact */}
      <Box sx={{ p: 1.5, pb: 1, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Avatar 
            sx={{ 
              width: 48, 
              height: 48, 
              bgcolor: `${theme.palette.primary.main}15`,
              color: theme.palette.primary.main
            }}
          >
            <PersonIcon fontSize="small" />
          </Avatar>
        </Box>
        
        <Typography variant="body2" fontWeight="bold" sx={{ mt: 0.5, color: 'text.primary' }}>
          Dashboard Manager
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
          Espace administration
        </Typography>
      </Box>
      
      <Divider />
      
      {/* Navigation compacte */}
      <List dense sx={{ pt: 0.5, flex: 1, px: 1 }}>
        {/* Dashboard */}
        <ListItem 
          component={NavLink} 
          to="/manager" 
          end
          sx={{ 
            borderRadius: 1, 
            mb: 0.5,
            color: location.pathname === '/manager' ? 'primary.main' : 'text.primary',
            bgcolor: location.pathname === '/manager' ? `${theme.palette.primary.main}10` : 'transparent',
            '&:hover': {
              bgcolor: location.pathname === '/manager' ? `${theme.palette.primary.main}20` : 'action.hover'
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
              fontWeight: location.pathname === '/manager' ? 600 : 400
            }} 
          />
          <Badge badgeContent={3} color="success" size="small" />
        </ListItem>
        
        {/* Section GESTION */}
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
          
          <Collapse in={openSections.gestion} timeout="auto">
            {/* Clients */}
            <ListItem 
              component={NavLink} 
              to="/manager/clients" 
              sx={{ 
                pl: 2, 
                borderRadius: 1, 
                mt: 0.5,
                color: location.pathname === '/manager/clients' ? 'primary.main' : 'text.primary',
                bgcolor: location.pathname === '/manager/clients' ? `${theme.palette.primary.main}10` : 'transparent',
                '&:hover': {
                  bgcolor: location.pathname === '/manager/clients' ? `${theme.palette.primary.main}20` : 'action.hover'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}>
                <GroupIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Gestion des clients" 
                primaryTypographyProps={{ 
                  fontSize: '0.8rem',
                  fontWeight: location.pathname === '/manager/clients' ? 600 : 400
                }} 
              />
            </ListItem>
            
            {/* Voitures */}
            <ListItem 
              component={NavLink} 
              to="/manager/voitures" 
              sx={{ 
                pl: 2, 
                borderRadius: 1, 
                mt: 0.5,
                color: location.pathname === '/manager/voitures' ? 'primary.main' : 'text.primary',
                bgcolor: location.pathname === '/manager/voitures' ? `${theme.palette.primary.main}10` : 'transparent',
                '&:hover': {
                  bgcolor: location.pathname === '/manager/voitures' ? `${theme.palette.primary.main}20` : 'action.hover'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}>
                <CarIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Gestion des voitures" 
                primaryTypographyProps={{ 
                  fontSize: '0.8rem',
                  fontWeight: location.pathname === '/manager/voitures' ? 600 : 400
                }} 
              />
              <Badge badgeContent={2} color="warning" size="small" />
            </ListItem>
            
            {/* Réservations */}
            <ListItem 
              component={NavLink} 
              to="/manager/reservations" 
              sx={{ 
                pl: 2, 
                borderRadius: 1, 
                mt: 0.5,
                color: location.pathname === '/manager/reservations' ? 'primary.main' : 'text.primary',
                bgcolor: location.pathname === '/manager/reservations' ? `${theme.palette.primary.main}10` : 'transparent',
                '&:hover': {
                  bgcolor: location.pathname === '/manager/reservations' ? `${theme.palette.primary.main}20` : 'action.hover'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}>
                <CalendarIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Gestion des réservations" 
                primaryTypographyProps={{ 
                  fontSize: '0.8rem',
                  fontWeight: location.pathname === '/manager/reservations' ? 600 : 400
                }} 
              />
              <Badge badgeContent={5} color="error" size="small" />
            </ListItem>
          </Collapse>
        </Box>
        
        {/* Section ADMINISTRATION */}
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
          
          <Collapse in={openSections.administration} timeout="auto">
            {/* Rapports */}
            <ListItem 
              component={NavLink} 
              to="/manager/rapports" 
              sx={{ 
                pl: 2, 
                borderRadius: 1, 
                mt: 0.5,
                color: location.pathname === '/manager/rapports' ? 'primary.main' : 'text.primary',
                bgcolor: location.pathname === '/manager/rapports' ? `${theme.palette.primary.main}10` : 'transparent',
                '&:hover': {
                  bgcolor: location.pathname === '/manager/rapports' ? `${theme.palette.primary.main}20` : 'action.hover'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}>
                <AssignmentIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Rapports" 
                primaryTypographyProps={{ 
                  fontSize: '0.8rem',
                  fontWeight: location.pathname === '/manager/rapports' ? 600 : 400
                }} 
              />
            </ListItem>
            
            {/* Paramètres */}
            <ListItem 
              component={NavLink} 
              to="/manager/parametres" 
              sx={{ 
                pl: 2, 
                borderRadius: 1, 
                mt: 0.5,
                color: location.pathname === '/manager/parametres' ? 'primary.main' : 'text.primary',
                bgcolor: location.pathname === '/manager/parametres' ? `${theme.palette.primary.main}10` : 'transparent',
                '&:hover': {
                  bgcolor: location.pathname === '/manager/parametres' ? `${theme.palette.primary.main}20` : 'action.hover'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}>
                <ManageAccountsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Paramètres" 
                primaryTypographyProps={{ 
                  fontSize: '0.8rem',
                  fontWeight: location.pathname === '/manager/parametres' ? 600 : 400
                }} 
              />
            </ListItem>
          </Collapse>
        </Box>

        <Divider sx={{ my: 1 }} />
        
        {/* Logout */}
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
      
      {/* Footer très compact */}
      <Box 
        sx={{ 
          p: 1.5, 
          pt: 1, 
          borderTop: `1px solid ${theme.palette.divider}`,
          mt: 'auto'
        }}
      >
        <Tooltip title="LocationVoitures">
          <Box sx={{ position: 'relative' }}>
            <Typography 
              variant="body2" 
              fontWeight="medium" 
              color="primary.main"
              sx={{ fontSize: '0.75rem' }}
            >
              LocationVoitures
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

export default SidebarManager;
