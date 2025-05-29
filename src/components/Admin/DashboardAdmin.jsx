import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  LinearProgress,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  People as PeopleIcon,
  CarRental as CarIcon,
  Event as EventIcon,
  AttachMoney as MoneyIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const DashboardAdminStats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [managerCount, setManagerCount] = useState(0); // Pour stocker le nombre de managers
  const [reservationStats, setReservationStats] = useState([]);
  const [clientStats, setClientStats] = useState([]);
  const [totalRevenu, setTotalRevenu] = useState(null);

  const fetchClientStats = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/customer/statistics/"
      );
      const data = await response.json();

      const formatted = data.data.map((entry) => ({
        month: `M${String(entry.month).padStart(2, "0")}`, // Ex: "M01", "M05"
        count: entry.count,
      }));

      setClientStats(formatted);
    } catch (error) {
      console.error(
        "Erreur lors du chargement des statistiques des clients",
        error
      );
    }
  };


const fetchRevenuStats = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/reservations/revenu-par-annee/");
    const data = await response.json();

    // data = { total_revenu: 426.0 }
     console.log("Data reçue pour revenu total :", data);
    setTotalRevenu(data.total_revenu);
    
  } catch (error) {
    console.error("Erreur lors du chargement du total revenu", error);
  }
};

// Utilise useEffect pour lancer la récupération au chargement
useEffect(() => {
  fetchRevenuStats();
}, []);

  const fetchReservationStats = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/reservations/statistics/"
      );
      const data = await response.json();

      const formatted = data.data.map((entry) => ({
        month: `${String(entry.month).padStart(2, "0")}`,
        pending: entry.pending || 0,
        accepted: entry.accepted || 0,
        refused: entry.refused || 0,
      }));

      setReservationStats(formatted);
    } catch (error) {
      console.error(
        "Erreur lors du chargement des statistiques de réservation",
        error
      );
    }
  };

  // Récupérer le nombre de managers depuis l'API
  const fetchManagerCount = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/manager/count/");
      if (response.ok) {
        const data = await response.json();
        setManagerCount(data.manager_count); // Met à jour le nombre de managers
      } else {
        console.error("Erreur lors de la récupération du nombre de managers");
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [clientCount, setClientCount] = useState(0);

  const fetchClientCount = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/customer/count/");
      if (response.ok) {
        const data = await response.json();
        setClientCount(data.client_count);
      } else {
        console.error("Erreur lors de la récupération du nombre de clients");
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };

  const [carCount, setCarCount] = useState(0);
  const fetchCarCount = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/voitures/count/");
      if (response.ok) {
        const data = await response.json();
        setCarCount(data.count_voitures);
      } else {
        console.error("Erreur lors de la récupération du nombre de voitures");
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };

  // Effectuer la récupération des données au chargement du composant
  useEffect(() => {
    fetchManagerCount();
    fetchClientCount();
    fetchCarCount();
    fetchReservationStats();
    fetchRevenuStats();
    fetchClientStats();
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      fetchManagerCount();
      fetchClientCount();
      fetchCarCount();
      fetchReservationStats();
      fetchRevenuStats();
      fetchClientStats();
      setIsLoading(false);
    }, 1500);
  };

  // Statistiques globales
  const stats = [
    {
      id: 1,
      title: "Managers",
      value: managerCount,
      icon: <PeopleIcon />,
      color: { bg: "#fef1f5", text: "#e91e63" },
    },
    {
      id: 2,
      title: "Total voitures",
      value: carCount,
      icon: <CarIcon />,
      color: { bg: "#fef1f5", text: "#e91e63" },
    },
    {
      id: 3,
      title: "Revenus totaux",
      value: totalRevenu !== null ? totalRevenu.toFixed(2) + " $" : "Chargement...",
      icon: <MoneyIcon />,
      color: { bg: "#fef1f5", text: "#e91e63" },
    },
    {
      id: 4,
      title: "Clients",
      value: clientCount,
      icon: <PeopleIcon />,
      color: { bg: "#fef1f5", text: "#e91e63" },
    },
  ];

  return (
    <Box
      sx={{
        p: 3,
        pb: 5,
        bgcolor: "grey.50",
        minHeight: "100vh",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {isLoading && (
        <LinearProgress
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            height: 4,
            bgcolor: "primary.light",
          }}
          color="primary"
        />
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          color="text.primary"
          letterSpacing={1}
        >
          Tableau de bord Administrateur
        </Typography>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            cursor: "pointer",
            boxShadow: 3,
            width: 40,
            height: 40,
          }}
          onClick={handleRefresh}
          title="Rafraîchir"
        >
          <RefreshIcon />
        </Avatar>
      </Box>

      {/* Statistiques globales */}
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5, mb: 6 }}>
  {stats.map((stat) => (
    <Box
      key={stat.id}
      sx={{
        width: "calc(25% - 20px)", // 4 cards par ligne (25%) moins l’espace du gap
        minWidth: "200px",         // garantit un comportement mobile
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          height: 160,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "box-shadow 0.3s ease",
          "&:hover": { boxShadow: 9 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ textTransform: "uppercase", letterSpacing: 0.8 }}
            >
              {stat.title}
            </Typography>
            <Typography variant="h3" fontWeight={900} color="text.primary" sx={{ mt: 1 ,fontSize: '2.7rem'}}>
              {stat.value}
            </Typography>
          </Box>
          <Avatar
            sx={{
              bgcolor: stat.color.bg,
              color: stat.color.text,
              width: 60,
              height: 60,
              boxShadow: `0 0 15px ${stat.color.bg}`,
              fontSize: 34,
            }}
          >
            {stat.icon}
          </Avatar>
        </Box>
      </Paper>
    </Box>
  ))}
</Box>


      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom>
              Évolution des réservations par mois et statut
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={reservationStats}
                margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="#ea90de"
                  name="En attente"
                />
                <Line
                  type="monotone"
                  dataKey="accepted"
                  stroke="#66BB6A"
                  name="Acceptée"
                />
                <Line
                  type="monotone"
                  dataKey="refused"
                  stroke="#e91e63"
                  name="Refusée"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom>
              Nombre de clients ajoutés par mois
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={clientStats}
                margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#e91e63" name="Clients" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardAdminStats;
