import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Context from '../context';

const PerfilDomiciliario = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchUserDetails } = useContext(Context);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        // Realiza la solicitud para obtener las órdenes del repartidor
        const response = await fetch(SummaryApi.getAllMensajeriaByUser.url, {
          method: SummaryApi.getAllMensajeriaByUser.method,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.success) {
          // Filtrar solo las órdenes con estado "en proceso"
          const ordenesEnProceso = data.data.filter((orden) => orden.estado === 'en proceso');
          setOrdenes(ordenesEnProceso);
        } else {
          setError(data.message || 'No se pudieron cargar las órdenes.');
        }
      } catch (err) {
        toast.error('Error al obtener las órdenes.');
        setError('Error al obtener las órdenes.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenes();
  }, []);

  if (loading) {
    return <div>Cargando órdenes...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 bg-white text-center p-4">
        <p>{error}</p>
        <a
          href="/login"
          className="text-white mt-4 inline-block rounded-md bg-blue-500 hover:bg-blue-600 px-4 py-2"
        >
          Iniciar sesión
        </a>
      </div>
    );
  }


  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Órdenes asignadas</h1>
      <h2 className="text-lg font-semibold">Órdenes de mensajeria</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ordenes.length === 0 ? (
          <p>No tienes órdenes asignadas.</p>
        ) : (
          ordenes.map((orden) => (
            <div
              key={orden._id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold">Cliente: {orden.nombreCliente?.name || 'No disponible'}</h2>
              <h2 className="text-lg font-semibold">Numero: {orden.nombreCliente?.phone || 'No disponible'}</h2>
              <p className="text-sm">Dirección de recogida: {orden.direccionRecogida}</p>
              <p className="text-sm">Dirección de entrega: {orden.direccionEntrega}</p>
              <p className="text-sm">Precio: ${orden.precio}</p>
              <a
                href={`/detalle-mensajeria/${orden._id}`}
                className="mt-4 inline-block text-blue-500 hover:underline"
              >
                Ver detalles
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PerfilDomiciliario;
