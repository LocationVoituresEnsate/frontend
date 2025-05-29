import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Divider,
  useTheme,
  IconButton,
  Avatar,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  DirectionsCar as CarIcon,
  Event as EventIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  ShowChart as ChartIcon,
  TrendingUp as TrendingUpIcon,
  ArrowDropUp as ArrowUpIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';

const DashboardManager = () => {
  const theme = useTheme();

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Stats data
  const [clientCount, setClientCount] = useState(null);
  const [countVoitures, setCountVoitures] = useState(null);
  const [revenuAnnee, setRevenuAnnee] = useState(null);
  const [countPending, setCountPending] = useState(null);

  // Dynamic Data
  const [recentReservations, setRecentReservations] = useState([]);
  const [topVehicles, setTopVehicles] = useState([]);

  // Format currency
  const formatCurrency = (value) => {
    if (value === null) return '...';
    return value.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' });
  };

  // Fetch All Data
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch('http://localhost:8000/customer/count/').then(res => res.json()),
      fetch('http://localhost:8000/voitures/count/').then(res => res.json()),
      fetch('http://localhost:8000/reservations/revenu-par-annee/').then(res => res.json()),
      fetch('http://localhost:8000/reservations/pending-count/').then(res => res.json()),
      fetch('http://localhost:8000/reservations/recent/') // Recent Reservations
        .then(res => res.json())
        .then(data => data.recent_reservations || []),
      fetch('http://localhost:8000/reservations/top-vehicles/') // Top Vehicles
        .then(res => res.json())
        .then(data => data.vehicles || [])
    ])
      .then(([clientData, voitureData, revenuData, countPendingData, recentReservationsData, topVehiclesData]) => {
        setClientCount(clientData.client_count);
        setCountVoitures(voitureData.count_voitures);
        setCountPending(countPendingData.pending_reservations_count);
        setRevenuAnnee(revenuData.total_revenu);
        setRecentReservations(recentReservationsData);
        setTopVehicles(topVehiclesData);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement :', err);
        setError('Erreur lors du chargement des données');
        setIsLoading(false);
      });
  }, []);

  // Simulate refresh
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  // Static Graph Data
  const bookingData = [20, 35, 15, 45, 30, 50, 25];
  const revenueData = [
    { month: 'Jan', value: 5200 },
    { month: 'Fév', value: 6800 },
    { month: 'Mar', value: 7500 },
    { month: 'Avr', value: 8900 },
    { month: 'Mai', value: 9750 },
    { month: 'Juin', value: 0 },
    { month: 'Juil', value: 0 }
  ];

  // Stat Cards
  const stats = [
    { id: 1, title: 'Voitures disponibles', value: countVoitures !== null ? countVoitures : '...', change: '+2', icon: <CarIcon />, color: { bg: '#e8f5e9', text: '#2e7d32' } },
    { id: 2, title: 'Réservations en attente', value: countPending !== null ? countPending : '...', change: '+8', icon: <EventIcon />, color: { bg: '#e3f2fd', text: '#1976d2' } },
    { id: 3, title: 'Nouveaux clients', value: clientCount !== null ? clientCount : '...', change: '', icon: <PeopleIcon />, color: { bg: '#f3e5f5', text: '#7b1fa2' } },
    { id: 4, title: 'Revenus du mois', value: formatCurrency(revenuAnnee), change: '+12%', icon: <MoneyIcon />, color: { bg: '#fff8e1', text: '#ff8f00' } }
  ];

  return (
    <Box sx={{ p: 3, pb: 5, bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Loading Indicator */}
      {isLoading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            height: 3
          }}
        />
      )}

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
            Dashboard Manager
          </Typography>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Typography variant="h6" sx={{ color: 'primary.main' }}>
              Bienvenue dans votre espace de gestion
            </Typography>
            <Box
              component="span"
              sx={{
                position: 'absolute',
                bottom: -5,
                left: 0,
                width: '100%',
                height: 3,
                bgcolor: 'primary.main',
                borderRadius: 5
              }}
            />
          </Box>
        </Box>
        <Box>
          <Tooltip title="Rafraîchir les données">
            <IconButton color="primary" onClick={handleRefresh} disabled={isLoading}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Plus d'options">
            <IconButton color="default">
              <MoreIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map(stat => (
          <Grid item xs={12} sm={6} md={3} key={stat.id}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: 3
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 0.5, color: 'text.primary' }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: stat.color.bg, color: stat.color.text }}>{stat.icon}</Avatar>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 'medium',
                    color: 'success.main',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {stat.change}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Recent Reservations Table */}
      <Paper elevation={1} sx={{ width: '100%', borderRadius: 2, overflow: 'hidden', mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Réservations récentes
          </Typography>
          <Button color="primary" endIcon={<TrendingUpIcon />} sx={{ textTransform: 'none' }}>
            Voir toutes
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 500 }}>Client</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 500 }}>Voiture</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 500 }}>Période</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 500 }}>Prix</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 500 }}>Statut</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentReservations.map(reservation => (
                <TableRow
                  key={reservation.id}
                  sx={{
                    '&:hover': {
                      bgcolor: `${theme.palette.primary.main}08`,
                      cursor: 'pointer'
                    },
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <TableCell sx={{ fontWeight: 'medium' }}>{reservation.client_name}</TableCell>
                  <TableCell>{reservation.car_name}</TableCell>
                  <TableCell>{`${reservation.start_date} - ${reservation.end_date}`}</TableCell>
                  <TableCell>{formatCurrency(reservation.total_price)}</TableCell>
                  <TableCell>
                    <Chip
                      label={reservation.status}
                      color={
                        reservation.status === 'Terminée'
                          ? 'success'
                          : reservation.status === 'en cours'
                          ? 'info'
                          : 'default'
                      }
                      size="small"
                      sx={{ fontWeight: 'medium' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Charts Section */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, width: '100%' }}>
        {/* Booking Activity Chart */}
        <Paper elevation={1} sx={{ p: 3, borderRadius: 2, flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', display: 'flex', alignItems: 'center' }}>
              Activité de réservation
              <Box component="span" sx={{ ml: 1, color: '#f06292', fontSize: '1.2rem' }}>📈</Box>
            </Typography>
          </Box>
          <Box sx={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 0.5 }}>
            {bookingData.map((height, index) => (
              <Tooltip key={index} title={`${height} réservations`} placement="top">
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: height * 3,
                      bgcolor: '#f06292',
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 4,
                      transition: 'all 0.3s',
                      '&:hover': {
                        bgcolor: '#ec407a',
                        transform: 'scaleY(1.05)',
                        transformOrigin: 'bottom'
                      }
                    }}
                  ></Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                    J{index + 1}
                  </Typography>
                </Box>
              </Tooltip>
            ))}
          </Box>
        </Paper>

        {/* Monthly Revenue Chart */}
        <Paper elevation={1} sx={{ p: 3, borderRadius: 2, flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', display: 'flex', alignItems: 'center' }}>
              Revenus mensuels
              <Box component="span" sx={{ ml: 1, color: '#f06292', fontSize: '1.2rem' }}>💰</Box>
            </Typography>
          </Box>
          <Box sx={{ height: 200, position: 'relative' }}>
            {[0, 1, 2, 3, 4].map(line => (
              <Box
                key={line}
                sx={{
                  position: 'absolute',
                  left: 60,
                  right: 0,
                  bottom: line * 40,
                  height: '1px',
                  bgcolor: 'grey.200'
                }}
              />
            ))}
            <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60 }}>
              {[0, 2500, 5000, 7500, 10000].reverse().map((value, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  color="text.secondary"
                  sx={{ position: 'absolute', right: 5, bottom: index * 40, transform: 'translateY(50%)' }}
                >
                  {value}€
                </Typography>
              ))}
            </Box>
            <Box sx={{ position: 'absolute', left: 60, right: 0, top: 0, bottom: 20, display: 'flex' }}>
              {revenueData.map((item, index) => {
                const nextItem = revenueData[index + 1];
                const max = 10000;
                return (
                  <Box
                    key={index}
                    sx={{
                      flex: 1,
                      position: 'relative',
                      '&:not(:last-child)': { borderRight: '1px dashed rgba(0,0,0,0.05)' }
                    }}
                  >
                    {item.value > 0 && (
                      <Tooltip title={`${item.value} €`} placement="top">
                        <Box
                          sx={{
                            position: 'absolute',
                            left: '50%',
                            bottom: `${(item.value / max) * 100}%`,
                            transform: 'translate(-50%, 50%)',
                            width: 8,
                            height: 8,
                            bgcolor: '#f06292',
                            borderRadius: '50%',
                            border: '2px solid white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            zIndex: 2
                          }}
                        />
                      </Tooltip>
                    )}
                    {nextItem && item.value > 0 && nextItem.value > 0 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          left: '50%',
                          right: '-50%',
                          bottom: `${(item.value / max) * 100}%`,
                          height: 2,
                          bgcolor: '#f06292',
                          transform: 'translateY(50%)',
                          zIndex: 1,
                          clipPath: `polygon(
                            0 0, 
                            100% ${((item.value - nextItem.value) / max) * 100}%, 
                            100% 100%, 
                            0 100%
                          )`
                        }}
                      />
                    )}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ position: 'absolute', left: '50%', bottom: -20, transform: 'translateX(-50%)' }}
                    >
                      {item.month}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Top Reserved Vehicles */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2, width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Véhicules les plus réservés
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dernier mois
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {topVehicles.length > 0 ? (
            topVehicles.map(vehicle => (
              <Box
                key={vehicle.id}
                sx={{
                  bgcolor: '#ff4d8d',
                  color: 'white',
                  borderRadius: 4,
                  p: 2,
                  flex: '1 1 300px',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: 3 }
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <CarIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                    {vehicle.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    {vehicle.bookings} réservations
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#bbffbb', fontSize: '1rem' }}>
                    {vehicle.change}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">Aucune donnée disponible.</Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardManager;