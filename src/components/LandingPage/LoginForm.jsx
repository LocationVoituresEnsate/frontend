import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Container,
  InputAdornment,
  IconButton,
  Alert,
  Fade,
  Chip
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon
} from '@mui/icons-material';

const LoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'une requête de connexion
    console.log("Tentative de connexion avec:", credentials);
    
    // Simulation d'un délai de connexion
    setTimeout(() => {
      setIsLoading(false);
      navigate("/manager");
    }, 1000);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fcf1f7 0%, #fde2ef 50%, #ffd6e6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Bouton de retour vers la page principale */}
      <Button
        onClick={() => navigate('/')}
        startIcon={<HomeIcon />}
        variant="outlined"
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          color: 'primary.main',
          borderColor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.main',
            color: 'white',
            borderColor: 'primary.main'
          },
          zIndex: 10,
          backdropFilter: 'blur(10px)'
        }}
      >
        Accueil
      </Button>
      {/* Éléments décoratifs d'arrière-plan */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: { xs: 200, md: 300 },
          height: { xs: 200, md: 300 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233, 30, 99, 0.1) 0%, rgba(233, 30, 99, 0) 70%)',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' }
          }
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: { xs: 150, md: 200 },
          height: { xs: 150, md: 200 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233, 30, 99, 0.08) 0%, rgba(233, 30, 99, 0) 70%)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}
      />

      <Container maxWidth="xs">
        <Fade in={true} timeout={800}>
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              maxWidth: 380,
              mx: 'auto'
            }}
          >
            {/* Élément décoratif en haut à droite */}
            <Box
              sx={{
                position: 'absolute',
                top: -30,
                right: -30,
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, rgba(233, 30, 99, 0.1) 0%, rgba(233, 30, 99, 0.2) 100%)',
                zIndex: 0
              }}
            />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              {/* En-tête */}
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 'bold',
                    color: 'text.primary',
                    mb: 1
                  }}
                >
                  Connexion
                </Typography>
                
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 1.5 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 500
                    }}
                  >
                    Accédez à votre compte
                  </Typography>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -6,
                      left: 0,
                      width: '100%',
                      height: 2,
                      background: 'linear-gradient(90deg, transparent 0%, #e91e63 50%, transparent 100%)',
                      borderRadius: 1
                    }}
                  />
                </Box>

               
              </Box>

              {/* Formulaire */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
              >
                <TextField
                  name="email"
                  type="email"
                  label="Adresse email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  required
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      }
                    }
                  }}
                />

                <TextField
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Mot de passe"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  fullWidth
                  variant="outlined"
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    style: { 
                      WebkitTextSecurity: showPassword ? 'none' : 'disc' 
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      }
                    },
                    '& input[type="password"]::-ms-reveal': {
                      display: 'none'
                    },
                    '& input[type="password"]::-webkit-credentials-auto-fill-button': {
                      display: 'none'
                    },
                    '& input[type="password"]::-webkit-strong-password-auto-fill-button': {
                      display: 'none'
                    }
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isLoading}
                  startIcon={<LoginIcon />}
                  sx={{
                    py: 1.2,
                    fontSize: '0.95rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #e91e63 30%, #f06292 90%)',
                    boxShadow: '0 3px 8px rgba(233, 30, 99, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #c2185b 30%, #e91e63 90%)',
                      boxShadow: '0 6px 16px rgba(233, 30, 99, 0.4)',
                      transform: 'translateY(-2px)'
                    },
                    '&:disabled': {
                      background: 'linear-gradient(45deg, #e91e63 30%, #f06292 90%)',
                      opacity: 0.7
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isLoading ? 'Connexion...' : 'Connexion'}
                </Button>
              </Box>

              {/* Lien d'inscription */}
              <Box sx={{ mt: 2.5, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Vous n'avez pas de compte ?{' '}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/register");
                    }}
                    sx={{
                      color: 'primary.main',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      '&:hover': {
                        color: 'primary.dark',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    <RegisterIcon fontSize="small" />
                    Inscrivez-vous
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default LoginForm;