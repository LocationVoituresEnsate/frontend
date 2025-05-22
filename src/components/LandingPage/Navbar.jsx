import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  BusinessCenter as ServicesIcon,
  Settings as FeaturesIcon,
  ContactSupport as ContactIcon,
  Login as LoginIcon,
  DirectionsCar as CarIcon
} from '@mui/icons-material';
import logo from '../../assets/logo.jpg';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNavigate = (path) => {
    if (path.startsWith('#')) {
      // Pour les ancres (sections de la page)
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    } else if (path === '/') {
      // Pour revenir au haut de la page (HeroSection)
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    } else {
      // Pour la navigation normale vers d'autres pages
      navigate(path);
    }
    setAnchorEl(null);
    console.log(`Navigating to: ${path}`);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigationItems = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Gestion Véhicules', path: '#services', icon: ServicesIcon },
    { label: 'Réservations', path: '#fonctionnalites', icon: FeaturesIcon },
    { label: 'Support', path: '#contact', icon: ContactIcon }
  ];

  return (
    <AppBar 
      position="fixed" 
      elevation={2}
      sx={{ 
        bgcolor: 'white', 
        color: 'text.primary',
        py: 0.5,
        zIndex: theme.zIndex.appBar,
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        px: { xs: 2, lg: 10 }
      }}>
        {/* Logo et titre */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.2s ease'
            }
          }}
          onClick={() => handleNavigate('/')}
        >
          <Avatar
            src={logo}
            alt="LocationVoitures"
            sx={{ 
              width: 50, 
              height: 50, 
              mr: 2,
              border: '2px solid',
              borderColor: 'primary.main'
            }}
          />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                lineHeight: 1
              }}
            >
              Location<span style={{ color: theme.palette.primary.main }}>Voitures</span>
            </Typography>
            
          </Box>
        </Box>

        {/* Navigation Links - Desktop */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.path}
                  startIcon={<IconComponent />}
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    color: 'text.primary',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 2,
                      bgcolor: 'primary.main',
                      transition: 'width 0.3s ease'
                    },
                    '&:hover': {
                      bgcolor: 'rgba(233, 30, 99, 0.05)',
                      color: 'primary.main',
                      '&::after': {
                        width: '80%'
                      }
                    }
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        )}

        {/* Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Login Button */}
          <Button
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={() => handleNavigate('/login')}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              textTransform: 'none',
              fontWeight: 'bold',
              px: 3,
              py: 1,
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'primary.dark',
                color: 'white',
                boxShadow: theme.shadows[4],
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Connexion
          </Button>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="end"
              color="primary"
              aria-label="menu"
              onClick={handleMenu}
              sx={{
                bgcolor: 'rgba(233, 30, 99, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(233, 30, 99, 0.2)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: 2,
              '& .MuiMenuItem-root': {
                px: 2,
                py: 1.5,
                borderRadius: 1,
                mx: 1,
                my: 0.5
              }
            }
          }}
        >
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <MenuItem
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                sx={{
                  '&:hover': {
                    bgcolor: 'rgba(233, 30, 99, 0.05)',
                    color: 'primary.main'
                  }
                }}
              >
                <IconComponent sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="body1">{item.label}</Typography>
              </MenuItem>
            );
          })}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;