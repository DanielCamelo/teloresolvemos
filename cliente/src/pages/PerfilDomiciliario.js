import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Context from '../context';
import { Link } from 'react-router-dom';

const PerfilDomiciliario = () => {
  const [ordenesMensajeria, setOrdenesMensajeria] = useState([]);
    const [ordenesDomicilio, setOrdenesDomicilio] = useState([]);
    const [ordenesComprasIntermunicipales, setOrdenesComprasIntermunicipales] = useState([]);
    const [ordenesDiligencias, setOrdenesDiligencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchUserDetails } = useContext(Context);

  const fetchOrdenesMensajeria = async () => {
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
        setOrdenesMensajeria(ordenesEnProceso);
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

  const fetchOrdenesDomicilio = async () => {
    try {
      // Realiza la solicitud para obtener las órdenes del repartidor
      const response = await fetch(SummaryApi.getAllDomicilioByUser.url, {
        method: SummaryApi.getAllDomicilioByUser.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        // Filtrar solo las órdenes con estado "en proceso"
        const ordenesEnProceso = data.data.filter((orden) => orden.estado === 'en proceso');
        setOrdenesDomicilio(ordenesEnProceso);
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

  const fetchOrdenesComprasIntermunicipales = async () => {
    try {
      // Realiza la solicitud para obtener las órdenes del repartidor
      const response = await fetch(SummaryApi.getAllComprasIntermunicipalesByUser.url, {
        method: SummaryApi.getAllComprasIntermunicipalesByUser.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        // Filtrar solo las órdenes con estado "en proceso"
        const ordenesEnProceso = data.data.filter((orden) => orden.estado === 'en proceso');
        setOrdenesComprasIntermunicipales(ordenesEnProceso);
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

  const fetchOrdenesDiligencias = async () => {
    try {
      // Realiza la solicitud para obtener las órdenes del repartidor
      const response = await fetch(SummaryApi.getAllDiligenciasByUser.url, {
        method: SummaryApi.getAllDiligenciasByUser.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        // Filtrar solo las órdenes con estado "en proceso"
        const ordenesEnProceso = data.data.filter((orden) => orden.estado === 'en proceso');
        setOrdenesDiligencias(ordenesEnProceso);
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



  useEffect(() => {
    
    fetchOrdenesMensajeria();
    fetchOrdenesDomicilio();
    fetchOrdenesComprasIntermunicipales();
    fetchOrdenesDiligencias();
  }, []);

  if (loading) {
    return <div>Cargando órdenes...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 bg-white text-center p-4">
        <p>{error}</p>
        <Link
  to="/login"
  className="text-white mt-4 inline-block rounded-md bg-blue-500 hover:bg-blue-600 px-4 py-2"
>
  Iniciar sesión
</Link>
      </div>
    );
  }


  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Órdenes asignadas</h1>
      <h2 className="text-lg font-semibold">Órdenes de mensajeria</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ordenesMensajeria.length === 0 ? (
          <p>No tienes órdenes asignadas.</p>
        ) : (
          ordenesMensajeria.map((orden) => (
            <div
              key={orden._id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold">Cliente: {orden.nombreCliente?.name || 'No disponible'}</h2>
              <h2 className="text-lg font-semibold">Numero: {orden.nombreCliente?.phone || 'No disponible'}</h2>
              <p className="text-sm">Dirección de recogida: {orden.direccionRecogida}</p>
              <p className="text-sm">Dirección de entrega: {orden.direccionEntrega}</p>
              <p className="text-sm">Precio: ${orden.precio}</p>
              <Link
  to={`/detalle-mensajeria/${orden._id}`}
  className="mt-4 inline-block text-blue-500 hover:underline"
>
  Ver detalles
</Link>
            </div>
          ))
        )}
      </div>

      <h2 className="text-lg font-semibold">Órdenes de domicilio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ordenesDomicilio.length === 0 ? (
          <p>No tienes órdenes asignadas.</p>
        ) : (
          ordenesDomicilio.map((orden) => (
            <div
              key={orden._id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold">Cliente: {orden.nombreCliente?.name || 'No disponible'}</h2>
              <h2 className="text-lg font-semibold">Numero: {orden.nombreCliente?.phone || 'No disponible'}</h2>
              <p className="text-sm">Dirección de recogida: {orden.direccionRecogida}</p>
              <p className="text-sm">Dirección de entrega: {orden.direccionEntrega}</p>
              <p className="text-sm">Precio: ${orden.precio}</p>
              <Link
  to={`/detalle-domicilio/${orden._id}`}
  className="mt-4 inline-block text-blue-500 hover:underline"
>
  Ver detalles
</Link>
            
            </div>
          ))
        )}
      </div>

      <h2 className="text-lg font-semibold">Órdenes de compras intermunicipales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ordenesComprasIntermunicipales.length === 0 ? (
          <p>No tienes órdenes asignadas.</p>
        ) : (
          ordenesComprasIntermunicipales.map((orden) => (
            <div
              key={orden._id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold">Cliente: {orden.nombreCliente?.name || 'No disponible'}</h2>
              <h2 className="text-lg font-semibold">Numero: {orden.nombreCliente?.phone || 'No disponible'}</h2>
              <p className="text-sm">Ubicacion de compra: {orden.ubicacionCompra}</p>
              <p className="text-sm">Dirección de entrega: {orden.direccionEntrega}</p>
              <p className="text-sm">Presupuesto Maximo: ${orden.presupuestoMaximo}</p>

              <Link
  to={`/detalle-ComprasIntermunicipales/${orden._id}`}
  className="mt-4 inline-block text-blue-500 hover:underline"
>
  Ver detalles
</Link>
              
            </div>
          ))
        )}
      </div>

      <h2 className="text-lg font-semibold">Órdenes de diligencias</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ordenesDiligencias.length === 0 ? (
          <p>No tienes órdenes asignadas.</p>
        ) : (
          ordenesDiligencias.map((orden) => (
            <div
              key={orden._id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold">Cliente: {orden.nombreCliente?.name || 'No disponible'}</h2>
              <h2 className="text-lg font-semibold">Numero: {orden.nombreCliente?.phone || 'No disponible'}</h2>
              <p className="text-sm">Direcciónes involucradas: {orden.direccionInvolucrados}</p>
              <p className="text-sm">
  Fecha y Hora de Recogida: {new Date(orden.fechaHoraRecogida).toLocaleString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Para formato de 12 horas
  })}
</p>

              <p className="text-sm">Precio: ${orden.precio}</p>
              <Link
  to={`/detalle-diligencias/${orden._id}`}
  className="mt-4 inline-block text-blue-500 hover:underline"
>
  Ver detalles
</Link>
              
            </div>
          ))
        )}
      </div>
    </div>

  );
};

export default PerfilDomiciliario;
