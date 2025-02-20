import React from 'react';
import { useNavigate } from 'react-router-dom';
import BannerProduct from '../components/BannerProduct'; // Importamos el componente BannerProduct


function Home() {
  const navigate = useNavigate();
  const servicios = [
    { nombre: 'Mensajería', icono: '📦', ruta: '/mensajeria' },
    { nombre: 'Domicilios', icono: '🍔', ruta: '/domicilios' },
    { nombre: 'Transporte Particular', icono: '🚗', ruta: '/transporte-particular' },
    { nombre: 'Transporte Salud', icono: '🚑', ruta: '/transporte-salud' },
    { nombre: 'Compras Intermunicipales', icono: '🏬', ruta: '/compras-intermunicipales' },
    { nombre: 'Diligencias', icono: '📝', ruta: '/diligencias' },
  ];

  const handleServiceClick = (ruta) => {
    navigate(ruta);
  };

  return (

    <div id="services" className="flex flex-col items-center justify-center min-h-screen m-4"> 
      <BannerProduct />

{/* Encabezado Principal */}
<h1 
    className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center my-6 md:my-8 drop-shadow-lg tracking-wide bg-gradient-to-r from-red-600 via-red-500 to-green-400 text-transparent bg-clip-text leading-tight"
    style={{
        WebkitTextStroke: "0.5px black", // Bordes blancos en WebKit (Chrome, Safari)
        textStroke: "0.5px black" // Para otros navegadores con soporte
    }}
>
    Ofrecemos lo siguiente...
</h1>

      
      <div className="grid grid-cols-2 gap-6">
        {servicios.map((servicio, index) => (
          <button
            key={index}
            className="bg-accent bg-opacity-80 hover:bg-opacity-100 text-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all 
                       focus:outline-none focus:ring-4 focus:ring-primary"
            onClick={() => handleServiceClick(servicio.ruta)}
            aria-label={`Servicio: ${servicio.nombre}`}
            style={{ fontSize: '1.5rem' }}
          >
            <span className="text-3xl">{servicio.icono}</span>
            <p className="mt-2 text-center text-base sm:text-lg md:text-xl lg:text-2xl break-words">{servicio.nombre}</p>
          </button>
          
        ))}
      </div>
    </div>
  );
}

export default Home;


