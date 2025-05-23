import React, { useState, useRef } from "react";
import Card from "./Card";
import "./ProductCard.css";

const ReservationsManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [carPhotos, setCarPhotos] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + carPhotos.length > 5) {
      alert("Maximum 5 photos allowed");
      return;
    }

    const newPhotos = [...carPhotos, ...files];
    setCarPhotos(newPhotos);

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewPhotos((prev) => [...prev, ...newPreviewUrls]);
  };

  const removePhoto = (index) => {
    const newPhotos = [...carPhotos];
    newPhotos.splice(index, 1);
    setCarPhotos(newPhotos);

    const newPreviews = [...previewPhotos];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviewPhotos(newPreviews);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const formElements = e.target.elements;

    // Add all form fields
    for (let element of formElements) {
      if (element.name && element.type !== "file") {
        formData.append(element.name, element.value);
      }
    }

    // Add all photos
    carPhotos.forEach((photo) => {
      formData.append("photos", photo);
    });

    // Here you would send formData to your backend
    console.log("Form data:", Object.fromEntries(formData));

    // Reset form
    setShowForm(false);
    setCarPhotos([]);
    setPreviewPhotos([]);
  };

  return (
    <div className="carCards">
      {/* Top Bar with Add Car Button */}
      <div className="top-bar">
        <button className="add-voiture" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Fermer le formulaire" : "Ajouter une voiture"}
        </button>
      </div>

      {/* Add Car Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-top-band"></div>
            <h3>Ajouter une voiture</h3>

            <form onSubmit={handleSubmit}>
              {/* Photo Upload Section */}
              <div className="form-row">
                <div className="form-group photo-upload">
                  <label>
                    <strong>Photos de la voiture (max 5):</strong>
                    <div className="photo-upload-container">
                      <input
                        type="file"
                        ref={fileInputRef}
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        style={{ display: "none" }}
                      />
                      <button
                        type="button"
                        className="upload-btn"
                        onClick={triggerFileInput}
                      >
                        <span>+ Ajouter des photos</span>
                      </button>

                      <div className="photo-preview-container">
                        {previewPhotos.map((preview, index) => (
                          <div key={index} className="photo-preview">
                            <img src={preview} alt={`Preview ${index}`} />
                            <button
                              type="button"
                              className="remove-photo-btn"
                              onClick={() => removePhoto(index)}
                              aria-label="Remove photo"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Car Details Form */}
              <div className="form-grid">
                {/* Row 1 - Brand and Model */}
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <strong>Marque :</strong>
                      <input type="text" name="brand" required />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      <strong>Modèle :</strong>
                      <input type="text" name="model" required />
                    </label>
                  </div>
                </div>

                {/* Row 2 - Year and License */}
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <strong>Année :</strong>
                      <input
                        type="number"
                        name="year"
                        min="1900"
                        max={new Date().getFullYear()}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      <strong>Immatriculation :</strong>
                      <input type="text" name="license" required />
                    </label>
                  </div>
                </div>

                {/* Row 3 - Color */}
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <strong>Couleur :</strong>
                      <input type="text" name="color" required />
                    </label>
                  </div>
                </div>

                {/* Row 4 - Price and Mileage */}
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <strong>Prix / jour (€) :</strong>
                      <input
                        type="number"
                        name="price"
                        min="0"
                        step="0.01"
                        required
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      <strong>Kilométrage :</strong>
                      <input type="number" name="mileage" min="0" required />
                    </label>
                  </div>
                </div>

                {/* Row 5 - Fuel and Transmission */}
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <strong>Carburant :</strong>
                      <select name="fuel" required>
                        <option value="">Sélectionner</option>
                        <option value="essence">Essence</option>
                        <option value="diesel">Diesel</option>
                        <option value="electrique">Électrique</option>
                        <option value="hybride">Hybride</option>
                      </select>
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      <strong>Transmission :</strong>
                      <select name="transmission" required>
                        <option value="">Sélectionner</option>
                        <option value="automatique">Automatique</option>
                        <option value="manuelle">Manuelle</option>
                      </select>
                    </label>
                  </div>
                </div>

                {/* Row 6 - Engine and Power */}
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <strong>Moteur :</strong>
                      <input type="text" name="engine" required />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      <strong>Puissance (ch) :</strong>
                      <input type="number" name="power" min="0" required />
                    </label>
                  </div>
                </div>

                {/* Row 7 - Doors and Seats */}
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <strong>Portes :</strong>
                      <input
                        type="number"
                        name="doors"
                        min="1"
                        max="6"
                        required
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      <strong>Places :</strong>
                      <input
                        type="number"
                        name="seats"
                        min="1"
                        max="9"
                        required
                      />
                    </label>
                  </div>
                </div>

                {/* Row 8 - Trunk */}
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <strong>Coffre (L) :</strong>
                      <input type="number" name="trunk" min="0" required />
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button type="submit" className="confirm-btn">
                  Enregistrer
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowForm(false);
                    setCarPhotos([]);
                    setPreviewPhotos([]);
                  }}
                >
                  Fermer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cars List */}
      <div className="cards">
        <Card />
      </div>
    </div>
  );
};

export default ReservationsManager;
