import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-text w-full">
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 lg:w-1/4 mb-8 pr-0 md:pr-16">
            <span className="text-2xl font-bold block mb-3">LocationVoitures</span>
            <p className="text-text/90 leading-relaxed">
              Votre solution simple et efficace pour la gestion de réservation de voitures.
            </p>
          </div>

          <div className="flex-1 flex flex-wrap justify-between">
            <div className="w-1/2 md:w-auto mb-8 mr-0 md:mr-10">
              <h4 className="text-lg font-semibold mb-4 relative text-text after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-8 after:h-0.5 after:bg-accent">
                Services
              </h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-2 hover:text-accent transition-colors duration-200 cursor-pointer">Réservations</li>
                <li className="mb-2 hover:text-accent transition-colors duration-200 cursor-pointer">Gestion des véhicules</li>
                <li className="mb-2 hover:text-accent transition-colors duration-200 cursor-pointer">Rapports</li>
              </ul>
            </div>

            <div className="w-1/2 md:w-auto mb-8 mr-0 md:mr-10">
              <h4 className="text-lg font-semibold mb-4 relative text-text after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-8 after:h-0.5 after:bg-accent">
                À propos
              </h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-2 hover:text-accent transition-colors duration-200 cursor-pointer">Notre entreprise</li>
                <li className="mb-2 hover:text-accent transition-colors duration-200 cursor-pointer">L'équipe</li>
                <li className="mb-2 hover:text-accent transition-colors duration-200 cursor-pointer">Témoignages</li>
              </ul>
            </div>

            <div className="w-1/2 md:w-auto mb-8">
              <h4 className="text-lg font-semibold mb-4 relative text-text after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-8 after:h-0.5 after:bg-accent">
                Contact
              </h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-2 hover:text-accent transition-colors duration-200 cursor-pointer">Assistance</li>
                <li className="mb-2 hover:text-accent transition-colors duration-200 cursor-pointer">Partenariats</li>
                <li className="mb-2 hover:text-accent transition-colors duration-200 cursor-pointer">Carrières</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 text-center text-sm bg-black/15 -mx-4 px-4 pb-4">
          <p>&copy; 2025 LocationVoitures. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
