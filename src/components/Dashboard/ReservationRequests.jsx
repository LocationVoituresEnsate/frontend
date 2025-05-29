import React, { useState, useEffect } from 'react';
import {
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
  Tooltip,
  CircularProgress,
  Alert,
  Snackbar,
  Avatar
} from '@mui/material';
import {
  CheckCircle as AcceptIcon,
  Cancel as RejectIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

const ReservationRequests = () => {
  const theme = useTheme();
  const API_BASE_URL = 'http://127.0.0.1:8000';

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState('');
  const [processing, setProcessing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Get auth headers like ClientManager
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  };

  // Fetch all reservations
  const fetchReservations = () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    fetch(`${API_BASE_URL}/reservations/get/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const reservationsList = data.reservations || [];
        
        // Transform API data to component format
        const transformedData = reservationsList.map(reservation => ({
          id: reservation._id,
          clientId: reservation.client_id,
          nom: 'N/A', // These would come from client data in a real scenario
          prenom: 'N/A', // You might need to modify your API to include client details
          telephone: 'N/A',
          matricule: reservation.voiture_id, // Using voiture_id as matricule for now
          modele: 'N/A', // This would come from voiture data
          statut: mapStatus(reservation.status),
          startDate: reservation.start_date,
          endDate: reservation.end_date,
          totalPrice: reservation.total_price,
          dailyPrice: reservation.daily_price,
          createdAt: reservation.created_at,
          originalData: reservation // Keep original data for debugging
        }));

        setReservations(transformedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Accept reservation
  const handleAcceptReservation = async (reservationId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/accept_reservation/${reservationId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Réservation acceptée avec succès !');
        setError(null);
        fetchReservations(); // Refresh data
        return data;
      } else {
        setError(data.error || 'Erreur lors de l\'acceptation de la réservation');
        setSuccessMessage(null);
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      setError('Erreur réseau');
      setSuccessMessage(null);
      throw err;
    }
  };

  // Decline reservation
  const handleDeclineReservation = async (reservationId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/decline_reservation/${reservationId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Réservation refusée avec succès !');
        setError(null);
        fetchReservations(); // Refresh data
        return data;
      } else {
        setError(data.error || 'Erreur lors du refus de la réservation');
        setSuccessMessage(null);
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      setError('Erreur réseau');
      setSuccessMessage(null);
      throw err;
    }
  };

  // Refresh function like ClientManager
  const handleRefresh = () => {
    fetchReservations();
    setSuccessMessage(null);
    setError(null);
  };

  // Fetch reservations on component mount
  useEffect(() => {
    fetchReservations();
  }, []);

  // Map API status to display status
  const mapStatus = (apiStatus) => {
    switch (apiStatus) {
      case 'pending':
        return 'en_attente';
      case 'accepted':
        return 'acceptee';
      case 'declined':
      case 'refused':
        return 'refusee';
      default:
        return 'en_attente';
    }
  };

  const handleAction = (res, type) => {
    setSelected(res);
    setAction(type);
    setOpenDialog(true);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const confirm = async () => {
    if (!selected) return;

    try {
      setProcessing(true);
      
      if (action === 'accept') {
        await handleAcceptReservation(selected.id);
        showSnackbar('Réservation acceptée avec succès', 'success');
        // Update local state immediately for better UX
        setReservations(reservations.map(r =>
          r.id === selected.id
            ? { ...r, statut: 'acceptee' }
            : r
        ));
      } else {
        await handleDeclineReservation(selected.id);
        showSnackbar('Réservation refusée avec succès', 'success');
        // Update local state immediately for better UX
        setReservations(reservations.map(r =>
          r.id === selected.id
            ? { ...r, statut: 'refusee' }
            : r
        ));
      }

      setOpenDialog(false);
    } catch (error) {
      showSnackbar(`Erreur: ${error.message}`, 'error');
    } finally {
      setProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return dateString; // Return original if parsing fails
    }
  };

  const getChip = (statut) => {
    if (statut === 'en_attente')
      return <Chip label="En attente" color="warning" variant="outlined" />;
    if (statut === 'acceptee')
      return <Chip label="Acceptée" color="success" />;
    return <Chip label="Refusée" color="error" />;
  };

  if (loading) {
    return (
      <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Chargement des réservations...
        </Typography>
      </Paper>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      {/* Refresh button like ClientManager */}
      <div className="flex justify-end mb-4">
        <Avatar
          sx={{ bgcolor: 'primary.main', cursor: 'pointer', boxShadow: 3, width: 40, height: 40 }}
          onClick={handleRefresh}
          title="Rafraîchir"
        >
          <RefreshIcon />
        </Avatar>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text">
          Gestion des réservations ({reservations.length})
        </h1>
      </div>

      {/* Error and Success Messages like ClientManager */}
      {loading && <p>Chargement des réservations...</p>}
      {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {error && (
        <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
          <Alert 
            severity="error" 
            action={
              <Button color="inherit" size="small" onClick={handleRefresh}>
                Réessayer
              </Button>
            }
          >
            Erreur: {error}
          </Alert>
        </Paper>
      )}

      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          width: '100%',
          overflowX: 'auto'
        }}
      >
        {reservations.length === 0 ? (
          <Alert severity="info">
            Aucune réservation trouvée.
          </Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    'ID Réservation',
                    'ID Client',
                    'ID Voiture',
                    'Date début',
                    'Date fin',
                    'Prix journalier',
                    'Prix Total',
                    'Statut',
                    'Date création',
                    'Actions'
                  ].map((label, idx, arr) => (
                    <TableCell
                      key={label}
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        fontWeight: 500,
                        py: 1.5,
                        ...(idx === 0 && { borderTopLeftRadius: 8 }),
                        ...(idx === arr.length - 1 && { borderTopRightRadius: 8 })
                      }}
                    >
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {reservations.map(res => (
                  <TableRow
                    key={res.id}
                    sx={{
                      '&:nth-of-type(even)': { bgcolor: theme.palette.grey[50] },
                      '&:hover': { bgcolor: `${theme.palette.primary.main}10` },
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      {res.id}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace' }}>
                      {res.clientId}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace' }}>
                      {res.matricule}
                    </TableCell>
                    <TableCell>{formatDate(res.startDate)}</TableCell>
                    <TableCell>{formatDate(res.endDate)}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      {res.dailyPrice ? `${res.dailyPrice} DH` : 'N/A'}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: theme.palette.success.main }}>
                      {res.totalPrice ? `${res.totalPrice} DH` : 'N/A'}
                    </TableCell>
                    <TableCell>{getChip(res.statut)}</TableCell>
                    <TableCell sx={{ fontSize: '0.8rem' }}>
                      {formatDate(res.createdAt)}
                    </TableCell>
                    <TableCell align="center">
                      {res.statut === 'en_attente' ? (
                        <>
                          <Tooltip title="Accepter">
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleAction(res, 'accept')}
                              disabled={processing}
                              sx={{
                                '&:hover': {
                                  transform: 'scale(1.1)',
                                  bgcolor: 'rgba(56,142,60,0.1)'
                                },
                                transition: 'all 0.2s'
                              }}
                            >
                              <AcceptIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Refuser">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleAction(res, 'reject')}
                              disabled={processing}
                              sx={{
                                '&:hover': {
                                  transform: 'scale(1.1)',
                                  bgcolor: 'rgba(211,47,47,0.1)'
                                },
                                transition: 'all 0.2s'
                              }}
                            >
                              <RejectIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Traitée
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Debug info - remove in production */}
        {process.env.NODE_ENV === 'development' && reservations.length > 0 && (
          <Box mt={2}>
            <Typography variant="caption" color="text.secondary">
              Debug: Première réservation reçue:
            </Typography>
            <pre style={{ fontSize: '0.7rem', backgroundColor: '#f5f5f5', padding: '8px', overflow: 'auto' }}>
              {JSON.stringify(reservations[0]?.originalData, null, 2)}
            </pre>
          </Box>
        )}
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => !processing && setOpenDialog(false)}
      >
        <DialogTitle>
          {action === 'accept' ? 'Accepter la réservation' : 'Refuser la réservation'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir{' '}
            {action === 'accept' ? 'accepter' : 'refuser'} cette réservation ?
            {selected && (
              <Box component="div" sx={{ mt: 2 }}>
                <strong>ID:</strong> {selected.id}<br />
                <strong>Client:</strong> {selected.clientId}<br />
                <strong>Période:</strong> {formatDate(selected.startDate)} - {formatDate(selected.endDate)}<br />
                <strong>Prix total:</strong> {selected.totalPrice} DH
              </Box>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={processing}>
            Annuler
          </Button>
          <Button
            onClick={confirm}
            variant="contained"
            color={action === 'accept' ? 'success' : 'error'}
            disabled={processing}
            startIcon={processing && <CircularProgress size={20} />}
          >
            {processing ? 'Traitement...' : 'Confirmer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ReservationRequests;