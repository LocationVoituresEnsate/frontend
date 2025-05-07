import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 md:px-12 py-4 bg-primary text-text w-full shadow-md">
      <div className="flex items-center text-xl font-bold">
        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="currentColor"/>
        </svg>
        <span>LocationVoitures</span>
      </div>
      
      <ul className="hidden md:flex space-x-8">
        <li className="cursor-pointer font-medium text-text-700 hover:text-secondary relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-secondary after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Accueil</li>
        <li className="cursor-pointer font-medium text-text-700 hover:text-secondary relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-secondary after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Voitures</li>
        <li className="cursor-pointer font-medium text-text-700 hover:text-secondary relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-secondary after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Réservations</li>
        <li className="cursor-pointer font-medium text-text-700 hover:text-secondary relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-secondary after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Contact</li>
      </ul>
      
      <div className="flex items-center">
        <button className="bg-light text-secondary border-2 border-secondary px-4 py-2 rounded font-bold hover:bg-secondary hover:text-light transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md">
          Gestionnaire
        </button>
      </div>
    </nav>
  );
};

export default Navbar;