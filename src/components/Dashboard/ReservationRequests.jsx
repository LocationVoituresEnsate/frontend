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

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  };

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

        const transformedData = reservationsList.map(reservation => ({
          id: reservation._id,
          nom: reservation.client?.first_name || 'N/A',
          prenom: reservation.client?.last_name || 'N/A',
          license: reservation.client?.license_number || 'N/A',
          clientId: reservation.client?._id || 'N/A',
          matricule: reservation.registrationNumber || 'N/A',
          statut: mapStatus(reservation.status),
          startDate: reservation.start_date,
          endDate: reservation.end_date,
          totalPrice: reservation.total_price,
          dailyPrice: reservation.daily_price,
          createdAt: reservation.created_at,
          originalData: reservation
        }));

        setReservations(transformedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

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
        fetchReservations();
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
        fetchReservations();
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

  const handleRefresh = () => {
    fetchReservations();
    setSuccessMessage(null);
    setError(null);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

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
        setReservations(reservations.map(r =>
          r.id === selected.id ? { ...r, statut: 'acceptee' } : r
        ));
      } else {
        await handleDeclineReservation(selected.id);
        showSnackbar('Réservation refusée avec succès', 'success');
        setReservations(reservations.map(r =>
          r.id === selected.id ? { ...r, statut: 'refusee' } : r
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
      return dateString;
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
      <div className="flex justify-end mb-4">
        <Avatar
          sx={{ bgcolor: 'primary.main', cursor: 'pointer', boxShadow: 3, width: 40, height: 40 }}
          onClick={handleRefresh}
        >
          <RefreshIcon />
        </Avatar>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text">
          Gestion des réservations ({reservations.length})
        </h1>
      </div>

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

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2, boxShadow: '0 4px 6px rgba(0,0,0,0.05)', width: '100%', overflowX: 'auto' }}>
        {reservations.length === 0 ? (
          <Alert severity="info">Aucune réservation trouvée.</Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    'Nom',
                    'Prénom',
                    'Numéro Permis',
                    'Matricule',
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
                    <TableCell>{res.nom}</TableCell>
                    <TableCell>{res.prenom}</TableCell>
                    <TableCell>{res.license}</TableCell>
                    <TableCell>{res.matricule}</TableCell>
                    <TableCell>{formatDate(res.startDate)}</TableCell>
                    <TableCell>{formatDate(res.endDate)}</TableCell>
                    <TableCell>{res.dailyPrice ? `${res.dailyPrice} DH` : 'N/A'}</TableCell>
                    <TableCell>{res.totalPrice ? `${res.totalPrice} DH` : 'N/A'}</TableCell>
                    <TableCell>{getChip(res.statut)}</TableCell>
                    <TableCell>{formatDate(res.createdAt)}</TableCell>
                    <TableCell align="center">
                      {res.statut === 'en_attente' ? (
                        <>
                          <Tooltip title="Accepter">
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleAction(res, 'accept')}
                              disabled={processing}
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
      </Paper>

      <Dialog open={openDialog} onClose={() => !processing && setOpenDialog(false)}>
        <DialogTitle>{action === 'accept' ? 'Accepter la réservation' : 'Refuser la réservation'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir {action === 'accept' ? 'accepter' : 'refuser'} cette réservation ?
            {selected && (
              <Box sx={{ mt: 2 }}>
                <strong>ID:</strong> {selected.id}<br />
                <strong>Client:</strong> {selected.nom} {selected.prenom}<br />
                <strong>Période:</strong> {formatDate(selected.startDate)} - {formatDate(selected.endDate)}<br />
                <strong>Prix total:</strong> {selected.totalPrice} DH
              </Box>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={processing}>Annuler</Button>
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
