import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLocalShipping, MdRestaurantMenu, MdNotifications, MdPerson } from 'react-icons/md';
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
    <div className="min-h-screen bg-mobile bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center">
      <div className="w-full absolute top-0 left-0 right-0 flex justify-between p-4">
        <button
          onClick={() => navigate('/notificaciones')}
          className="text-3xl p-2 absolute left-0 ml-4"
        >
          <MdNotifications />
        </button>
        <button
          onClick={() => navigate('/ingresar')}
          className="text-3xl p-2 absolute right-0 mr-4"
        >
          <MdPerson />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-16"> {/* Ajuste en el margen superior para no solapar el contenido con los botones */}
        {servicios.map((servicio, index) => (
          <button
            key={index}
            className="bg-white text-black p-4 rounded-lg shadow-md hover:bg-gray-200 transition-all"
            onClick={() => handleServiceClick(servicio.ruta)}
          >
            <span className="text-2xl">{servicio.icono}</span>
            <p className="mt-2 text-lg">{servicio.nombre}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
