import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "../assets/porsche-rouge.png";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
  width: 320,
  maxWidth: "90vw",
};

const CarCard = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showReserveForm, setShowReserveForm] = useState(false);

  const [client, setClient] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const car = {
    brand: "Volkswagen",
    dailyPrice: 5.0,
    oldPrice: 6.5,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    imageUrl: Image,
  };

  const clients = ["Client A", "Client B", "Client C"];

  const bookedRanges = [
    { start: new Date(2025, 4, 20), end: new Date(2025, 4, 22) },
    { start: new Date(2025, 4, 28), end: new Date(2025, 4, 30) },
  ];

  const getBookedDates = () => {
    let dates = [];
    bookedRanges.forEach(({ start, end }) => {
      let curr = new Date(start);
      while (curr <= end) {
        dates.push(new Date(curr));
        curr.setDate(curr.getDate() + 1);
      }
    });
    return dates;
  };

  const bookedDates = getBookedDates();

  const setDateRange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      <Card
        sx={{
          width: 300,
          bgcolor: "#f9f0f3",
          borderRadius: 2,
          boxShadow: 3,
          position: "relative",
          p: 2,
        }}
      >
        {/* Delete icon top right */}
        <IconButton
          aria-label="delete"
          sx={{ position: "absolute", top: 8, right: 8, color: "#d6a4a4" }}
        >
          <DeleteIcon />
        </IconButton>

        {/* Car image */}
        <CardMedia
          component="img"
          height="160"
          image={car.imageUrl}
          alt={car.brand}
          sx={{ borderRadius: 2, objectFit: "cover" }}
        />

        {/* Content */}
        <CardContent sx={{ pt: 2, pb: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "#5a2612" }}
          >
            {car.brand}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#3c1a00" }}
            >
              ${car.dailyPrice.toFixed(2)}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#bbb",
                textDecoration: "line-through",
                ml: 1,
              }}
            >
              ${car.oldPrice.toFixed(2)}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="#432a1b"
            sx={{ mb: 2, minHeight: 44 /* pour aligner bouton */ }}
          >
            {car.description}
          </Typography>

          <Button
            variant="outlined"
            fullWidth
            sx={{
              borderColor: "#5a2612",
              color: "#5a2612",
              fontWeight: "bold",
              borderRadius: 20,
              "&:hover": {
                backgroundColor: "#5a2612",
                color: "#fff",
                borderColor: "#5a2612",
              },
            }}
            onClick={() => setShowReserveForm(true)}
          >
            RESERVER
          </Button>
        </CardContent>

        {/* Info icon bottom right */}
        <IconButton
          aria-label="info"
          onClick={() => setShowInfo(true)}
          sx={{
            position: "absolute",
            bottom: 12,
            right: 12,
            color: "#d6a4a4",
          }}
        >
          <InfoIcon />
        </IconButton>
      </Card>

      {/* Modal Infos */}
      <Modal open={showInfo} onClose={() => setShowInfo(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h3" mb={2}>
            Informations Complètes
          </Typography>
          <Typography variant="body2" mb={3}>
            {/* Exemple d'infos, adapte comme tu veux */}
            Marque: Volkswagen
            <br />
            Modèle: Passat
            <br />
            Année: 2022
            <br />
            Immatriculation: AB-123-CD
            <br />
            Couleur: Rouge
            <br />
            Prix / jour: $75
            <br />
            Kilométrage: 45000 km
            <br />
            Carburant: Essence
            <br />
            Transmission: Automatique
            <br />
            Moteur: 2 L
            <br />
            Puissance: 150 ch
            <br />
            Portes: 4
            <br />
            Places: 5
            <br />
            Coffre: 450 L
          </Typography>
          <Button variant="contained" onClick={() => setShowInfo(false)} fullWidth>
            Fermer
          </Button>
        </Box>
      </Modal>

      {/* Modal Réservation */}
      <Modal open={showReserveForm} onClose={() => setShowReserveForm(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h3" mb={2}>
            Réserver cette voiture
          </Typography>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <FormControl fullWidth required>
              <InputLabel id="client-select-label">Choisir un client</InputLabel>
              <Select
                labelId="client-select-label"
                value={client}
                label="Choisir un client"
                onChange={(e) => setClient(e.target.value)}
              >
                <MenuItem value="">
                  <em>-- Sélectionner --</em>
                </MenuItem>
                {clients.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={setDateRange}
              excludeDates={bookedDates}
              minDate={new Date()}
              inline
            />

            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                type="submit"
                disabled={!client || !startDate || !endDate}
              >
                Confirmer
              </Button>
              <Button
                variant="outlined"
                onClick={() => setShowReserveForm(false)}
              >
                Annuler
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default CarCard;
