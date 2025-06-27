// src/App.tsx

import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/hero/Hero';
import LoadingScreen from './components/feedback/LoadingScreen';

function App() {
  // This state now controls the fade-in of the main content
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="bg-[var(--color-background)]">
      {/* Loading screen is still self-contained, but now it reports when it's done */}
      <LoadingScreen onFinished={() => setIsLoaded(true)} />
      
      {/* This wrapper now controls the visibility of the main content.
        It starts with opacity-0 and fades in when isLoaded becomes true.
      */}
      <div className={`transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <Hero />
      </div>
      
      {/* ... other components ... */}
    </main>
  );
}

export default App;