import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton, Box, Tooltip, useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  Apartment as ApartmentIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelCircleIcon,
  AccountCircle as AccountCircleIcon,
  Home as HomeIcon
} from '@mui/icons-material';

const ManagersTable = ({ managers, onEdit, onDelete }) => {
  const theme = useTheme();

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: theme.palette.primary.main,
          borderBottom: `1px solid ${theme.palette.primary.light}`,
          pb: 1,
        }}
      >
        Liste des managers
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 500, borderTopLeftRadius: '8px', py: 2 }}>
                ID
              </TableCell>
              <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 500, py: 2 }}>
                Username
              </TableCell>
              <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 500, py: 2 }}>
                Nom
              </TableCell>
              <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 500, py: 2 }}>
                Prénom
              </TableCell>
              <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 500, py: 2 }}>
                Email
              </TableCell>
              <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 500, py: 2 }}>
                Téléphone
              </TableCell>
              <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 500, py: 2 }}>
                Adresse
              </TableCell>
              <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 500, py: 2 }}>
                Role
              </TableCell>
            
              <TableCell
                align="center"
                sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 500, borderTopRightRadius: '8px', py: 2 }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {managers.length > 0 ? (
              managers.map((manager, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:nth-of-type(even)': { bgcolor: theme.palette.grey[50] },
                    '&:hover': { bgcolor: `${theme.palette.primary.main}10`, transition: 'background-color 0.2s' },
                    transition: 'background-color 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  <TableCell>{index + 1}</TableCell>

                  {/* Username */}
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccountCircleIcon sx={{ color: 'primary.main', mr: 1, fontSize: 18, opacity: 0.7 }} />
                      {manager.username}
                    </Box>
                  </TableCell>

                  <TableCell sx={{ fontWeight: 500 }}>{manager.last_name}</TableCell>
                  <TableCell>{manager.first_name}</TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon sx={{ color: 'primary.main', mr: 1, fontSize: 18, opacity: 0.7 }} />
                      <Typography
                        component="a"
                        href={`mailto:${manager.email}`}
                        sx={{
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        {manager.email}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneIcon sx={{ color: 'primary.main', mr: 1, fontSize: 18, opacity: 0.7 }} />
                      {manager.phone_number}
                    </Box>
                  </TableCell>

                  {/* Adresse */}
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <HomeIcon sx={{ color: 'primary.main', mr: 1, fontSize: 18, opacity: 0.7 }} />
                      {manager.address}
                    </Box>
                  </TableCell>
                    <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <HomeIcon sx={{ color: 'primary.main', mr: 1, fontSize: 18, opacity: 0.7 }} />
                      {manager.role}
                    </Box>
                  </TableCell>


                 

                  <TableCell>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Tooltip title="Modifier" arrow>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(manager);
                          }}
                          sx={{ '&:hover': { transform: 'scale(1.1)', bgcolor: 'rgba(25, 118, 210, 0.1)' }, transition: 'all 0.2s' }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer" arrow>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(manager);
                          }}
                          sx={{ '&:hover': { transform: 'scale(1.1)', bgcolor: 'rgba(211, 47, 47, 0.1)' }, transition: 'all 0.2s' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 4, color: 'text.secondary', fontSize: '1rem' }}>
                  Aucun manager trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ManagersTable;
