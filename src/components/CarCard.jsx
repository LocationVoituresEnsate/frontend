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
} from "@mui/material";

const DefaultCarImage = "https://via.placeholder.com/300x150?text=No+Image";

const CarCard = ({ car, onDelete, onEdit }) => {
  const [showInfo, setShowInfo] = useState(false);
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
    }
  }, [car]);

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

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const reservationData = {
        client_id: client,
        voiture_id: car._id,
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
      
      if (!carId) {
        throw new Error("ID de la voiture manquant");
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
      
      if (!carId) {
        throw new Error("ID de la voiture manquant");
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

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        width: 320,
        m: 1,
        p: 1.5,
        boxShadow: 1,
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
          ? `${parseFloat(car.dailyPrice).toFixed(2)} € / jour`
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
            onClick={() => setShowInfo(!showInfo)}
          >
            {showInfo ? "Cacher" : "Infos"}
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

      {showInfo && (
        <Paper sx={{ mt: 2, p: 2, bgcolor: "#f9f9f9" }}>
          {[
            { label: "Année", value: car.year },
            { label: "Immatriculation", value: car.registrationNumber },
            { label: "Couleur", value: car.color },
            { label: "Kilométrage", value: `${car.mileage} km` },
            { label: "Carburant", value: car.fuelType },
            { label: "Transmission", value: car.transmission },
            { label: "Moteur", value: `${car.engineSize} L` },
            { label: "Puissance", value: `${car.power} ch` },
            { label: "Portes", value: car.doors },
            { label: "Places", value: car.seats },
            { label: "Coffre", value: `${car.trunkCapacity} L` },
          ].map(({ label, value }) => (
            <Typography variant="body2" key={label}>
              <strong>{label} :</strong> {value ?? "N/A"}
            </Typography>
          ))}
        </Paper>
      )}

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
            <strong>{car.brand} {car.model}</strong> - {car.registrationNumber}
          </Typography>
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
                    label="Prix par jour (€)"
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
                  <TextField
                    label="URL de l'image"
                    fullWidth
                    value={editData.imageUrl}
                    onChange={(e) => handleEditInputChange("imageUrl", e.target.value)}
                  />
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