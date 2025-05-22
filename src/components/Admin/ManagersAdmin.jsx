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
    fetch('http://127.0.0.1:8000/manager/')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur lors du chargement des managers');
        }
        return res.json();
      })
      .then((data) => {
        // Ajuste en fonction de ta structure JSON
        // Si ta réponse est { managers: [...] }
        const list = data.managers || data;
        setManagers(list);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddManager = (managerData) => {
    if (editingManager) {
      setManagers(managers.map(m => m.id === editingManager.id ? managerData : m));
      setEditingManager(null);
    } else {
      setManagers([...managers, managerData]);
    }
    setIsFormVisible(false);
  };

  const handleEditManager = (manager) => {
    setEditingManager(manager);
    setIsFormVisible(true);
  };

  const handleDeleteManager = (managerToDelete) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce manager ?')) {
      setManagers(managers.filter(m => m.id !== managerToDelete.id));
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
