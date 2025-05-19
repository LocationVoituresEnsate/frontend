import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ClientsTable = ({ clients, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-2xl font-semibold text-fuchsia mb-6">Liste des clients</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left bg-fuchsia text-white font-medium rounded-tl-lg">ID</th>
              <th className="py-3 px-4 text-left bg-fuchsia text-white font-medium">Nom</th>
              <th className="py-3 px-4 text-left bg-fuchsia text-white font-medium">Prénom</th>
              <th className="py-3 px-4 text-left bg-fuchsia text-white font-medium">Email</th>
              <th className="py-3 px-4 text-left bg-fuchsia text-white font-medium">Téléphone</th>
              <th className="py-3 px-4 text-left bg-fuchsia text-white font-medium">Adresse</th>
              <th className="py-3 px-4 text-left bg-fuchsia text-white font-medium">Numéro de permis</th>
              <th className="py-3 px-4 text-left bg-fuchsia text-white font-medium">Pays du permis</th>
              <th className="py-3 px-4 text-center bg-fuchsia text-white font-medium rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length > 0 ? (
              clients.map((client, index) => (
                <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-lightpink/20 transition-colors duration-150`}>
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4 font-medium">{client.last_name}</td>
                  <td className="py-4 px-4">{client.first_name}</td>
                  <td className="py-4 px-4 text-blue-600">{client.email}</td>
                  <td className="py-4 px-4">{client.phone_number}</td>
                  <td className="py-4 px-4">{client.address}</td>
                  <td className="py-4 px-4">{client.license_number}</td>
                  <td className="py-4 px-4">{client.license_country}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center space-x-3">
                      <button 
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors duration-200"
                        onClick={() => onEdit(client)}
                        title="Modifier"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button 
                        className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors duration-200"
                        onClick={() => onDelete(client)}
                        title="Supprimer"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-8 text-center text-gray-500">
                  Aucun client trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsTable;