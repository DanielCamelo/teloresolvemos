import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const servicios = [
    { nombre: 'Mensajería', icono: '📦' },
    { nombre: 'Domicilios', icono: '🛵' },
    { nombre: 'Transporte Particular', icono: '🚗' },
    { nombre: 'Transporte Salud', icono: '🚑' },
    { nombre: 'Traslado Aeropuertos', icono: '✈️' },
    { nombre: 'Diligencias', icono: '📋' },
  ];

  return (
    <div className="min-h-screen bg-mobile bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center">

      <div className="grid grid-cols-2 gap-4">
        {servicios.map((servicio, index) => (
          <button
            key={index}
            className="bg-white text-black p-4 rounded-lg shadow-md hover:bg-gray-200 transition-all"
          >
            <span className="text-2xl">{servicio.icono}</span>
            <p className="mt-2 text-lg">{servicio.nombre}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
