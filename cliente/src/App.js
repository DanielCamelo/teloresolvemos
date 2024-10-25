  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Home from './pages/Home';
  import Mensajeria from './pages/Mensajeria'; // Importa los componentes para cada servicio
  import Domicilios from './pages/Domicilios';
  import TransporteParticular from './pages/TransporteParticular';
  import TransporteSalud from './pages/TransporteSalud.js';
  import TrasladoAeropuertos from './pages/TrasladoAeropuertos';
  import Diligencias from './pages/Diligencias';


  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mensajeria" element={<Mensajeria />} />
          <Route path="/domicilios" element={<Domicilios />} />
          <Route path="/transporte-particular" element={<TransporteParticular />} />
          <Route path="/transporte-salud" element={<TransporteSalud />} />
          <Route path="/traslado-aeropuertos" element={<TrasladoAeropuertos />} />
          <Route path="/diligencias" element={<Diligencias />} />
        </Routes>
      </Router>
    );
  }

  export default App;
