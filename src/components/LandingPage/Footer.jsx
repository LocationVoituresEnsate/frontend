import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
  Stack,
  Paper
} from '@mui/material';
import {
  DirectionsCar as CarIcon,
  EventNote as ReservationIcon,
  Assessment as ReportIcon,
  Business as CompanyIcon,
  Group as TeamIcon,
  Star as TestimonialIcon,
  Support as SupportIcon,
  Handshake as PartnershipIcon,
  Work as CareerIcon
} from '@mui/icons-material';

const Footer = () => {
  const servicesLinks = [
    { label: 'Réservations', icon: ReservationIcon },
    { label: 'Gestion des véhicules', icon: CarIcon },
    { label: 'Rapports', icon: ReportIcon }
  ];

  const aboutLinks = [
    { label: 'Notre entreprise', icon: CompanyIcon },
    { label: 'L\'équipe', icon: TeamIcon },
    { label: 'Témoignages', icon: TestimonialIcon }
  ];

  const contactLinks = [
    { label: 'Assistance', icon: SupportIcon },
    { label: 'Partenariats', icon: PartnershipIcon },
    { label: 'Carrières', icon: CareerIcon }
  ];

  const FooterLink = ({ children, icon: IconComponent }) => (
    <Link
      component="button"
      variant="body2"
      sx={{
        color: 'text.primary',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        py: 0.5,
        textAlign: 'left',
        opacity: 0.9,
        '&:hover': {
          color: 'primary.main',
          opacity: 1,
          transform: 'translateX(4px)',
          transition: 'all 0.2s ease'
        },
        transition: 'all 0.2s ease'
      }}
    >
      {IconComponent && (
        <IconComponent sx={{ fontSize: 16, mr: 1, opacity: 0.7 }} />
      )}
      {children}
    </Link>
  );

  const SectionTitle = ({ children }) => (
    <Typography
      variant="h6"
      component="h4"
      sx={{
        fontWeight: 'bold',
        mb: 2,
        color: 'text.primary',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -8,
          left: 0,
          width: 32,
          height: 2,
          bgcolor: 'primary.main',
          borderRadius: 1
        }
      }}
    >
      {children}
    </Typography>
  );

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Logo et description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography
                variant="h4"
                component="h3"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  color: 'text.primary'
                }}
              >
                Location<span style={{ color: '#e91e63' }}>Voitures</span>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.6,
                  mb: 2
                }}
              >
                Votre solution simple et efficace pour la gestion de réservation de voitures.
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  display: 'inline-block'
                }}
              >
                <Typography variant="caption" fontWeight="bold">
                  🚗 Solution Professionnelle
                </Typography>
              </Paper>
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={2.5}>
            <SectionTitle>Services</SectionTitle>
            <Stack spacing={0.5}>
              {servicesLinks.map((link, index) => (
                <FooterLink key={index} icon={link.icon}>
                  {link.label}
                </FooterLink>
              ))}
            </Stack>
          </Grid>

          {/* À propos */}
          <Grid item xs={12} sm={6} md={2.5}>
            <SectionTitle>À propos</SectionTitle>
            <Stack spacing={0.5}>
              {aboutLinks.map((link, index) => (
                <FooterLink key={index} icon={link.icon}>
                  {link.label}
                </FooterLink>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <SectionTitle>Contact</SectionTitle>
            <Stack spacing={0.5}>
              {contactLinks.map((link, index) => (
                <FooterLink key={index} icon={link.icon}>
                  {link.label}
                </FooterLink>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4, opacity: 0.6 }} />

        {/* Copyright */}
        <Box
          sx={{
            bgcolor: 'rgba(0,0,0,0.05)',
            borderRadius: 2,
            py: 2,
            px: 3,
            textAlign: 'center'
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontWeight: 500
            }}
          >
            © 2025 LocationVoitures. Tous droits réservés.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;