import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrdenesDeServicio = () => {
  const navigate = useNavigate();

  const estados = [
    {
      nombre: 'Pendiente',
      descripcion: 'Órdenes aún no procesadas.',
      color: 'bg-yellow-200',
      icono: '⏳', // Puedes usar emojis o íconos de librerías como FontAwesome
      ruta: '/ver-ordenes/pendiente',
    },
    {
      nombre: 'En Proceso',
      descripcion: 'Órdenes que están siendo atendidas.',
      color: 'bg-blue-200',
      icono: '🔄',
      ruta: '/ver-ordenes/en-proceso',
    },
    {
      nombre: 'Entregado',
      descripcion: 'Órdenes ya completadas.',
      color: 'bg-green-200',
      icono: '✅',
      ruta: '/ver-ordenes/entregado',
    },
    {
      nombre: 'Cancelado',
      descripcion: 'Órdenes canceladas.',
      color: 'bg-red-200',
      icono: '❌',
      ruta: '/ver-ordenes/cancelado',
    },
  ];

  const handleEstadoClick = (ruta) => {
    navigate(ruta);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Órdenes de Servicios</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {estados.map((estado, index) => (
          <button
            key={index}
            className={`${estado.color} border border-gray-300 shadow-md rounded-lg p-4 text-center hover:scale-105 transition-transform`}
            onClick={() => handleEstadoClick(estado.ruta)}
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">{estado.icono}</span>
              <h2 className="text-lg font-semibold text-gray-800">{estado.nombre}</h2>
              <p className="text-sm text-gray-600">{estado.descripcion}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrdenesDeServicio;

