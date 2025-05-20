import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Grid, 
  Button, 
  Divider,
  useTheme,
  Fade,
  InputAdornment,
  MenuItem,
  FormHelperText,
  Tooltip
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Save as SaveIcon, 
  Add as AddIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CardMembership as CardIcon,
  Public as PublicIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Liste des pays pour le menu déroulant
const countries = [
  'Maroc', 'France', 'Espagne', 'Portugal', 'Allemagne', 'Italie', 
  'Royaume-Uni', 'Belgique', 'Suisse', 'Pays-Bas', 'États-Unis', 'Canada'
];

const AddClientForm = ({ onAddClient, initialData = null, onCancel }) => {
  const theme = useTheme();
  
  const [formData, setFormData] = useState(
    initialData || {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      address: '',
      license_number: '',
      license_country: ''
    }
  );

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Mark field as touched
    if (!touched[name]) {
      setTouched({
        ...touched,
        [name]: true
      });
    }
    
    // Reset error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    
    // Mark field as touched
    setTouched({
      ...touched,
      [name]: true
    });
    
    // Validate this field only
    const fieldError = validateField(name, formData[name]);
    if (fieldError) {
      setErrors({
        ...errors,
        [name]: fieldError
      });
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'first_name':
        return !value.trim() ? 'Le prénom est requis' : '';
      case 'last_name':
        return !value.trim() ? 'Le nom est requis' : '';
      case 'email':
        if (!value.trim()) return 'L\'email est requis';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Format d\'email invalide';
        return '';
      case 'phone_number':
        return !value.trim() ? 'Le numéro de téléphone est requis' : '';
      case 'address':
        return !value.trim() ? 'L\'adresse est requise' : '';
      case 'license_number':
        return !value.trim() ? 'Le numéro de permis est requis' : '';
      case 'license_country':
        return !value.trim() ? 'Le pays du permis est requis' : '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(name => {
      const error = validateField(name, formData[name]);
      if (error) {
        newErrors[name] = error;
      }
    });
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onAddClient(formData);
    
    if (!initialData) {
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        license_number: '',
        license_country: ''
      });
      setTouched({});
    }
    
    setErrors({});
  };

  return (
    <Fade in={true} timeout={400}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.07)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '5px',
            height: '100%',
            backgroundColor: 'primary.main',
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <PersonIcon />
            {initialData ? 'Modifier un client' : 'Ajouter un client'}
          </Typography>
          
          {onCancel && (
            <Tooltip title="Annuler">
              <Button 
                color="inherit" 
                size="small"
                onClick={onCancel}
                sx={{ 
                  minWidth: 'auto',
                  p: 1,
                  borderRadius: '50%'
                }}
              >
                <CloseIcon />
              </Button>
            </Tooltip>
          )}
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Prénom"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.first_name && !!errors.first_name}
                helperText={touched.first_name && errors.first_name}
                required
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nom"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.last_name && !!errors.last_name}
                helperText={touched.last_name && errors.last_name}
                required
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Téléphone"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone_number && !!errors.phone_number}
                helperText={touched.phone_number && errors.phone_number}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adresse"
                name="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Numéro de permis"
                name="license_number"
                value={formData.license_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.license_number && !!errors.license_number}
                helperText={touched.license_number && errors.license_number}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CardIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Pays du permis"
                name="license_country"
                value={formData.license_country}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.license_country && !!errors.license_country}
                helperText={touched.license_country && errors.license_country}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PublicIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  }
                }}
              >
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
              <FormHelperText sx={{ ml: 2 }}>Sélectionnez le pays d'émission du permis</FormHelperText>
            </Grid>
          </Grid>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            gap: 2, 
            mt: 4
          }}>
            {onCancel && (
              <Button
                variant="outlined"
                color="inherit"
                onClick={onCancel}
                sx={{ px: 3 }}
              >
                Annuler
              </Button>
            )}
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={initialData ? <SaveIcon /> : <AddIcon />}
              sx={{ 
                py: 1, 
                px: 3,
                boxShadow: 2,
                '&:hover': { 
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease'
              }}
            >
              {initialData ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default AddClientForm;