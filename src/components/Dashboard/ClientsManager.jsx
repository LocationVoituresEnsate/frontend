import React, { useState, useEffect } from 'react';
import AddClientForm from './AddClientForm';
import ClientsTable from './ClientsTable';
import { FaUserPlus } from 'react-icons/fa';

const ClientManager = () => {
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  // Simuler le chargement des clients depuis une API
  useEffect(() => {
    // Dans un cas réel, cela serait remplacé par un appel API
    const sampleClients = [
      {
        first_name: "Ali",
        last_name: "Ahmadi",
        email: "john.doe@example.com",
        phone_number: "123456789",
        address: "123, Rue Exemple",
        license_number: "A1234567",
        license_country: "France"
      },
      {
        first_name: "Sophie",
        last_name: "Martin",
        email: "client2@example.com",
        phone_number: "0612345678",
        address: "28 Avenue Mohammed V, Rabat",
        license_number: "B7654321",
        license_country: "Maroc"
      },
      {
        first_name: "Jean",
        last_name: "Dupont",
        email: "client1@example.com",
        phone_number: "0601234567",
        address: "15 Rue des Lilas, Casablanca",
        license_number: "C9876543",
        license_country: "Maroc"
      }
    ];
    
    setClients(sampleClients);
  }, []);

  const handleAddClient = (clientData) => {
    if (editingClient) {
      // Mise à jour d'un client existant
      setClients(clients.map((client, index) => 
        index === clients.indexOf(editingClient) ? clientData : client
      ));
      setEditingClient(null);
    } else {
      // Ajout d'un nouveau client
      setClients([...clients, clientData]);
    }
    setIsFormVisible(false);
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setIsFormVisible(true);
  };

  const handleDeleteClient = (clientToDelete) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      setClients(clients.filter(client => client !== clientToDelete));
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) {
      setEditingClient(null);
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text">Gestion des clients</h1>
        <button 
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-md font-medium shadow-sm transition-all duration-200 ${
            isFormVisible 
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300' 
              : 'bg-fuchsia hover:bg-fuchsia/90 text-white'
          }`}
          onClick={toggleFormVisibility}
        >
          {!isFormVisible && <FaUserPlus size={16} className="mr-2" />}
          <span>{isFormVisible ? 'Annuler' : '+ Ajouter un client'}</span>
        </button>
      </div>

      {isFormVisible && (
        <AddClientForm 
          onAddClient={handleAddClient} 
          initialData={editingClient}
        />
      )}

      <ClientsTable 
        clients={clients} 
        onEdit={handleEditClient} 
        onDelete={handleDeleteClient} 
      />
    </div>
  );
};

export default ClientManager;