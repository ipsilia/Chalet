// src/App.tsx

import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/hero/Hero';
import LoadingScreen from './components/feedback/LoadingScreen';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="bg-[var(--color-background)]">
      <LoadingScreen onFinished={() => setIsLoaded(true)} />
      
      <div className={`transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        {/* Pass the isLoaded state as a prop here */}
        <Hero isLoaded={isLoaded} />
      </div>
      
    </main>
  );
}

export default App;