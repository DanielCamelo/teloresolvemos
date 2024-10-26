import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLocalShipping, MdRestaurantMenu} from 'react-icons/md';
import { FaTaxi, FaAmbulance, FaPlaneDeparture, FaRegListAlt } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();
  const servicios = [
    { nombre: 'Mensajería', icono: <MdLocalShipping />, ruta: '/mensajeria' },
    { nombre: 'Domicilios', icono: <MdRestaurantMenu />, ruta: '/domicilios' },
    { nombre: 'Transporte Particular', icono: <FaTaxi />, ruta: '/transporte-particular' },
    { nombre: 'Transporte Salud', icono: <FaAmbulance />, ruta: '/transporte-salud' },
    { nombre: 'Traslado Aeropuertos', icono: <FaPlaneDeparture />, ruta: '/traslado-aeropuertos' },
    { nombre: 'Diligencias', icono: <FaRegListAlt />, ruta: '/diligencias' },
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
        className="bg-white text-black p-4 rounded-lg shadow-md hover:bg-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 flex flex-col items-center justify-center"
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
