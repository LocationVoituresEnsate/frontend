import React from 'react';
import porscheImage from '../../assets/porsche-rouge.png';

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-1/2 h-4/5 bg-white/15 rounded-tl-full z-10"></div>

      <div className="max-w-6xl w-full mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between relative z-20">
        <div className="flex-1 max-w-lg pr-0 md:pr-8 mb-10 md:mb-0 mt-[-40px]">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-text">
            Location simple et 
            <div className="relative inline-block">
              <span className="text-fuchsia">Abordable</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 250 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 8C75 4 175 -2 250 4" stroke="#D4006D" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </div>
          </h1>
          <p className="text-xl mb-8 text-text">
            Avec plus de 20 ans d'expérience, LocationVoitures est l'un des principaux loueurs de voitures au Maroc.
          </p>
          <button className="bg-lightpink text-fuchsia px-6 py-3 rounded font-bold uppercase tracking-wider transition-all duration-300 hover:bg-fuchsia hover:text-white">
            Connexion
          </button>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <img 
            src={porscheImage} 
            alt="Porsche cabriolet rouge" 
            className="w-[650px] h-auto rounded-lg shadow-2xl mt-[-50px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;