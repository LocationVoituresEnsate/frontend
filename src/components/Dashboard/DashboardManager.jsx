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
  Tooltip,
  useTheme,
  Avatar,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  DirectionsCar as CarIcon,
  Event as EventIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';

const ReservationActivityChart = ({ data }) => {
  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2, flex: 1, minHeight: 300 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
        Activité des réservations par jour <span style={{ marginLeft: 8, fontSize: 24 }}>📅</span>
      </Typography>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <RechartTooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#f06292"
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 2, fill: 'white' }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Typography sx={{ m: 2 }}>Aucune donnée disponible.</Typography>
      )}
    </Paper>
  );
};

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
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [reservationsPerDay, setReservationsPerDay] = useState([]);

  // Format currency
  const formatCurrency = (value) => {
    if (value === null) return '...';
    return value.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' });
  };

  // Fetch all data on mount
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch('http://localhost:8000/customer/count/').then(res => res.json()),
      fetch('http://localhost:8000/voitures/count/').then(res => res.json()),
      fetch('http://localhost:8000/reservations/revenu-par-annee/').then(res => res.json()),
      fetch('http://localhost:8000/reservations/pending-count/').then(res => res.json()),
      fetch('http://localhost:8000/reservations/recent/').then(res => res.json()).then(data => data.recent_reservations || []),
      fetch('http://localhost:8000/reservations/top-vehicles/').then(res => res.json()).then(data => data.vehicles || []),
      fetch('http://127.0.0.1:8000/reservations/revenu_mensuel/').then(res => res.json()),
      fetch('http://127.0.0.1:8000/reservations/count-per-day/').then(res => res.json()),
    ])
      .then(([
        clientData,
        voitureData,
        revenuData,
        countPendingData,
        recentReservationsData,
        topVehiclesData,
        revenuMensuelData,
        reservationsPerDayData
      ]) => {
        setClientCount(clientData.client_count);
        setCountVoitures(voitureData.count_voitures);
        setCountPending(countPendingData.pending_reservations_count);
        setRevenuAnnee(revenuData.total_revenu);
        setRecentReservations(recentReservationsData);
        setTopVehicles(topVehiclesData);

        // Traiter revenu mensuel
        if (revenuMensuelData.revenu_mensuel) {
          const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
          const formatted = revenuMensuelData.revenu_mensuel.map(item => ({
            month: monthNames[item.month - 1] || item.month,
            value: item.revenue
          }));
          setMonthlyRevenue(formatted);
        } else {
          setMonthlyRevenue([]);
        }

        // Traiter reservations par jour
        if (reservationsPerDayData.reservations_per_day) {
          const formattedDays = reservationsPerDayData.reservations_per_day.map(item => ({
            date: item.date.slice(5), // format MM-DD
            count: item.count,
          }));
          setReservationsPerDay(formattedDays);
        } else {
          setReservationsPerDay([]);
        }

        setIsLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement :', err);
        setError('Erreur lors du chargement des données');
        setIsLoading(false);
      });
  }, []);

  // Refresh handler
  const handleRefresh = () => {
    setIsLoading(true);
    // Re-fetch logic here if needed (or reload the page)
    // For demo, just disable loading after delay
    setTimeout(() => setIsLoading(false), 1500);
  };

  // Stat Cards
  const stats = [
    { id: 1, title: 'Voitures disponibles', value: countVoitures !== null ? countVoitures : '...', change: '', icon: <CarIcon />, color: { bg: '#e8f5e9', text: '#2e7d32' } },
    { id: 2, title: 'Réservations en attente', value: countPending !== null ? countPending : '...', change: '', icon: <EventIcon />, color: { bg: '#e3f2fd', text: '#1976d2' } },
    { id: 3, title: 'Nouveaux clients', value: clientCount !== null ? clientCount : '...', change: '', icon: <PeopleIcon />, color: { bg: '#f3e5f5', text: '#7b1fa2' } },
    { id: 4, title: 'Revenus du mois', value: formatCurrency(revenuAnnee), change: '+12%', icon: <MoneyIcon />, color: { bg: '#fff8e1', text: '#ff8f00' } }
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

      {/* Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map(stat => (
          <Box
            key={stat.id}
            sx={{
              width: "calc(25% - 20px)", // 4 cards per line minus gap
              minWidth: "200px", // responsive guarantee
            }}
          >
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
          </Box>
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

      {/* Reservation Activity Chart */}
    <Box sx={{ display: 'flex', gap: 3, mb: 4, width: '100%' }}>
  {/* Graphique activité des réservations (50% largeur) */}
  <Box sx={{ width: '50%' }}>
    <ReservationActivityChart data={reservationsPerDay} />
  </Box>

  {/* Graphique revenus mensuels (50% largeur) */}
  <Box sx={{ width: '50%' }}>
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2, minHeight: 300 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
        Revenus mensuels <span style={{ marginLeft: 8, fontSize: 24 }}>💰</span>
      </Typography>
      {monthlyRevenue.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyRevenue} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <RechartTooltip formatter={(value) => value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f06292"
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 2, fill: 'white' }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Typography sx={{ m: 2 }}>Aucune donnée disponible.</Typography>
      )}
    </Paper>
  </Box>
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
