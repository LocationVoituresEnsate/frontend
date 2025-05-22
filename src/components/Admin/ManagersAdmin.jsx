import React, { useState, useEffect } from 'react';
import AddManagerForm from './AddManagerForm';
import ManagersTable from './ManagersTable';
import { FaUserPlus } from 'react-icons/fa';

const ManagersAdmin = () => {
  const [managers, setManagers] = useState([]);
  const [editingManager, setEditingManager] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem('token');  // Récupérez le token depuis localStorage

  fetch('http://127.0.0.1:8000/manager/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Envoyez le token dans l'en-tête
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Erreur lors du chargement des managers');
      }
      return res.json();
    })
    .then((data) => {
      const list = data.managers || data;
      setManagers(list);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, []);


  const handleAddManager = async (managerData) => {
    try {
    const token = localStorage.getItem('token'); // Get token from storage
    console.log(localStorage.getItem('token')); 
    const response = await fetch('http://127.0.0.1:8000/manager/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Add this line
      },
      body: JSON.stringify(managerData),
    });

      const data = await response.json();

      if (response.ok) {
        // Ajouter le nouveau manager à la liste
        setManagers((prevManagers) => [...prevManagers, data.manager]);
        setIsFormVisible(false);
      } else {
        // Afficher une erreur si quelque chose ne va pas
        setError(data.message || 'Erreur lors de la création du manager');
      }
    } catch (err) {
      setError('Erreur réseau');
    }
  };

  const handleEditManager = (manager) => {
    setEditingManager(manager);
    setIsFormVisible(true);
  };

  const handleDeleteManager = (managerToDelete) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce manager ?')) {
      setManagers(managers.filter((m) => m.id !== managerToDelete.id));
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) {
      setEditingManager(null);
    }
  };

  if (loading) return <p>Chargement des managers...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="w-full px-4 py-6">
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
    </div>
  );
};

export default ManagersAdmin;
