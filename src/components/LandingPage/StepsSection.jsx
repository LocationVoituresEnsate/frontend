import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Paper,
  Divider,
  Avatar
} from '@mui/material';
import {
  DirectionsCar as CarIcon,
  EventNote as ReservationIcon,
  Support as SupportIcon,
  CheckCircle as CheckIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationIcon,
  Analytics as AnalyticsIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Build as MaintenanceIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Help as HelpIcon,
  School as TrainingIcon
} from '@mui/icons-material';

const StepsSection = () => {
  const vehicleFeatures = [
    'Suivi en temps réel de la flotte',
    'Planification des maintenances',
    'Gestion des documents véhicules',
    'Suivi kilométrage et consommation',
    'Alertes automatiques d\'entretien',
    'Historique complet par véhicule'
  ];

  const reservationFeatures = [
    'Interface de réservation intuitive',
    'Calendrier de disponibilité',
    'Gestion des tarifs dynamiques',
    'Notifications automatiques clients',
    'Suivi des paiements',
    'Rapports de performance'
  ];

  const supportFeatures = [
    'Support technique 24/7',
    'Formation personnalisée',
    'Documentation complète',
    'Mises à jour automatiques',
    'Assistance à distance',
    'Communauté d\'utilisateurs'
  ];

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default', mt: 4 }}>
      <Container maxWidth="lg">
        {/* En-tête principal */}
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: 'text.primary'
            }}
          >
            Fonctionnalités de gestion
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}
          >
            Tout ce dont vous avez besoin pour gérer efficacement votre flotte et vos réservations
          </Typography>
        </Box>

        {/* Section Gestion des Véhicules */}
        <Box id="services" sx={{ mb: 10, scrollMarginTop: '100px' }}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #f8bbd0 0%, #ffffff 100%)'
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 60,
                      height: 60,
                      mr: 2
                    }}
                  >
                    <CarIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" component="h3" fontWeight="bold">
                      Gestion des Véhicules
                    </Typography>
                    <Chip label="Module Principal" color="primary" size="small" />
                  </Box>
                </Box>
                <Typography variant="body1" paragraph color="text.secondary">
                  Optimisez la gestion de votre flotte avec des outils avancés de suivi, 
                  maintenance et analyse des performances de vos véhicules.
                </Typography>
                <List dense>
                  {vehicleFeatures.map((feature, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card elevation={1}>
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <SpeedIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h6" fontWeight="bold">Dashboard</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Vue d'ensemble temps réel
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card elevation={1}>
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <MaintenanceIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h6" fontWeight="bold">Maintenance</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Planification automatique
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card elevation={1}>
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <AnalyticsIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h6" fontWeight="bold">Analyse</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Rapports détaillés
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card elevation={1}>
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <SecurityIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h6" fontWeight="bold">Sécurité</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Données protégées
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Section Réservations */}
        <Box id="fonctionnalites" sx={{ mb: 10, scrollMarginTop: '100px' }}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8bbd0 100%)'
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Card elevation={1} sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <MoneyIcon sx={{ mr: 1 }} />
                          <Typography variant="h6" fontWeight="bold">Gestion Tarifaire</Typography>
                        </Box>
                        <Typography variant="body2">
                          Tarifs dynamiques selon la demande et la saisonnalité
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card elevation={1}>
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <ScheduleIcon color="primary" sx={{ fontSize: 35, mb: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">Planning</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Calendrier intégré
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 60,
                      height: 60,
                      mr: 2
                    }}
                  >
                    <ReservationIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" component="h3" fontWeight="bold">
                      Gestion des Réservations
                    </Typography>
                    <Chip label="Interface Avancée" color="secondary" size="small" />
                  </Box>
                </Box>
                <Typography variant="body1" paragraph color="text.secondary">
                  Simplifiez la gestion des réservations avec un système complet 
                  incluant calendrier, tarification et suivi client automatisé.
                </Typography>
                <List dense>
                  {reservationFeatures.map((feature, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  startIcon={<DashboardIcon />}
                >
                  Voir le Module Réservations
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Section Support */}
        <Box id="contact" sx={{ scrollMarginTop: '100px' }}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #f5f5f5 0%, #f8bbd0 100%)'
            }}
          >
            <Box textAlign="center" sx={{ mb: 4 }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 2
                }}
              >
                <SupportIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h4" component="h3" fontWeight="bold" gutterBottom>
                Support & Assistance
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Un accompagnement complet pour optimiser votre utilisation
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card elevation={1} sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <PhoneIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Support 24/7
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Assistance technique disponible à tout moment pour résoudre vos problèmes rapidement.
                    </Typography>
                    <Button variant="outlined" color="primary" size="small">
                      Contacter le Support
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card elevation={1} sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <TrainingIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Formation
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Sessions de formation personnalisées pour maximiser l'efficacité de votre équipe.
                    </Typography>
                    <Button variant="outlined" color="primary" size="small">
                      Planifier Formation
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card elevation={1} sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <HelpIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Documentation
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Guides complets, tutoriels vidéo et FAQ pour une utilisation autonome.
                    </Typography>
                    <Button variant="outlined" color="primary" size="small">
                      Accéder aux Guides
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                Fonctionnalités Support Incluses
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {supportFeatures.map((feature, index) => (
                  <Grid item key={index}>
                    <Chip
                      label={feature}
                      variant="outlined"
                      color="primary"
                      sx={{ m: 0.5 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default StepsSection;