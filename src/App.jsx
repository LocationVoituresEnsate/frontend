import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StepsSection from './components/StepsSection';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-light">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <StepsSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;