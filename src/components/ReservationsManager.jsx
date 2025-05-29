import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Grid,
  IconButton,
  CircularProgress,
  Fab,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import CarCard from "./CarCard";


const ReservationsManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [carPhotos, setCarPhotos] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(false);
  const [errorCars, setErrorCars] = useState(null);

  const [formData, setFormData] = useState({
    _id:"",
    brand: "",
    model: "",
    year: "",
    registrationNumber: "",
    color: "",
    dailyPrice: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    engineSize: "",
    power: "",
    doors: "",
    seats: "",
    trunkCapacity: "",
  });

  const fileInputRef = useRef(null);

  const fetchCars = () => {
    setLoadingCars(true);
    setErrorCars(null);
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/voitures/get/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des voitures");
        return res.json();
      })
      .then((data) => {
        // Vérifie si les données sont dans data.cars ou data directement
        const list = data.cars || data || [];
        setCars(list);
        setLoadingCars(false);
      })
      .catch((err) => {
        setErrorCars(err.message);
        setLoadingCars(false);
      });
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + carPhotos.length > 5) {
      setMessage("Maximum 5 photos autorisées");
      setMessageType("error");
      return;
    }
    setCarPhotos((prev) => [...prev, ...files]);
    setPreviewPhotos((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  const removePhoto = (index) => {
    setCarPhotos((prev) => prev.filter((_, i) => i !== index));
    setPreviewPhotos((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setShowForm(false);
    setCarPhotos([]);
    setPreviewPhotos([]);
    setMessage("");
    setMessageType("");
    setFormData({
      brand: "",
      model: "",
      year: "",
      registrationNumber: "",
      color: "",
      dailyPrice: "",
      mileage: "",
      fuelType: "",
      transmission: "",
      engineSize: "",
      power: "",
      doors: "",
      seats: "",
      trunkCapacity: "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");
  setMessageType("");

  const submitData = new FormData();

  // Ajout des champs texte
  Object.entries(formData).forEach(([key, value]) => {
    submitData.append(key, value);
  });

  // Ajout des photos (fichiers)
  carPhotos.forEach((photo) => submitData.append("photos", photo));

  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:8000/voitures/add/", {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        // Ne pas mettre 'Content-Type' ici, le navigateur gère automatiquement pour FormData
      },
      body: submitData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      setMessage(
        "Erreur lors de l'ajout de la voiture: " + (errorData.error || "Erreur inconnue")
      );
      setMessageType("error");
      setLoading(false);
      return;
    }

    await response.json();
    setMessage("Voiture ajoutée avec succès !");
    setMessageType("success");

    resetForm();
    fetchCars();
  } catch (error) {
    setMessage("Erreur réseau : " + error.message);
    setMessageType("error");
  } finally {
    setLoading(false);
  }
};

  return (
    <Box sx={{ p: 3 }}>
      {/* Bouton ajouter voiture */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Fab
          variant="extended"
          color="primary"
          onClick={() => setShowForm(!showForm)}
          sx={{
            backgroundColor: "#f8bbd0",
            "&:hover": { backgroundColor: "#e91e63" },
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          {showForm ? "Fermer le formulaire" : "Ajouter une voiture"}
        </Fab>
      </Box>

      {/* Formulaire ajout voiture */}
      <Dialog
        open={showForm}
        onClose={() => !loading && resetForm()}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2, maxHeight: "90vh" } }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#f8bbd0",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Ajouter une voiture</Typography>
          <IconButton onClick={resetForm} disabled={loading} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          {message && (
            <Alert severity={messageType} sx={{ mb: 2 }} onClose={() => setMessage("")}>
              {message}
            </Alert>
          )}

          <form id="car-form" onSubmit={handleSubmit}>
            <Paper elevation={1} sx={{ p: 2, mb: 3, bgcolor: "#f5f5f5" }}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Photos de la voiture (max 5)</strong>
              </Typography>

              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: "none" }}
              />

              <Button
                variant="outlined"
                startIcon={<PhotoCameraIcon />}
                onClick={triggerFileInput}
                disabled={loading || carPhotos.length >= 5}
                sx={{ mb: 2 }}
              >
                Ajouter des photos
              </Button>

              {previewPhotos.length > 0 && (
                <ImageList cols={3} rowHeight={120} sx={{ mt: 1 }}>
                  {previewPhotos.map((preview, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        style={{ width: "100%", height: "120px", objectFit: "cover" }}
                      />
                      <ImageListItemBar
                        actionIcon={
                          <IconButton
                            onClick={() => removePhoto(index)}
                            disabled={loading}
                            sx={{ color: "white" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </Paper>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Marque"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Modèle"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Année"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleInputChange}
                  inputProps={{ min: 1900, max: new Date().getFullYear() }}
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Immatriculation"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Couleur"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Prix / jour (€)"
                  name="dailyPrice"
                  type="number"
                  value={formData.dailyPrice}
                  onChange={handleInputChange}
                  inputProps={{ min: 0, step: 0.01 }}
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Kilométrage"
                  name="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  inputProps={{ min: 0 }}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth disabled={loading}>
                  <InputLabel>Carburant</InputLabel>
                  <Select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    label="Carburant"
                  >
                    <MenuItem value="">Sélectionner</MenuItem>
                    <MenuItem value="Essence">Essence</MenuItem>
                    <MenuItem value="Diesel">Diesel</MenuItem>
                    <MenuItem value="Électrique">Électrique</MenuItem>
                    <MenuItem value="Hybride">Hybride</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth disabled={loading}>
                  <InputLabel>Transmission</InputLabel>
                  <Select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    label="Transmission"
                  >
                    <MenuItem value="">Sélectionner</MenuItem>
                    <MenuItem value="Automatique">Automatique</MenuItem>
                    <MenuItem value="Manuelle">Manuelle</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Moteur (L)"
                  name="engineSize"
                  type="number"
                  value={formData.engineSize}
                  onChange={handleInputChange}
                  inputProps={{ step: 0.1, min: 0 }}
                  placeholder="ex: 2.0"
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Puissance (ch)"
                  name="power"
                  type="number"
                  value={formData.power}
                  onChange={handleInputChange}
                  inputProps={{ min: 0 }}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Portes"
                  name="doors"
                  type="number"
                  value={formData.doors}
                  onChange={handleInputChange}
                  inputProps={{ min: 1, max: 6 }}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Places"
                  name="seats"
                  type="number"
                  value={formData.seats}
                  onChange={handleInputChange}
                  inputProps={{ min: 1, max: 9 }}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Coffre (L)"
                  name="trunkCapacity"
                  type="number"
                  value={formData.trunkCapacity}
                  onChange={handleInputChange}
                  inputProps={{ min: 0 }}
                  disabled={loading}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>

        <DialogActions sx={{ p: 2, bgcolor: "#f5f5f5" }}>
          <Button onClick={resetForm} disabled={loading} sx={{ color: "#666" }}>
            Annuler
          </Button>
          <Button
            type="submit"
            form="car-form"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <AddIcon />}
            sx={{
              backgroundColor: "#f8bbd0",
              "&:hover": {
                backgroundColor: "#e91e63",
              },
            }}
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Affichage voitures */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3 }}>
        {loadingCars && <Typography>Chargement des voitures...</Typography>}
        {errorCars && <Alert severity="error">{errorCars}</Alert>}
        {!loadingCars && !errorCars && cars.length === 0 && (
          <Typography>Aucune voiture disponible.</Typography>
        )}
        {cars.map((car) => (
          <CarCard key={car._id || car.id || car.registrationNumber} car={car} />
        ))}
      </Box>
    </Box>
  );
};

export default ReservationsManager;
