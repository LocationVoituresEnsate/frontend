import React, { useState, useEffect } from 'react'; // <-- ajout de useEffect
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
  const [isLoading, setIsLoading] = useState(false);
  const [clientCount, setClientCount] = useState(null);
  const [countVoitures, setCountVoitures] = useState(null);
  const [revenuAnnee, setRevenuAnnee] = useState(null);
  const [countPending, setCountPending] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
  
    Promise.all([
      fetch('http://localhost:8000/customer/count/').then(res => res.json()),
      fetch('http://localhost:8000/voitures/count/').then(res => res.json()),
      fetch('http://localhost:8000/reservations/revenu-par-annee/').then(res => res.json()),
      fetch('http://localhost:8000/reservations/pending-count/').then(res => res.json())
    ])
    .then(([clientData, voitureData, revenuData,countPending]) => {
      setClientCount(clientData.client_count);
      setCountVoitures(voitureData.count_voitures);
      setCountPending(countPending.pending_reservations_count)
      setRevenuAnnee(revenuData.total_revenu);
      setIsLoading(false);
    })
    .catch(() => {
      setError('Erreur lors du chargement des données');
      setIsLoading(false);
    });
  }, []);
  
  
  // Simuler un rechargement des données
  const handleRefresh = () => {
    setIsLoading(true);
    // Ici tu pourrais refaire un fetch pour actualiser les données
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  // Updated formatCurrency function to show MAD instead of EUR
  const formatCurrency = (value) => {
    if (value === null) return '...';
    return value.toLocaleString('fr-FR', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }) + ' MAD';
  };

  const stats = [
    { 
      id: 1, 
      title: 'Voitures disponibles', 
      value: countVoitures !== null ? countVoitures : '...', 
      change: '+2', 
      icon: <CarIcon />, 
      color: {
        bg: '#e8f5e9',
        text: '#2e7d32',
      }
    },
    { 
      id: 2, 
      title: 'Réservations en attentes', 
      value: countPending !== null ? countPending : '...', 
      change: '+8', 
      icon: <EventIcon />, 
      color: {
        bg: '#e3f2fd',
        text: '#1976d2',
      }
    },
    { 
      id: 3, 
      title: 'Nouveaux clients', 
      value: clientCount !== null ? clientCount : '...', 
      change: '', 
      icon: <PeopleIcon />, 
      color: {
        bg: '#f3e5f5',
        text: '#7b1fa2',
      } 
    },
    { 
      id: 4, 
      title: 'Revenus du mois', 
      value: formatCurrency(revenuAnnee), 
      change: '+12%', 
      icon: <MoneyIcon />, 
      color: {
        bg: '#fff8e1',
        text: '#ff8f00',
      } 
    },
  ];

  const recentReservations = [
    { 
      id: 1, 
      client: 'Mohammed Alaoui', 
      car: 'Porsche 911', 
      startDate: '05/05/2025', 
      endDate: '08/05/2025', 
      status: 'Terminée', 
      statusColor: 'success',
      price: '8500 MAD'
    },
    { 
      id: 2, 
      client: 'Fatima Benani', 
      car: 'Audi A5', 
      startDate: '07/05/2025', 
      endDate: '10/05/2025', 
      status: 'en cours', 
      statusColor: 'info',
      price: '5200 MAD'
    },
    { 
      id: 3, 
      client: 'Karim Idrissi', 
      car: 'Mercedes GLC', 
      startDate: '03/05/2025', 
      endDate: '06/05/2025', 
      status: 'Terminée', 
      statusColor: 'default',
      price: '6800 MAD'
    },
    { 
      id: 4, 
      client: 'Leila Tahiri', 
      car: 'BMW X5', 
      startDate: '06/05/2025', 
      endDate: '12/05/2025', 
      status: ' Pending', 
      statusColor: 'info',
      price: '12000 MAD'
    },
    { 
      id: 5, 
      client: 'Youssef Benziane', 
      car: 'Range Rover', 
      startDate: '02/05/2025', 
      endDate: '05/05/2025', 
      status: 'Terminée', 
      statusColor: 'default',
      price: '9600 MAD'
    },
  ];

  // Données pour le graphique d'activité
  const bookingData = [20, 35, 15, 45, 30, 50, 25];
  
  // Données pour le graphique de revenus mensuels - Updated with MAD values
  const revenueData = [
    { month: 'Jan', value: 52000 },
    { month: 'Fév', value: 68000 },
    { month: 'Mar', value: 75000 },
    { month: 'Avr', value: 89000 },
    { month: 'Mai', value: 97500 },
    { month: 'Juin', value: 0 }, // Donnée future
    { month: 'Juil', value: 0 }  // Donnée future
  ];

  const topVehicles = [
    { id: 1, name: 'Porsche 911', bookings: 18, change: '+24%' },
    { id: 2, name: 'Range Rover Sport', bookings: 15, change: '+18%' },
    { id: 3, name: 'Mercedes Classe S', bookings: 12, change: '+10%' }
  ];

  return (
    <Box sx={{ p: 3, pb: 5, bgcolor: 'grey.50', minHeight: '100vh' }}>
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
      
      {/* En-tête du Dashboard avec options */}
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

      {/* Cartes statistiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
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
                <Avatar
                  sx={{ 
                    bgcolor: stat.color.bg,
                    color: stat.color.text,
                  }}
                >
                  {stat.icon}
                </Avatar>
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
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Table de réservations en pleine largeur */}
      <Paper 
        elevation={1} 
        sx={{ 
          width: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 4
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            px: 3, 
            py: 2
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Réservations récentes
          </Typography>
          <Button 
            color="primary" 
            endIcon={<TrendingUpIcon />}
            sx={{ textTransform: 'none' }}
          >
            Voir toutes
          </Button>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 500, width: '20%' }}>Client</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 500, width: '20%' }}>Voiture</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 500, width: '25%' }}>Période</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 500, width: '15%' }}>Prix</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 500, width: '20%' }}>Statut</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentReservations.map((reservation) => (
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
                  <TableCell sx={{ fontWeight: 'medium' }}>
                    {reservation.client}
                  </TableCell>
                  <TableCell>{reservation.car}</TableCell>
                  <TableCell>{reservation.startDate} - {reservation.endDate}</TableCell>
                  <TableCell>{reservation.price}</TableCell>
                  <TableCell>
                    <Chip 
                      label={reservation.status} 
                      color={reservation.statusColor} 
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

      {/* Les deux graphiques côte à côte */}
      {/* Les deux graphiques alignés côte à côte dans la largeur complète */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, width: '100%' }}>
        {/* Premier graphique - Activité de réservation */}
        <Paper 
          elevation={1} 
          sx={{ 
            p: 3, 
            borderRadius: 2, 
            flex: 1,
            width: '50%'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', display: 'flex', alignItems: 'center' }}>
              Activité de réservation
              <Box component="span" sx={{ ml: 1, color: '#f06292', fontSize: '1.2rem' }}>📈</Box>
            </Typography>
          </Box>
          <Box sx={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 0.5 }}>
            {bookingData.map((height, index) => (
              <Tooltip key={index} title={`${height} réservations`} placement="top">
                <Box 
                  sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
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
        
        {/* Deuxième graphique - Revenus mensuels */}
        <Paper 
          elevation={1} 
          sx={{ 
            p: 3, 
            borderRadius: 2, 
            flex: 1,
            width: '50%'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', display: 'flex', alignItems: 'center' }}>
              Revenus mensuels
              <Box component="span" sx={{ ml: 1, color: '#f06292', fontSize: '1.2rem' }}>💰</Box>
            </Typography>
          </Box>
          
          <Box sx={{ height: 200, position: 'relative' }}>
            {/* Grille de fond */}
            {[0, 1, 2, 3, 4].map((line) => (
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
            
            {/* Étiquettes des montants - Updated to show MAD */}
            <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60 }}>
              {[0, 25000, 50000, 75000, 100000].reverse().map((value, index) => (
                <Typography 
                  key={index} 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    position: 'absolute', 
                    right: 5, 
                    bottom: index * 40,
                    transform: 'translateY(50%)'
                  }}
                >
                  {value} MAD
                </Typography>
              ))}
            </Box>
            
            {/* Graphique linéaire */}
            <Box 
              sx={{ 
                position: 'absolute', 
                left: 60, 
                right: 0, 
                top: 0, 
                bottom: 20, 
                display: 'flex'
              }}
            >
              {revenueData.map((item, index) => {
                const nextItem = revenueData[index + 1];
                const max = 100000; // Updated max value for MAD scale
                
                return (
                  <Box 
                    key={index}
                    sx={{ 
                      flex: 1,
                      position: 'relative',
                      '&:not(:last-child)': {
                        borderRight: '1px dashed rgba(0,0,0,0.05)'
                      }
                    }}
                  >
                    {/* Point */}
                    {item.value > 0 && (
                      <Tooltip title={`${item.value.toLocaleString()} MAD`} placement="top">
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
                    
                    {/* Ligne */}
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
                    
                    {/* Étiquette du mois */}
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ 
                        position: 'absolute', 
                        left: '50%', 
                        bottom: -20,
                        transform: 'translateX(-50%)'
                      }}
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

      {/* Véhicules les plus réservés */}
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
          {topVehicles.map((vehicle) => (
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
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: 3
                }
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
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardManager;