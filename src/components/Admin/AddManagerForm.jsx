import React, { useState } from 'react';
import { 
  Box, Paper, Typography, TextField, Grid, Button, Divider,
  useTheme, Fade, InputAdornment, MenuItem, Tooltip
} from '@mui/material';
import { 
  Person as PersonIcon, Save as SaveIcon, Add as AddIcon,
  Email as EmailIcon, Phone as PhoneIcon, Lock as LockIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const roles = [
  { value: 'manager', label: 'Manager' }
];

const AddManagerForm = ({ onAddManager, initialData = null, onCancel }) => {
  const theme = useTheme();

  const [formData, setFormData] = useState(
    initialData || {
      username: '',
      role: 'manager',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      address: '',
    }
  );

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    if (!touched[name]) setTouched({...touched, [name]: true});
    if (errors[name]) setErrors({...errors, [name]: ''});
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({...touched, [name]: true});
    const error = validateField(name, formData[name]);
    if (error) setErrors({...errors, [name]: error});
  };

  const validateField = (name, value) => {
    switch(name) {
      case 'username':
        return !value.trim() ? 'Le nom d’utilisateur est requis' : '';
      case 'role':
        return !value.trim() ? 'Le rôle est requis' : '';
      case 'password':
        if (!value.trim()) return 'Le mot de passe est requis';
        if (value.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères';
        return '';
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
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = {};
    Object.keys(formData).forEach(f => allTouched[f] = true);
    setTouched(allTouched);

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddManager(formData);

    if (!initialData) {
      setFormData({
        username: '',
        role: 'manager',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
      });
      setTouched({});
    }
    setErrors({});
  };

  return (
    <Fade in timeout={400}>
      <Paper 
        elevation={3} 
        sx={{ p: 4, mb: 4, borderRadius: 2, position: 'relative', overflow: 'hidden',
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
          <Typography variant="h5" component="h2" sx={{ color: 'primary.main', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon />
            {initialData ? 'Modifier un manager' : 'Ajouter un manager'}
          </Typography>
          {onCancel && (
            <Tooltip title="Annuler">
              <Button color="inherit" size="small" onClick={onCancel} sx={{ minWidth: 'auto', p: 1, borderRadius: '50%' }}>
                <CloseIcon />
              </Button>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>

            {/* Username */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nom d'utilisateur"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'primary.main' }}}}
              />
            </Grid>

            {/* Role */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Rôle"
                name="role"
                value={formData.role}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.role && !!errors.role}
                helperText={touched.role && errors.role}
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'primary.main' }}}}
              >
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Password */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mot de passe"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'primary.main' }}}}
              />
            </Grid>

            {/* First Name */}
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
                sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'primary.main' }}}}
              />
            </Grid>

            {/* Last Name */}
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
                sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'primary.main' }}}}
              />
            </Grid>

            {/* Email */}
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
                sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'primary.main' }}}}
              />
            </Grid>

            {/* Phone Number */}
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
                sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'primary.main' }}}}
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12} md={6}>
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
                sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'primary.main' }}}}
              />
            </Grid>

          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            {onCancel && (
              <Button variant="outlined" color="inherit" onClick={onCancel} sx={{ px: 3 }}>
                Annuler
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={initialData ? <SaveIcon /> : <AddIcon />}
              sx={{ py: 1, px: 3, boxShadow: 2, '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' }, transition: 'all 0.2s ease' }}
            >
              {initialData ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default AddManagerForm;
