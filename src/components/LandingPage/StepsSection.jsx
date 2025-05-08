import React from 'react';

const StepsSection = () => {
  return (
    <div className="py-16 px-4 bg-light w-full">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold mb-4 text-text">Fonctionnalités de gestion</h2>
        <p className="text-lg text-gray-600">Tout ce dont vous avez besoin pour gérer efficacement votre flotte et vos réservations</p>
      </div>
      
      <div className="flex flex-wrap justify-center max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="bg-accent rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center h-full">
            <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center bg-light text-secondary rounded-full border-2 border-primary">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-secondary">Créer une réservation</h3>
            <p className="text-text-700">Ajoutez une nouvelle réservation en quelques clics.</p>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="bg-accent rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center h-full">
            <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center bg-light text-secondary rounded-full border-2 border-primary">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 17h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V7h-2v2zm-4 8h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V7h-2v2zm-4 8h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V7h-2v2zm-4 12h2v-2H6v2zm0-4h2v-2H6v2zm0-4h2v-2H6v2zm0-4h2V7H6v2z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-secondary">Gérer les voitures</h3>
            <p className="text-text-700">Consultez, ajoutez ou modifiez les voitures disponibles.</p>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="bg-accent rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center h-full">
            <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center bg-light text-secondary rounded-full border-2 border-primary">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-secondary">Suivre les réservations</h3>
            <p className="text-text-700">Obtenez un suivi détaillé de toutes les réservations en cours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsSection;