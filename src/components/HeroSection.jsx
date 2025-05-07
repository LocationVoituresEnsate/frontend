import React from 'react';
import porscheImage from '../assets/porsche-rouge.png';

const HeroSection = () => {
  return (
    <div className="min-h-[70vh] bg-primary text-text relative overflow-hidden w-full">
      {/* Decorative background element */}
      <div className="absolute right-0 bottom-0 w-1/2 h-4/5 bg-white/15 rounded-tl-full z-10"></div>
      
      <div className="max-w-6xl w-full mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between relative z-20">
        <div className="flex-1 max-w-lg pr-0 md:pr-8 mb-10 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-text">Location Simple et Abordable</h1>
          <p className="text-xl mb-8 text-text-700">Gérez vos réservations de voitures facilement et rapidement.</p>
          <button className="bg-light text-primary border-2 border-secondary px-6 py-3 rounded font-bold uppercase tracking-wider transition-all duration-300 transform hover:bg-secondary hover:text-light hover:-translate-y-0.5 hover:shadow-lg">
            Voir les réservations
          </button>
        </div>
        
        <div className="flex-1 flex justify-center items-center max-w-md">
          <img 
            src={porscheImage} 
            alt="Porsche cabriolet rouge" 
            className="max-w-full h-auto rounded-lg shadow-2xl animate-float"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;