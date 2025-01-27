import React from 'react';
import { useNavigate } from 'react-router-dom';

const PerfilAdministrador = () => {
  const navigate = useNavigate();

  const opciones = [
    { nombre: 'Ver Usuarios', descripcion: 'Gestiona y supervisa los usuarios registrados.', ruta: '/ver-usuarios', icono: '👥' },
    { nombre: 'Ver Banners', descripcion: 'Administra los banners de la aplicación.', ruta: '/ver-banners', icono: '🖼️' },
    { nombre: 'Ver Órdenes de Servicios', descripcion: 'Consulta y gestiona las órdenes realizadas.', ruta: '/ver-ordenes', icono: '📋' },
  ];

  const handleOpcionClick = (ruta) => {
    navigate(ruta);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4 " >
      <h1 className="text-2xl font-bold text-white mb-6">Panel de Administración</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {opciones.map((opcion, index) => (
          <button
            key={index}
            className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 text-left transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary"
            onClick={() => handleOpcionClick(opcion.ruta)}
          >
            <div className="flex items-center">
              <span className="text-4xl mr-4" aria-hidden="true">{opcion.icono}</span>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{opcion.nombre}</h2>
                <p className="text-sm text-gray-600">{opcion.descripcion}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PerfilAdministrador;
