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
} from "@mui/material";

const DefaultCarImage = "https://via.placeholder.com/300x150?text=No+Image";

const CarCard = ({ car }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showReserveForm, setShowReserveForm] = useState(false);
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:8000/customer/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok)
          throw new Error("Erreur lors du chargement des clients");
        const data = await response.json();
        console.log("Clients récupérés :", data);
        setClients(Array.isArray(data) ? data : data.clients || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

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
      <Typography variant="body2" sx={{ mt: 1 }}>
        ID Voiture: {car.id ?? "inconnu"}
      </Typography>
      <Typography variant="h6" mt={1}>
        {car.brand || "Marque inconnue"} {car.model || ""}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {car.dailyPrice !== undefined
          ? `${parseFloat(car.dailyPrice).toFixed(2)} € / jour`
          : "Prix non disponible"}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 1 }}
        onClick={() => setShowReserveForm(true)}
      >
        Réserver
      </Button>
      <Button
        variant="outlined"
        sx={{ mt: 1, ml: 1 }}
        onClick={() => setShowInfo(!showInfo)}
      >
        {showInfo ? "Cacher Infos" : "Voir Infos"}
      </Button>

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
    </Box>
  );
};

export default CarCard;
