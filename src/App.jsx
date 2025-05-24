import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

// Components imports
import Navbar from './components/LandingPage/Navbar';
import HeroSection from './components/LandingPage/HeroSection';
import StepsSection from './components/LandingPage/StepsSection';
import Footer from './components/LandingPage/Footer';
import LoginForm from './components/LandingPage/LoginForm';
import RegisterForm from './components/LandingPage/RegisterForm';
import ManagerLayout from './components/Dashboard/ManagerLayout';
import AdminLayout from './components/Admin/AdminLayout';
import DashboardManager from './components/Dashboard/DashboardManager';
import DashboardAdmin from './components/Admin/DashboardAdmin';
import ClientManager from './components/Dashboard/ClientsManager';

// Thème Material-UI personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: '#e91e63', // Rose/Fuchsia
      light: '#f8bbd0',
      dark: '#c2185b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#c1c1c1', // Gris
      light: '#f5f5f5',
      dark: '#9e9e9e',
    },
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});import ManagersAdmin from './components/Admin/ManagersAdmin';
import ReservationsManager from './components/ReservationsManager';


// Page d'accueil principale
const Home = () => (
  <>
    <HeroSection />
    <StepsSection />
  </>
);

// Conteneur avec navbar et footer - Version Material-UI
const MainLayout = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      width: '100%',
      bgcolor: 'background.default'
    }}
  >
    <Navbar />
    <Box 
      component="main" 
      sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Outlet />
    </Box>
    <Footer />
  </Box>
);

// Pages placeholder avec style Material-UI
const PlaceholderPage = ({ title, description }) => (
  <Box 
    sx={{ 
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      pt: { xs: 12, md: 10 }, // Compensation navbar fixe
      px: 3,
      textAlign: 'center',
      bgcolor: 'background.default'
    }}
  >
    <Box
      sx={{
        p: 4,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: 2,
        maxWidth: 500
      }}
    >
      <h1 style={{ 
        color: '#e91e63', 
        marginBottom: '16px',
        fontSize: '2rem',
        fontWeight: 'bold'
      }}>
        {title}
      </h1>
      <p style={{ 
        color: '#666666',
        fontSize: '1.1rem',
        margin: 0
      }}>
        {description}
      </p>
    </Box>
  </Box>
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Layout principal avec navbar et footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route 
            path="/services" 
            element={
              <PlaceholderPage 
                title="Services" 
                description="Cette section détaillera tous nos services de location de véhicules. Page en cours de développement."
              />
            } 
          />
          <Route 
            path="/fonctionnalites" 
            element={
              <PlaceholderPage 
                title="Fonctionnalités" 
                description="Découvrez toutes les fonctionnalités avancées de notre plateforme de gestion. Page en cours de développement."
              />
            } 
          />
          <Route 
            path="/contact" 
            element={
              <PlaceholderPage 
                title="Contact" 
                description="Contactez notre équipe pour toute question ou demande d'assistance. Page en cours de développement."
              />
            } 
          />
          <Route path="/register" element={<RegisterForm />} />
        </Route>
        
        {/* Pages sans navbar ni footer */}
        <Route path="/login" element={<LoginForm />} />
        
        {/* Routes du dashboard - sans navbar ni footer */}
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<DashboardManager />} />
          <Route path="clients" element={<ClientManager />} />
          <Route 
            path="voitures" 
            element={
              <Box sx={{ p: 3 }}>
                <h1 style={{ color: '#e91e63' }}>Gestion des Véhicules</h1>
                <p>Module de gestion de la flotte automobile en cours de développement.</p>
              </Box>
            } 
          />
                  <Route path="reservations" element={<ReservationsManager/>} />

          <Route 
            path="rapports" 
            element={
              <Box sx={{ p: 3 }}>
                <h1 style={{ color: '#e91e63' }}>Rapports et Analyses</h1>
                <p>Module de reporting et d'analyse des performances en cours de développement.</p>
              </Box>
            } 
          />
          <Route 
            path="parametres" 
            element={
              <Box sx={{ p: 3 }}>
                <h1 style={{ color: '#e91e63' }}>Paramètres</h1>
                <p>Configuration et paramètres de l'application en cours de développement.</p>
              </Box>
            } 
          />
        </Route>

      {/* Route dashboard pour admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardAdmin />} />
        <Route path="manager"  element={<ManagersAdmin/>} />
      
      </Route>

      
        
        
      </Routes>
    </ThemeProvider>
  );
};

export default App;