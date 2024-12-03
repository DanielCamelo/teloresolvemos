import React, { useEffect, useState } from 'react';
import UploadBanner from '../components/UploadBanner';
import SummaryApi from '../common';
import AdminBannerCard from '../components/AdminBannerCard';

const VerBanners = () => {
  const [openUploadBanner, setOpenUploadBanner] = useState(false);
  const [allBanners, setAllBanners] = useState([]);

  const fetchAllBanners = async () => {
    try {
      const response = await fetch(SummaryApi.allBanner.url, {
        method: SummaryApi.allBanner.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Incluye el token si es necesario
        },
      });

      if (!response.ok) throw new Error('Error al cargar los banners');

      const dataResponse = await response.json();
      setAllBanners(dataResponse.data || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllBanners();
  }, []);

  const handleDeleteBanner = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteBanner.url, {
        method: SummaryApi.deleteBanner.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Incluye el token si es necesario
        },
        body: JSON.stringify({ id }), // Envía el ID del banner en el cuerpo
      });

      if (!response.ok) throw new Error('Error al eliminar el banner');

      await fetchAllBanners(); // Volver a obtener los datos
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/** Header */}
      <div className="bg-white py-4 px-6 flex justify-between items-center shadow-md">
        <h2 className="font-bold text-2xl text-red-900">Gestión de Banners</h2>
        <button
          className="border-2 border-red-900 text-red-900 hover:bg-red-900 hover:text-white transition-all py-2 px-4 rounded-lg"
          onClick={() => setOpenUploadBanner(true)}
        >
          Subir Banner
        </button>
      </div>

      {/** Listado de banners */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBanners.length > 0 ? (
          allBanners.map((banner) => (
            <AdminBannerCard
              key={banner._id}
              data={banner}
              onDelete={handleDeleteBanner}
              className="col-span-1 md:col-span-2"
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No hay banners disponibles.
          </p>
        )}
      </div>

      {/** Componente de subir banner */}
      {openUploadBanner && (
        <UploadBanner onClose={() => setOpenUploadBanner(false)} fetchData={fetchAllBanners} />
      )}
    </div>
  );
};

export default VerBanners;



