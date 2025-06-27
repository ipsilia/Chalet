import Navbar from './components/layout/Navbar';
import Hero from './components/hero/Hero';

function App() {
  return (
    // The main container for the application.
    // The bg-gray-900 provides a base background color, though the Hero component will cover it.
    <main className="bg-gray-900">
      {/* The Navbar component will be fixed at the top, overlaying other content. */}
      <Navbar />
      
      {/* The Hero component provides the main visual and introductory content. */}
      <Hero />

      {/* You can add more sections/components below the hero section here. */}
      {/* For example:
      <div className="h-screen bg-white text-black p-12">
        <h2 className="text-3xl font-bold text-center">Features Section</h2>
      </div> 
      */}
    </main>
  );
}

export default App;
