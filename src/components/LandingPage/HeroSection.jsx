import React, { useState, useEffect } from 'react';
import porscheImage from '../../assets/porsche-rouge.png';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  useTheme, 
  useMediaQuery,
  Fade,
  Grow,
  Zoom,
  Paper,
  Stack,
  Divider
} from '@mui/material';
import { 
  Login as LoginIcon,
  Dashboard as DashboardIcon,
  KeyboardArrowDown as ArrowDownIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrolled, setScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation au défilement
  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation de la voiture
  const [carHover, setCarHover] = useState(false);

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #fcf1f7 0%, #fde2ef 50%, #ffd6e6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 12, md: 10 }, // Padding-top pour compenser la navbar fixe
        pb: { xs: 8, md: 4 }
      }}
    >
      {/* Éléments décoratifs d'arrière-plan */}
      <Box 
        sx={{ 
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.4,
          zIndex: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,0,109,0.15) 0%, rgba(212,0,109,0) 70%)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,0,109,0.1) 0%, rgba(212,0,109,0) 70%)',
          }
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            minHeight: { xs: 'auto', md: '80vh' },
            gap: { xs: 4, md: 6 },
            transform: scrolled ? 'translateY(-20px)' : 'translateY(0)',
            transition: 'transform 0.5s ease-out',
          }}
        >
          {/* Texte et boutons - Côté gauche */}
          <Box sx={{ 
            flex: '1 1 50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            pr: { md: 4 },
            order: { xs: 2, md: 1 }
          }}>
            <Fade in={isLoaded} timeout={1000}>
              <Box>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                    mb: 2,
                    color: 'text.primary'
                  }}
                >
                  Location Simple et {' '}
                  <Box 
                    component="span" 
                    sx={{ 
                      position: 'relative', 
                      display: 'inline-block',
                      color: 'primary.main',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -8,
                        left: 0,
                        width: '100%',
                        height: 8,
                        bgcolor: 'primary.main',
                        borderRadius: 4,
                        animation: 'pulse 2s infinite'
                      },
                      '@keyframes pulse': {
                        '0%': { opacity: 0.7 },
                        '50%': { opacity: 1 },
                        '100%': { opacity: 0.7 }
                      }
                    }}
                  >
                   Abordable
                  </Box>
                </Typography>
                
                <Grow in={isLoaded} timeout={1500} style={{ transformOrigin: '0 0 0' }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 4, 
                      color: 'text.secondary',
                      maxWidth: '90%',
                      lineHeight: 1.6
                    }}
                  >
                    Plateforme complète pour les agences de location : gérez vos clients, optimisez vos réservations et maximisez vos revenus avec nos outils professionnels.
                  </Typography>
                </Grow>

                <Grow in={isLoaded} timeout={2000} style={{ transformOrigin: '0 0 0' }}>
                  <Stack 
                    direction={{ xs: "column", sm: "row" }} 
                    spacing={2} 
                    sx={{ mt: 4 }}
                  >
                    <Button 
                      variant="contained" 
                      size="large"
                      color="primary"
                      startIcon={<DashboardIcon />}
                      sx={{ 
                        px: 4, 
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '1rem',
                        boxShadow: theme.shadows[4],
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: theme.shadows[8],
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Accéder au Dashboard
                    </Button>
                  </Stack>
                </Grow>

                <Fade in={isLoaded} timeout={2500}>
                  <Box 
                    sx={{ 
                      mt: 6, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2 
                    }}
                  >
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        bgcolor: 'primary.main',
                        color: 'white',
                        boxShadow: '0 4px 8px rgba(212, 0, 109, 0.3)',
                        animation: 'bounce 2s infinite'
                      }}
                    >
                      <ArrowDownIcon />
                    </Box>
                    <Typography color="text.secondary" variant="body1">
                      Découvrez nos fonctionnalités de gestion
                    </Typography>
                  </Box>
                </Fade>
              </Box>
            </Fade>
          </Box>

          {/* Image de voiture - Côté droit */}
          <Box sx={{ 
            flex: '1 1 50%',
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            order: { xs: 1, md: 2 }
          }}>
            <Zoom in={isLoaded} timeout={800}>
              <Box 
                sx={{ 
                  position: 'relative',
                  width: '100%',
                  maxWidth: { xs: '400px', md: '550px' },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: -20,
                    left: '10%',
                    width: '80%',
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: 'rgba(0,0,0,0.1)',
                    filter: 'blur(10px)',
                    zIndex: -1
                  }
                }}
                onMouseEnter={() => setCarHover(true)}
                onMouseLeave={() => setCarHover(false)}
              >
                <img 
                  src={porscheImage} 
                  alt="Porsche cabriolet rouge - Gestion de flotte" 
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    transform: carHover ? 'scale(1.05) translateY(-10px)' : 'scale(1) translateY(0)',
                    transition: 'transform 0.4s ease-out',
                    filter: carHover ? 'drop-shadow(0 20px 20px rgba(0,0,0,0.2))' : 'drop-shadow(0 10px 10px rgba(0,0,0,0.1))'
                  }}
                />
                
                {/* Badge professionnel */}
                <Paper 
                  elevation={3}
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: { xs: 50, md: 30 },
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.main',
                    color: 'white',
                    p: 2,
                    animation: carHover ? 'rotate 10s linear infinite' : 'none',
                    '@keyframes rotate': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' }
                    }
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold" fontSize="0.75rem">SOLUTION</Typography>
                  <Typography variant="h6" fontWeight="bold" fontSize="0.9rem">PRO</Typography>
                </Paper>
              </Box>
            </Zoom>
          </Box>
        </Box>

        {/* Bande d'avantages pour agences */}
        <Fade in={isLoaded} timeout={2000}>
          <Paper 
            elevation={2}
            sx={{ 
              mt: { xs: 2, md: 4 },
              py: 2,
              px: 3,
              borderRadius: 2,
              bgcolor: 'white',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2
            }}
          >
            {[
              { icon: SpeedIcon, text: 'Dashboard temps réel' },
              { icon: BarChartIcon, text: 'Rapports détaillés' },
              { icon: SettingsIcon, text: 'Gestion automatisée' },
              { icon: LoginIcon, text: 'Accès sécurisé' }
            ].map((feature, index) => (
              <React.Fragment key={index}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  py: { xs: 1, md: 0 },
                  color: 'text.primary'
                }}>
                  <Box sx={{ mr: 1 }}>
                    <feature.icon color="primary" />
                  </Box>
                  <Typography variant="body1" fontWeight="medium">{feature.text}</Typography>
                </Box>
                {index < 3 && (
                  <Divider 
                    orientation={isMobile ? "horizontal" : "vertical"} 
                    flexItem 
                    sx={{ display: { xs: 'none', md: 'block' } }} 
                  />
                )}
              </React.Fragment>
            ))}
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default HeroSection;