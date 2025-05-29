import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Alert,
  Grid,
  Divider,
} from "@mui/material";

const DefaultCarImage = "https://via.placeholder.com/300x150?text=No+Image";

const CarCard = ({ car, onDelete, onEdit, index }) => {
  // Create a unique identifier for this card instance
  const cardId = car._id || car.id || `car-${index}-${car.brand}-${car.model}`;
  
  const [showInfoModal, setShowInfoModal] = useState(false); // Changed to modal
  const [showReserveForm, setShowReserveForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Edit form states
  const [editData, setEditData] = useState({
    brand: "",
    model: "",
    year: "",
    dailyPrice: "",
    registrationNumber: "",
    color: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    engineSize: "",
    power: "",
    doors: "",
    seats: "",
    trunkCapacity: "",
    imageUrl: ""
  });

  // State for image upload
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        
        // Debug: Check if token exists
        if (!token) {
          throw new Error("Token d'authentification manquant");
        }
        
        console.log("Fetching clients from API...");
        const response = await fetch("http://127.0.0.1:8000/customer/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Debug: Log response details
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        
        // Check if response is ok
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        
        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const responseText = await response.text();
          console.error("Non-JSON response:", responseText);
          throw new Error("La réponse du serveur n'est pas au format JSON");
        }
        
        const data = await response.json();
        console.log("Clients récupérés :", data);
        setClients(Array.isArray(data) ? data : data.clients || []);
      } catch (err) {
        console.error("Fetch clients error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  // Initialize edit form with car data
  useEffect(() => {
    if (car) {
      setEditData({
        brand: car.brand || "",
        model: car.model || "",
        year: car.year || "",
        dailyPrice: car.dailyPrice || "",
        registrationNumber: car.registrationNumber || "",
        color: car.color || "",
        mileage: car.mileage || "",
        fuelType: car.fuelType || "",
        transmission: car.transmission || "",
        engineSize: car.engineSize || "",
        power: car.power || "",
        doors: car.doors || "",
        seats: car.seats || "",
        trunkCapacity: car.trunkCapacity || "",
        imageUrl: car.imageUrl || ""
      });
      
      // Reset image states when opening edit form
      setSelectedImage(null);
      setImagePreview(car.imageUrl || null);
    }
  }, [car, showEditForm]);

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    if (!client || !startDate || !endDate) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("La date de fin doit être supérieure à la date de début");
      return;
    }

    const carId = car._id || car.id;
    if (!carId || carId.startsWith('car-')) {
      alert("Cette voiture n'a pas d'ID valide pour la réservation");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const reservationData = {
        client_id: client,
        voiture_id: carId,
        start_date: startDate,
        end_date: endDate,
      };

      console.log("Données envoyées:", reservationData);

      const response = await fetch("http://127.0.0.1:8000/reservations/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Erreur lors de la réservation");
      }

      const data = await response.json();
      alert(`Réservation confirmée ! ID: ${data.id || "N/A"}`);

      setShowReserveForm(false);
      setClient("");
      setStartDate("");
      setEndDate("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("token");
      const carId = car._id || car.id;
      
      // Debug: Check if car ID exists
      console.log("Car ID for delete:", carId);
      console.log("Full car object:", car);
      console.log("Card ID:", cardId);
      
      if (!carId || carId.startsWith('car-')) {
        throw new Error("Cette voiture n'a pas d'ID valide pour la suppression");
      }
      
      console.log("Deleting car with ID:", carId);
      
      // Include the car ID in the URL path (similar to update)
      const response = await fetch(`http://127.0.0.1:8000/voitures/delete/${carId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Delete response status:", response.status);

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage = "Erreur lors de la suppression";
        
        if (contentType && contentType.includes("application/json")) {
          const errData = await response.json();
          errorMessage = errData.message || errData.error || errorMessage;
        } else {
          const errorText = await response.text();
          console.error("HTML Error response:", errorText);
          errorMessage = `Erreur ${response.status}: ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      alert("Voiture supprimée avec succès!");
      setShowDeleteConfirm(false);
      
      // Force page refresh to see changes
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
      // Call parent component's onDelete function if provided
      if (onDelete) {
        onDelete(carId);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
      alert(`Erreur: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const carId = car._id || car.id;
      
      // Debug: Check if car ID exists
      console.log("Car ID for update:", carId);
      console.log("Full car object:", car);
      console.log("Card ID:", cardId);
      
      if (!carId || carId.startsWith('car-')) {
        throw new Error("Cette voiture n'a pas d'ID valide pour la modification");
      }
      
      // Don't include the ID in the body - it goes in the URL
      const updateData = {
        ...editData
      };
      
      console.log("Update data being sent:", updateData);
      
      // Include the car ID in the URL path
      const response = await fetch(`http://127.0.0.1:8000/voitures/update/${carId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage = "Erreur lors de la modification";
        
        if (contentType && contentType.includes("application/json")) {
          const errData = await response.json();
          errorMessage = errData.message || errData.error || errorMessage;
        } else {
          const errorText = await response.text();
          console.error("HTML Error response:", errorText);
          errorMessage = `Erreur ${response.status}: ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      alert("Voiture modifiée avec succès!");
      setShowEditForm(false);
      
      // Force page refresh to see changes
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
      // Call parent component's onEdit function if provided
      if (onEdit) {
        onEdit({...car, ...editData}); // Return updated car data
      }
    } catch (err) {
      console.error("Edit error:", err);
      setError(err.message);
      alert(`Erreur: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle image file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image valide');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La taille de l\'image ne doit pas dépasser 5MB');
        return;
      }

      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        // Update editData with base64 image
        setEditData(prev => ({
          ...prev,
          imageUrl: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset image selection
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setEditData(prev => ({
      ...prev,
      imageUrl: car.imageUrl || ""
    }));
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        width: 320,
        m: 1,
        p: 1.5,
        boxShadow: 1,
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: 3,
        }
      }}
    >
      <img
        src={car.imageUrl || DefaultCarImage}
        alt={`${car.brand || "Marque inconnue"} ${car.model || ""}`}
        style={{
          width: "100%",
          height: 150,
          objectFit: "cover",
          borderRadius: 8,
        }}
      />
      <Typography variant="h6" mt={1}>
        {car.brand || "Marque inconnue"} {car.model || ""}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {car.dailyPrice !== undefined
          ? `${parseFloat(car.dailyPrice).toFixed(2)} MAD / jour`
          : "Prix non disponible"}
      </Typography>

      {/* Main action buttons */}
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setShowReserveForm(true)}
          >
            Réserver
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setShowInfoModal(true)} // Open modal instead
          >
            Voir Détails
          </Button>
        </Grid>
      </Grid>

      {/* Edit and Delete buttons */}
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => setShowEditForm(true)}
          >
            Modifier
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => setShowDeleteConfirm(true)}
          >
            Supprimer
          </Button>
        </Grid>
      </Grid>

      {/* Car Details Modal - Replaces the expanding panel */}
      <Dialog
        open={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle sx={{ backgroundColor: "#e91e63", color: "white" }}>
          Détails de la voiture
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {/* Car Image */}
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={car.imageUrl || DefaultCarImage}
                  alt={`${car.brand || "Marque inconnue"} ${car.model || ""}`}
                  style={{
                    width: "100%",
                    maxWidth: 300,
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #ddd"
                  }}
                />
                <Typography variant="h6" sx={{ mt: 2, color: "#e91e63" }}>
                  {car.brand || "Marque inconnue"} {car.model || ""}
                </Typography>
                <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
                  {car.dailyPrice !== undefined
                    ? `${parseFloat(car.dailyPrice).toFixed(2)} € / jour`
                    : "Prix non disponible"}
                </Typography>
              </Box>
            </Grid>

            {/* Car Details */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2, color: "#e91e63" }}>
                Informations Générales
              </Typography>
              
              {[
                { label: "ID Voiture", value: cardId },
                { label: "Année", value: car.year },
                { label: "Immatriculation", value: car.registrationNumber },
                { label: "Couleur", value: car.color },
                { label: "Kilométrage", value: car.mileage ? `${car.mileage} km` : "N/A" },
              ].map(({ label, value }) => (
                <Box key={label} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {label}:
                  </Typography>
                  <Typography variant="body1">
                    {value ?? "N/A"}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ mb: 2, color: "#e91e63" }}>
                Spécifications Techniques
              </Typography>
              
              {[
                { label: "Carburant", value: car.fuelType },
                { label: "Transmission", value: car.transmission },
                { label: "Moteur", value: car.engineSize ? `${car.engineSize} L` : "N/A" },
                { label: "Puissance", value: car.power ? `${car.power} ch` : "N/A" },
                { label: "Portes", value: car.doors },
                { label: "Places", value: car.seats },
                { label: "Coffre", value: car.trunkCapacity ? `${car.trunkCapacity} L` : "N/A" },
              ].map(({ label, value }) => (
                <Box key={label} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {label}:
                  </Typography>
                  <Typography variant="body1">
                    {value ?? "N/A"}
                  </Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInfoModal(false)} variant="contained">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reservation Dialog */}
      <Dialog
        open={showReserveForm}
        onClose={() => setShowReserveForm(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>Réserver la voiture</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box display="flex" justifyContent="center" my={3}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <form onSubmit={handleReservationSubmit}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="client-select-label">Client</InputLabel>
                <Select
                  labelId="client-select-label"
                  id="client-select"
                  value={client !== undefined && client !== null ? client : ""}
                  label="Client"
                  onChange={(e) => setClient(e.target.value)}
                  required
                >
                  <MenuItem value="">
                    <em>-- Sélectionner --</em>
                  </MenuItem>
                  {clients && clients.length > 0 ? (
                    clients.map((c) => (
                      <MenuItem key={c.client_id} value={String(c.client_id)}>
                        {c.license_number ||
                          `${c.first_name} ${c.last_name}` ||
                          "Client"}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Aucun client trouvé</MenuItem>
                  )}
                </Select>
              </FormControl>

              <TextField
                type="date"
                label="Date de début"
                fullWidth
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                type="date"
                label="Date de fin"
                fullWidth
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />

              <DialogActions>
                <Button onClick={() => setShowReserveForm(false)}>
                  Annuler
                </Button>
                <Button type="submit" variant="contained">
                  Confirmer
                </Button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer cette voiture ?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>{car.brand} {car.model}</strong> - {car.registrationNumber || 'Immatriculation inconnue'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            ID Carte: {cardId}
          </Typography>
          {(!car._id && !car.id) && (
            <Typography variant="body2" color="warning.main" sx={{ mt: 1 }}>
              ⚠️ Cette voiture n'a pas d'ID de base de données valide
            </Typography>
          )}
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            Cette action est irréversible.
          </Typography>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirm(false)}>
            Annuler
          </Button>
          <Button 
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Supprimer"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={showEditForm}
        onClose={() => setShowEditForm(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>Modifier la voiture</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box display="flex" justifyContent="center" my={3}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={handleEditSubmit}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Marque"
                    fullWidth
                    value={editData.brand}
                    onChange={(e) => handleEditInputChange("brand", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Modèle"
                    fullWidth
                    value={editData.model}
                    onChange={(e) => handleEditInputChange("model", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Année"
                    type="number"
                    fullWidth
                    value={editData.year}
                    onChange={(e) => handleEditInputChange("year", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Prix par jour (MAD)"
                    type="number"
                    fullWidth
                    value={editData.dailyPrice}
                    onChange={(e) => handleEditInputChange("dailyPrice", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Immatriculation"
                    fullWidth
                    value={editData.registrationNumber}
                    onChange={(e) => handleEditInputChange("registrationNumber", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Couleur"
                    fullWidth
                    value={editData.color}
                    onChange={(e) => handleEditInputChange("color", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Kilométrage"
                    type="number"
                    fullWidth
                    value={editData.mileage}
                    onChange={(e) => handleEditInputChange("mileage", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Type de carburant"
                    fullWidth
                    value={editData.fuelType}
                    onChange={(e) => handleEditInputChange("fuelType", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Transmission"
                    fullWidth
                    value={editData.transmission}
                    onChange={(e) => handleEditInputChange("transmission", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Taille du moteur (L)"
                    type="number"
                    fullWidth
                    value={editData.engineSize}
                    onChange={(e) => handleEditInputChange("engineSize", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Puissance (ch)"
                    type="number"
                    fullWidth
                    value={editData.power}
                    onChange={(e) => handleEditInputChange("power", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nombre de portes"
                    type="number"
                    fullWidth
                    value={editData.doors}
                    onChange={(e) => handleEditInputChange("doors", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nombre de places"
                    type="number"
                    fullWidth
                    value={editData.seats}
                    onChange={(e) => handleEditInputChange("seats", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Capacité du coffre (L)"
                    type="number"
                    fullWidth
                    value={editData.trunkCapacity}
                    onChange={(e) => handleEditInputChange("trunkCapacity", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, color: "#e91e63" }}>
                    Image de la voiture
                  </Typography>
                  
                  {/* Current/Preview Image */}
                  <Box sx={{ mb: 2, textAlign: "center" }}>
                    <img
                      src={imagePreview || car.imageUrl || DefaultCarImage}
                      alt="Aperçu"
                      style={{
                        width: "100%",
                        maxWidth: 300,
                        height: 200,
                        objectFit: "cover",
                        borderRadius: 8,
                        border: "1px solid #ddd"
                      }}
                    />
                  </Box>

                  {/* Image Upload Controls */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      sx={{ color: "#e91e63", borderColor: "#e91e63" }}
                    >
                      Choisir une nouvelle image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Button>
                    
                    {selectedImage && (
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography variant="body2" sx={{ flex: 1, alignSelf: "center" }}>
                          {selectedImage.name}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={handleRemoveImage}
                        >
                          Annuler
                        </Button>
                      </Box>
                    )}
                    
                    <Typography variant="caption" color="textSecondary">
                      Formats acceptés: JPG, PNG, GIF. Taille max: 5MB
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditForm(false)}>
            Annuler
          </Button>
          <Button 
            onClick={handleEditSubmit}
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Sauvegarder"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CarCard;