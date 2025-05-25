import React, { useState } from 'react';
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
  Tooltip
} from '@mui/material';
import {
  CheckCircle as AcceptIcon,
  Cancel as RejectIcon
} from '@mui/icons-material';

const ReservationRequests = () => {
  const theme = useTheme();

  const [reservations, setReservations] = useState([
    {
      id: 1,
      clientId: 'C001',
      nom: 'Benali',
      prenom: 'Ahmed',
      telephone: '+212 6 12 34 56 78',
      matricule: 'A-123-456',
      modele: 'Volkswagen Golf',
      statut: 'en_attente',
      startDate: '2025-05-01T10:00:00Z',
      endDate: '2025-05-03T18:00:00Z'
    },
    // … autres réservations
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState('');

  const handleAction = (res, type) => {
    setSelected(res);
    setAction(type);
    setOpenDialog(true);
  };

  const confirm = () => {
    setReservations(reservations.map(r =>
      r.id === selected.id
        ? { ...r, statut: action === 'accept' ? 'acceptee' : 'refusee' }
        : r
    ));
    setOpenDialog(false);
  };

  const formatDate = iso =>
    new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });

  const getChip = statut => {
    if (statut === 'en_attente')
      return <Chip label="En attente" color="warning" variant="outlined" />;
    if (statut === 'acceptee')
      return <Chip label="Acceptée" color="success" />;
    return <Chip label="Refusée" color="error" />;
  };

  return (
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
      {/* Titre */}
      <Box mb={3}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            borderBottom: `2px solid ${theme.palette.primary.light}`,
            pb: 1
          }}
        >
          Gestion des réservations
        </Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {[
                'ID Client',
                'Nom',
                'Prénom',
                'Téléphone',
                'Matricule',
                'Modèle',
                'Date début',
                'Date fin',
                'Statut',
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
                <TableCell>{res.clientId}</TableCell>
                <TableCell>{res.nom}</TableCell>
                <TableCell>{res.prenom}</TableCell>
                <TableCell>{res.telephone}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                  {res.matricule}
                </TableCell>
                <TableCell>{res.modele}</TableCell>
                <TableCell>{formatDate(res.startDate)}</TableCell>
                <TableCell>{formatDate(res.endDate)}</TableCell>
                <TableCell>{getChip(res.statut)}</TableCell>
                <TableCell align="center">
                  {res.statut === 'en_attente' ? (
                    <>
                      <Tooltip title="Accepter">
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => handleAction(res, 'accept')}
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

      {/* Confirmation */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>
          {action === 'accept' ? 'Accepter la réservation' : 'Refuser la réservation'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir{' '}
            {action === 'accept' ? 'accepter' : 'refuser'} la réservation de{' '}
            {selected?.prenom} {selected?.nom} pour le véhicule {selected?.modele} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button
            onClick={confirm}
            variant="contained"
            color={action === 'accept' ? 'success' : 'error'}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ReservationRequests;
