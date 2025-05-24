import React, { useState, useEffect } from 'react';
import AddManagerForm from './AddManagerForm';
import ManagersTable from './ManagersTable';
import { FaUserPlus } from 'react-icons/fa';
import { Avatar } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

const ManagersAdmin = () => {
  const [managers, setManagers] = useState([]);
  const [editingManager, setEditingManager] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchManagers = () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    fetch('http://127.0.0.1:8000/manager/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des managers');
        return res.json();
      })
      .then((data) => {
        const list = data.managers || [];
        setManagers(list);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleRefresh = () => {
    fetchManagers();
    setSuccessMessage(null);
    setError(null);
  };

  // Fonction qui gère création ou mise à jour selon editingManager
  const handleAddManager = async (managerData) => {
    if (editingManager) {
      await handleUpdateManager(editingManager.id, managerData);
    } else {
      await handleCreateManager(managerData);
    }
  };

  const handleCreateManager = async (managerData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/manager/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(managerData),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Manager créé avec succès !');
        setError(null);
        setIsFormVisible(false);
        setEditingManager(null);
        fetchManagers();
      } else {
        setError(data.message || 'Erreur lors de la création du manager');
        setSuccessMessage(null);
      }
    } catch (err) {
      setError('Erreur réseau');
      setSuccessMessage(null);
    }
  };

  const handleUpdateManager = async (managerId, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/manager/update/${managerId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Manager mis à jour avec succès !');
        setError(null);
        setIsFormVisible(false);
        setEditingManager(null);
        fetchManagers();
      } else {
        setError(data.message || 'Erreur lors de la mise à jour du manager');
        setSuccessMessage(null);
      }
    } catch (err) {
      setError('Erreur réseau');
      setSuccessMessage(null);
    }
  };

  const handleDeleteManager = async (managerToDelete) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce manager ?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/manager/delete/${managerToDelete.id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la suppression du manager');
      }

      setSuccessMessage('Manager supprimé avec succès');
      setError(null);
      fetchManagers();
    } catch (err) {
      setError(err.message);
      setSuccessMessage(null);
    }
  };

  const handleEditManager = (manager) => {
    setEditingManager(manager);
    setIsFormVisible(true);
    setSuccessMessage(null);
    setError(null);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) {
      setEditingManager(null);
    }
    setSuccessMessage(null);
    setError(null);
  };

  if (loading) return <p>Chargement des managers...</p>;
  if (error) return <p>Erreur : {error}</p>;

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
        <h1 className="text-2xl font-bold text-text">Gestion des managers</h1>
        <button
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-md font-medium shadow-sm transition-all duration-200 ${
            isFormVisible
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
              : 'bg-fuchsia hover:bg-fuchsia/90 text-white'
          }`}
          onClick={toggleFormVisibility}
        >
          {!isFormVisible && <FaUserPlus size={16} className="mr-2" />}
          <span>{isFormVisible ? 'Annuler' : '+ Ajouter un manager'}</span>
        </button>
      </div>

      {isFormVisible && (
        <AddManagerForm
          onAddManager={handleAddManager}
          initialData={editingManager}
          onCancel={() => {
            setIsFormVisible(false);
            setEditingManager(null);
          }}
        />
      )}

      <ManagersTable
        managers={managers}
        onEdit={handleEditManager}
        onDelete={handleDeleteManager}
      />

      {successMessage && (
        <p className="mt-4 text-green-600 font-semibold">{successMessage}</p>
      )}
    </div>
  );
};

export default ManagersAdmin;
