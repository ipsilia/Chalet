// src/App.tsx

import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/hero/Hero';
import LoadingScreen from './components/feedback/LoadingScreen';
// --- 1. IMPORT THE NEW DEVELOPMENT PAGE ---
import DevelopmentPage from './pages/DevelopmentPage';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  // --- 2. ADD STATE TO MANAGE THE CURRENT PAGE ---
  const [currentPage, setCurrentPage] = useState('home');

  // --- 3. ADD A FUNCTION TO RENDER THE CORRECT PAGE ---
  const renderPage = () => {
    switch (currentPage) {
      case 'development':
        return <DevelopmentPage />;
      case 'home':
      default:
        return <Hero isLoaded={isLoaded} />;
    }
  };

  return (
    <main className="bg-[var(--color-background)]">
      {/* Only show loading screen on the home page */}
      {currentPage === 'home' && !isLoaded && (
        <LoadingScreen onFinished={() => setIsLoaded(true)} />
      )}
      
      {/* Fade in content when loaded OR when not on the home page */}
      <div className={`transition-opacity duration-700 ease-in-out ${isLoaded || currentPage !== 'home' ? 'opacity-100' : 'opacity-0'}`}>
        {/* --- 4. PASS PROPS TO NAVBAR --- */}
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {/* Render the active page */}
        {renderPage()}
      </div>
    </main>
  );
}

export default App;