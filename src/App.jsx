import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/LandingPage/Navbar';
import HeroSection from './components/LandingPage/HeroSection';
import StepsSection from './components/LandingPage/StepsSection';
import Footer from './components/LandingPage/Footer';
import LoginForm from './components/LandingPage/LoginForm';
import ManagerLayout from './components/Dashboard/ManagerLayout';
import DashboardManager from './components/Dashboard/DashboardManager';




// Importez les autres composants du dashboard

// Page d'accueil principale
const Home = () => (
  <>
    <HeroSection />
    <StepsSection />
  </>
);

// Conteneur avec navbar et footer
const MainLayout = () => (
  <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-light">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App = () => {
  return (
    <Routes>
      {/* Layout principal avec navbar et footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<div>Services (À venir)</div>} />
        <Route path="/fonctionnalites" element={<div>Fonctionnalités (À venir)</div>} />
        <Route path="/contact" element={<div>Contact (À venir)</div>} />
        <Route path="/login" element={<LoginForm />} />
      </Route>
      
      {/* Routes du dashboard - sans navbar ni footer */}
      <Route path="/manager" element={<ManagerLayout />}>
        <Route index element={<DashboardManager />} />
        <Route path="clients" element={<div>Gestion des clients</div>} />
        <Route path="utilisateurs" element={<div>Gestion des utilisateurs</div>} />
        <Route path="voitures" element={<div>Gestion des voitures</div>} />
        <Route path="reservations" element={<div>Gestion des réservations</div>} />
        <Route path="rapports" element={<div>Rapports</div>} />
        <Route path="parametres" element={<div>Paramètres</div>} />
      </Route>
      
      {/* Route de test directe */}
      <Route path="/test-dashboard" element={<DashboardManager />} />
    </Routes>
  );
};

export default App;