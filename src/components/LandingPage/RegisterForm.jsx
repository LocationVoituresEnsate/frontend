import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérification que les mots de passe correspondent
    if (userData.password !== userData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    // Logique d'inscription ici
    console.log('Tentative d\'inscription avec:', userData);
    // Après inscription réussie, rediriger vers la page de connexion
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-xl relative overflow-hidden">
        {/* Élément décoratif */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-lightpink/30 rounded-full"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2 text-text">Inscription</h2>
          <div className="relative inline-block mb-6">
            <span className="text-fuchsia text-lg">Créez votre compte</span>
            <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 150 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 3C35 1 115 1 150 3" stroke="#D4006D" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nom d'utilisateur */}
              <div className="md:col-span-2">
                <label htmlFor="username" className="block text-sm font-medium text-text mb-1">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-lightpink focus:border-transparent"
                  placeholder="Nom d'utilisateur"
                  required
                />
              </div>
              
              {/* Prénom */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-text mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-lightpink focus:border-transparent"
                  placeholder="Prénom"
                  required
                />
              </div>
              
              {/* Nom */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-text mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-lightpink focus:border-transparent"
                  placeholder="Nom"
                  required
                />
              </div>
              
              {/* Adresse */}
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-text mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-lightpink focus:border-transparent"
                  placeholder="Adresse complète"
                  required
                />
              </div>
              
              {/* Numéro de téléphone */}
              <div className="md:col-span-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-text mb-1">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-lightpink focus:border-transparent"
                  placeholder="+212 6XX XXXXXX"
                  required
                />
              </div>
              
              {/* Email */}
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-lightpink focus:border-transparent"
                  placeholder="votre@email.com"
                  required
                />
              </div>
              
              {/* Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-lightpink focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              {/* Confirmation du mot de passe */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-text mb-1">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-lightpink focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center mt-4">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-fuchsia focus:ring-lightpink border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-text">
                J'accepte les <a href="#" className="text-fuchsia hover:text-fuchsia/80">termes et conditions</a>
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-lightpink text-fuchsia font-bold py-2.5 px-4 rounded-md transition-colors duration-300"
              >
                S'INSCRIRE
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <span className="text-text">Vous avez déjà un compte? </span>
            <a 
              href="/login" 
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
              className="font-medium text-fuchsia hover:text-fuchsia/80"
            >
              Connectez-vous
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;