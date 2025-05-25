import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid, LinearProgress, Avatar, Tooltip } from '@mui/material';
import {
  People as PeopleIcon,
  CarRental as CarIcon,
  Event as EventIcon,
  AttachMoney as MoneyIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const DashboardAdminStats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [managerCount, setManagerCount] = useState(0); // Pour stocker le nombre de managers

  // Récupérer le nombre de managers depuis l'API
  const fetchManagerCount = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/manager/count/');
      if (response.ok) {
        const data = await response.json();
        setManagerCount(data.manager_count); // Met à jour le nombre de managers
      } else {
        console.error('Erreur lors de la récupération du nombre de managers');
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [clientCount, setClientCount] = useState(0);


  const fetchClientCount = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/customer/count/');
    if (response.ok) {
      const data = await response.json();
      setClientCount(data.client_count);
    } else {
      console.error('Erreur lors de la récupération du nombre de clients');
    }
  } catch (error) {
    console.error('Erreur réseau', error);
  }
};


  // Effectuer la récupération des données au chargement du composant
  useEffect(() => {
    fetchManagerCount();
    fetchClientCount();
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      fetchManagerCount();
      fetchClientCount();
       // Rafraîchir le nombre de managers
      setIsLoading(false);
    }, 1500);
  };

  // Statistiques globales
  const stats = [
    { id: 1, title: 'Managers', value: managerCount, icon: <PeopleIcon />, color: { bg: '#e3f2fd', text: '#1976d2' } },
    { id: 2, title: 'Total voitures', value: '350', icon: <CarIcon />, color: { bg: '#e8f5e9', text: '#2e7d32' } },
    { id: 3, title: 'Réservations totales', value: '4800', icon: <EventIcon />, color: { bg: '#f3e5f5', text: '#7b1fa2' } },
    { id: 4, title: 'Revenus totaux', value: '125K €', icon: <MoneyIcon />, color: { bg: '#fff8e1', text: '#ff8f00' } },
    { id: 5, title: 'Clients', value: clientCount, icon: <PeopleIcon />, color: { bg: '#e3f2fd', text: '#1976d2' } }
  ];

  return (
    <Box sx={{ p: 3, pb: 5, bgcolor: 'grey.50', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
      {isLoading && (
        <LinearProgress
          sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, height: 4, bgcolor: 'primary.light' }}
          color="primary"
        />
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary" letterSpacing={1}>
          Tableau de bord Administrateur
        </Typography>
        <Avatar
          sx={{ bgcolor: 'primary.main', cursor: 'pointer', boxShadow: 3, width: 40, height: 40 }}
          onClick={handleRefresh}
          title="Rafraîchir"
        >
          <RefreshIcon />
        </Avatar>
      </Box>

      {/* Statistiques globales */}
      <Grid container spacing={3} mb={6}>
        {stats.map(stat => (
          <Grid item xs={12} sm={6} md={3} key={stat.id}>
            <Paper
              elevation={4}
              sx={{
                p: 5,
                borderRadius: 4,
                height: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'default',
                transition: 'box-shadow 0.3s ease',
                '&:hover': { boxShadow: 9 },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ letterSpacing: 0.8, textTransform: 'uppercase' }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h3" fontWeight={900} color="text.primary" sx={{ mt: 1, letterSpacing: 1 }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: stat.color.bg,
                    color: stat.color.text,
                    width: 60,
                    height: 60,
                    boxShadow: '0 0 15px ' + stat.color.bg,
                    fontSize: 34,
                  }}
                >
                  {stat.icon}
                </Avatar>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardAdminStats;
