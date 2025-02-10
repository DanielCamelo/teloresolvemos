import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import SummaryApi from '../common'; // Asegúrate de que el path sea correcto.

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      const response = await fetch(SummaryApi.allBanner.url, {
        method: SummaryApi.allBanner.method,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar los banners');
      }

      const dataResponse = await response.json();
      setBanners(dataResponse.data || []);
    } catch (error) {
      console.error('Error al cargar banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (banners.length === 0) return;
    setCurrentImage((prev) => (prev + 1) % banners.length);
  };

  const prevImage = () => {
    if (banners.length === 0) return;
    setCurrentImage((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(nextImage, 5000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-56 md:h-72 bg-gray-200 text-gray-500">
        Cargando banners...
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="flex items-center justify-center h-56 md:h-72 bg-gray-200 text-gray-500">
        No hay banners disponibles.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 rounded flex justify-center items-center">
      <div className="h-60 md:h-96 w-full md:w-4/6 relative overflow-hidden rounded-lg shadow-lg">
        {/* Botones de navegación */}
        <div className="absolute inset-0 items-center justify-between z-10 hidden md:flex">
          <button
            onClick={prevImage}
            className="bg-white shadow-md rounded-full p-2 m-2 hover:scale-110 transition-transform"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={nextImage}
            className="bg-white shadow-md rounded-full p-2 m-2 hover:scale-110 transition-transform"
          >
            <FaAngleRight />
          </button>
        </div>

        {/* Carrusel */}
        <div className="flex h-full transition-transform duration-500" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
          {banners.map((banner, index) => (
            <div key={banner._id} className="w-full h-full flex-shrink-0 relative">
              <img
                src={banner.url}
                alt={banner.title || `Banner ${index + 1}`}
                className="w-full h-full object-cover opacity-90" // Opacidad ajustada
              />
              {/* Contenido del banner */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4 py-4">
                <h2 className="text-2xl md:text-4xl font-bold">{banner.title}</h2>
                <p className="mt-2 text-sm md:text-lg">{banner.description}</p>
                {banner.link && (
                  <a
                    href={banner.link}
                    className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
                  >
                    Más información
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores de progreso */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 w-2 rounded-full ${currentImage === index ? 'bg-primary' : 'bg-gray-300'} transition-all`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;


