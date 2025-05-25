import React, { useState, useEffect } from 'react';
import AddClientForm from './AddClientForm';
import ClientsTable from './ClientsTable';
import { FaUserPlus } from 'react-icons/fa';
import { Avatar } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

const ClientManager = () => {
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Charger tous les clients
const fetchClients = () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    fetch('http://127.0.0.1:8000/customer/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des clients');
        return res.json();
      })
      .then((data) => {
        const list = data.clients || [];
        setClients(list);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchClients();
  }, []);


  const handleRefresh = () => {
    fetchClients();
    setSuccessMessage(null);
    setError(null);
  };

  // Création ou mise à jour selon le contexte
  const handleAddClient = async (clientData) => {
    if (editingClient) {
      await handleUpdateClient(editingClient.client_id, clientData);
    } else {
      await handleCreateClient(clientData);
    }
  };

  // Création client (POST)
  const handleCreateClient = async (clientData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/customer/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(clientData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Client créé avec succès !');
        setError(null);
        setIsFormVisible(false);
        setEditingClient(null);
        fetchClients();
      } else {
        setError(data.message || 'Erreur lors de la création du client');
        setSuccessMessage(null);
      }
    } catch (err) {
      setError('Erreur réseau');
      setSuccessMessage(null);
    }
  };

  // Mise à jour client (PUT)
  const handleUpdateClient = async (clientId, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/customer/update/${clientId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Client mis à jour avec succès !');
        setError(null);
        setIsFormVisible(false);
        setEditingClient(null);
        fetchClients();
      } else {
        setError(data.message || 'Erreur lors de la mise à jour du client');
        setSuccessMessage(null);
      }
    } catch (err) {
      setError('Erreur réseau');
      setSuccessMessage(null);
    }
  };

  // Suppression client (DELETE)
  const handleDeleteClient = async (clientToDelete) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/customer/delete/${clientToDelete.client_id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });

      if (response.ok) {
        setSuccessMessage('Client supprimé avec succès');
        setError(null);
        fetchClients();
      } else {
        const data = await response.json();
        setError(data.message || 'Erreur lors de la suppression du client');
        setSuccessMessage(null);
      }
    } catch (err) {
      setError('Erreur réseau');
      setSuccessMessage(null);
    }
  };

  // Edition client : afficher le formulaire avec les données
  const handleEditClient = (client) => {
    setEditingClient(client);
    setIsFormVisible(true);
    setError(null);
    setSuccessMessage(null);
  };

  // Afficher/cacher le formulaire d'ajout/modification
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) {
      setEditingClient(null);
    }
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="flex justify-end mb-4">
        <Avatar
          sx={{ bgcolor: 'primary.main', cursor: 'pointer', boxShadow: 3, width: 40, height: 40 }}
          onClick={handleRefresh}
          title="Rafraîchir"
        >
          <RefreshIcon />
        </Avatar>
      </div>
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

      {loading && <p>Chargement des clients...</p>}
      {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {isFormVisible && (
        <AddClientForm
          onAddClient={handleAddClient}
          initialData={editingClient}
          onCancel={() => {
            setIsFormVisible(false);
            setEditingClient(null);
            setError(null);
            setSuccessMessage(null);
          }}
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
