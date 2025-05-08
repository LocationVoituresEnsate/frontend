import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    console.log(`Navigating to: ${path}`); // Pour déboguer
  };

  return (
    <nav className="w-full bg-white shadow-sm py-2">
      <div className="flex justify-between items-center px-6 lg:px-20">
        {/* Logo */}
        <img
          src={logo}
          alt="logo"
          className="w-[4.5rem] cursor-pointer"
          onClick={() => handleNavigate('/')}
        />
        
        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 text-text font-medium text-sm">
          <button
            className="relative group py-1"
            onClick={() => handleNavigate('/')}
          >
            <span className="hover:text-fuchsia transition-colors duration-300">
              Accueil
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-fuchsia transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            className="relative group py-1"
            onClick={() => handleNavigate('/services')}
          >
            <span className="hover:text-fuchsia transition-colors duration-300">
              Services
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-fuchsia transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            className="relative group py-1"
            onClick={() => handleNavigate('/fonctionnalites')}
          >
            <span className="hover:text-fuchsia transition-colors duration-300">
              Fonctionnalités
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-fuchsia transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            className="relative group py-1"
            onClick={() => handleNavigate('/contact')}
          >
            <span className="hover:text-fuchsia transition-colors duration-300">
              Contact
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-fuchsia transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>

        {/* Login Button */}
        <button
          className="bg-primary hover:bg-lightpink text-fuchsia font-medium py-1.5 px-5 rounded-md text-sm transition-colors duration-300"
          onClick={() => handleNavigate('/login')}
        >
          Connexion
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-text">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;