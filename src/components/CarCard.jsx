import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DefaultImage from "../assets/porsche-rouge.png"; // Image par défaut si pas d'image

const CarCard = ({ car }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showReserveForm, setShowReserveForm] = useState(false);

  const [client, setClient] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Clients exemples
  const clients = ["Client A", "Client B", "Client C"];

  // Dates réservées — adapter si ta voiture a une propriété reservation_periods
  const bookedRanges = car.reservation_periods || [];

  const getBookedDates = () => {
    let dates = [];
    bookedRanges.forEach(({ start, end }) => {
      let curr = new Date(start);
      const last = new Date(end);
      while (curr <= last) {
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

      <img src={car.imageUrl || DefaultImage} alt={`${car.brand} ${car.model}`} />

      <div className="description">
        <h2>{car.brand || "Marque inconnue"}</h2>
        <p className="price">
          ${car.dailyPrice ? car.dailyPrice.toFixed(2) : "N/A"} / jour
        </p>
        <p className="para">{car.description || "Pas de description disponible."}</p>
        <button className="btn" onClick={() => setShowReserveForm(true)}>
          Réserver
        </button>
      </div>

      <span className="icon info-icon" title="Info">
        <i
          className="fa-solid fa-circle-info"
          onClick={() => setShowInfo(!showInfo)}
        ></i>
      </span>

      {showInfo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-top-band"></div>
            <h3> Informations Complètes</h3>
            <ul>
              <li><strong>Marque :</strong> {car.brand || "N/A"}</li>
              <li><strong>Modèle :</strong> {car.model || "N/A"}</li>
              <li><strong>Année :</strong> {car.year || "N/A"}</li>
              <li><strong>Immatriculation :</strong> {car.registrationNumber || "N/A"}</li>
              <li><strong>Couleur :</strong> {car.color || "N/A"}</li>
              <li><strong>Prix / jour :</strong> ${car.dailyPrice ? car.dailyPrice.toFixed(2) : "N/A"}</li>
              <li><strong>Kilométrage :</strong> {car.mileage || "N/A"} km</li>
              <li><strong>Carburant :</strong> {car.fuelType || "N/A"}</li>
              <li><strong>Transmission :</strong> {car.transmission || "N/A"}</li>
              <li><strong>Moteur :</strong> {car.engineSize || "N/A"} L</li>
              <li><strong>Puissance :</strong> {car.power || "N/A"} ch</li>
              <li><strong>Portes :</strong> {car.doors || "N/A"}</li>
              <li><strong>Places :</strong> {car.seats || "N/A"}</li>
              <li><strong>Coffre :</strong> {car.trunkCapacity || "N/A"} L</li>
            </ul>
            <button className="close-btn" onClick={() => setShowInfo(false)}>Fermer</button>
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
                  <option value="" disabled>-- Sélectionner --</option>
                  {clients.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>

              <div style={{ marginTop: "20px" }}>
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(dates) => setDateRange(dates)}
                  excludeDates={bookedDates}
                  minDate={new Date()}
                  inline
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
