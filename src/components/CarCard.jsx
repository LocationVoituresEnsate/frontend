import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "../assets/porsche-rouge.png";
import "./ProductCard.css";

const CarCard = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showReserveForm, setShowReserveForm] = useState(false);

  // Reservation form state
  const [client, setClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const car = {
    brand: "Volkswagen",
    model: "Passat",
    year: 2022,
    registrationNumber: "AB-123-CD",
    color: "Rouge",
    dailyPrice: 75.0,
    mileage: 45000,
    fuelType: "Essence",
    transmission: "Automatique",
    engineSize: 2.0,
    power: 150,
    doors: 4,
    seats: 5,
    trunkCapacity: 450,
    insuranceNumber: "INS-456789",
    insuranceExpiry: "2025-01-01",
    technicalInspectionDate: "2024-06-01",
    nextInspectionDue: "2026-06-01",
    imageUrl: Image,
  };

  const clients = ["Client A", "Client B", "Client C"]; // example clients

  const bookedRanges = [
    { start: new Date(2025, 4, 20), end: new Date(2025, 4, 22) },
    { start: new Date(2025, 4, 28), end: new Date(2025, 4, 30) },
  ];

  // Generate an array of disabled dates from bookedRanges
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
    <div className="car_box">
      <span className="icon close-icon" title="Supprimer">
        <i className="fa-solid fa-trash"></i>
      </span>

      <img src={Image} alt="Car" />

      <div className="description">
        <h2>Volkswagen</h2>
        <p className="price">
          $5.00 <span>$6.5</span>
        </p>
        <p className="para">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <button className="btn" onClick={() => setShowReserveForm(true)}>
          Reserver
        </button>
      </div>

      {/* Info icon */}
      <span className="icon info-icon" title="Info">
        <i
          className="fa-solid fa-circle-info"
          onClick={() => setShowInfo(!showInfo)}
        ></i>
      </span>

      {/* Info Modal */}
      {showInfo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-top-band"></div>
            <h3> Informations Complètes</h3>
            <ul>
              <li>
                <strong>Marque :</strong> Volkswagen
              </li>
              <li>
                <strong>Modèle :</strong> Passat
              </li>
              <li>
                <strong>Année :</strong> 2022
              </li>
              <li>
                <strong>Immatriculation :</strong> AB-123-CD
              </li>
              <li>
                <strong>Couleur :</strong> Rouge
              </li>
              <li>
                <strong>Prix / jour :</strong> $75
              </li>
              <li>
                <strong>Kilométrage :</strong> 45000 km
              </li>
              <li>
                <strong>Carburant :</strong> Essence
              </li>
              <li>
                <strong>Transmission :</strong> Automatique
              </li>
              <li>
                <strong>Moteur :</strong> 2 L
              </li>
              <li>
                <strong>Puissance :</strong> 150 ch
              </li>
              <li>
                <strong>Portes :</strong> 4
              </li>
              <li>
                <strong>Places :</strong> 5
              </li>
              <li>
                <strong>Coffre :</strong> 450 L
              </li>
            </ul>
            <button className="close-btn" onClick={() => setShowInfo(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {showReserveForm && (
        <div className="modal-overlay">
          <div className="modal-content reservation-form">
            <h3>Réserver cette voiture</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>
                Choisir un client:
                <select
                  required
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                >
                  <option value="" disabled>
                    -- Sélectionner --
                  </option>
                  {clients.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <div style={{ marginTop: "20px" }}>
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => setDateRange(update)}
                  excludeDates={bookedDates}
                  minDate={new Date()}
                  inline // This makes the full calendar always visible
                />
              </div>

              <button
                type="submit"
                disabled={!client || !startDate || !endDate}
                style={{ marginTop: "20px" }}
              >
                Confirmer
              </button>
              <button
                type="button"
                onClick={() => setShowReserveForm(false)}
                style={{ marginLeft: "10px" }}
              >
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarCard;
