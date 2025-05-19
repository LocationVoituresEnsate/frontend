import React, { useState } from 'react';

const AddClientForm = ({ onAddClient, initialData = null }) => {
  const [formData, setFormData] = useState(
    initialData || {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      address: '',
      license_number: '',
      license_country: ''
    }
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name.trim()) newErrors.first_name = 'Le prénom est requis';
    if (!formData.last_name.trim()) newErrors.last_name = 'Le nom est requis';
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Le numéro de téléphone est requis';
    }
    
    if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise';
    if (!formData.license_number.trim()) newErrors.license_number = 'Le numéro de permis est requis';
    if (!formData.license_country.trim()) newErrors.license_country = 'Le pays du permis est requis';
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onAddClient(formData);
    
    if (!initialData) {
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        license_number: '',
        license_country: ''
      });
    }
    
    setErrors({});
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow mb-8">
      <h2 className="text-xl font-semibold text-fuchsia mb-6 pb-2 border-b border-lightpink">
        {initialData ? 'Modifier un client' : 'Ajouter un client'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="first_name" className="block text-text font-medium mb-1">
              Prénom
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fuchsia/30 focus:border-fuchsia outline-none transition-all ${
                errors.first_name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="last_name" className="block text-text font-medium mb-1">
              Nom
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fuchsia/30 focus:border-fuchsia outline-none transition-all ${
                errors.last_name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="email" className="block text-text font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fuchsia/30 focus:border-fuchsia outline-none transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone_number" className="block text-text font-medium mb-1">
              Téléphone
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fuchsia/30 focus:border-fuchsia outline-none transition-all ${
                errors.phone_number ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="address" className="block text-text font-medium mb-1">
            Adresse
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fuchsia/30 focus:border-fuchsia outline-none transition-all ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="license_number" className="block text-text font-medium mb-1">
              Numéro de permis
            </label>
            <input
              type="text"
              id="license_number"
              name="license_number"
              value={formData.license_number}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fuchsia/30 focus:border-fuchsia outline-none transition-all ${
                errors.license_number ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.license_number && (
              <p className="text-red-500 text-xs mt-1">{errors.license_number}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="license_country" className="block text-text font-medium mb-1">
              Pays du permis
            </label>
            <input
              type="text"
              id="license_country"
              name="license_country"
              value={formData.license_country}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fuchsia/30 focus:border-fuchsia outline-none transition-all ${
                errors.license_country ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.license_country && (
              <p className="text-red-500 text-xs mt-1">{errors.license_country}</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-fuchsia hover:bg-fuchsia/90 text-white font-medium py-2.5 px-6 rounded-md transition-all duration-200 shadow-sm"
          >
            {initialData ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClientForm;