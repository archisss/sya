import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import WeddingInvitation from './components/WeddingInvitation';

// --- CONFIGURACIÓN TEMPORAL ---
// Cambia esto a 'true' cuando pase la boda y quieras que la página informativa sea la principal.
const SHOW_LANDING_AT_ROOT = false;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Raíz: Decide qué mostrar primero */}
        <Route 
          path="/" 
          element={SHOW_LANDING_AT_ROOT ? <LandingPage /> : <WeddingInvitation />} 
        />
        
        {/* Ruta para previsualizar la página informativa mientras la boda está activa */}
        <Route path="/inicio" element={<LandingPage />} />
        
        {/* Ruta dinámica para las invitaciones (ej. /SylvanayJoseCarlos) */}
        <Route path="/:slug" element={<WeddingInvitation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

