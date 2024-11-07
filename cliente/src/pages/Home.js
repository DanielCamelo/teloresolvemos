import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const servicios = [
    { nombre: 'Mensajería', icono: '📦', ruta: '/mensajeria' },
    { nombre: 'Domicilios', icono: '🍔', ruta: '/domicilios' },
    { nombre: 'Transporte Particular', icono: '🚗', ruta: '/transporte-particular' },
    { nombre: 'Transporte Salud', icono: '🚑', ruta: '/transporte-salud' },
    { nombre: 'Traslado Aeropuertos', icono: '✈️', ruta: '/traslado-aeropuertos' },
    { nombre: 'Diligencias', icono: '📝', ruta: '/diligencias' },
  ];

  const handleServiceClick = (ruta) => {
    navigate(ruta);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="grid grid-cols-2 gap-4">
        {servicios.map((servicio, index) => (
          <button
            key={index}
            className="bg-accent bg-opacity-80 hover:bg-opacity-100 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary flex flex-col items-center justify-center"
            onClick={() => handleServiceClick(servicio.ruta)}
            aria-label={`Servicio: ${servicio.nombre}`}
          >
            <span className="text-2xl">{servicio.icono}</span>
            <p className="mt-2 text-lg text-center">{servicio.nombre}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
