import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import Context from '../context';

const HistorialTransporteParticular = () => {
  const [mensajeriaList, setMensajeriaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { fetchUserDetails } = useContext(Context);  // Si necesitas detalles del usuario
  const navigate = useNavigate();

  // Función para obtener el historial de mensajería
  const fetchMensajeria = async () => {
    try {
      // Realizamos el llamado a la API
      const response = await fetch(SummaryApi.getAllTransporteParticularByUser.url, {
        method: SummaryApi.getAllTransporteParticularByUser.method,
        credentials: 'include', // Si se usa cookie o token de autenticación
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      
      if (data.success) {
        setMensajeriaList(data.data);
      } else {
        setError(data.message);
        
      }
    } catch (err) {
      toast.error("Error al obtener el historial de órdenes.");
      setError("Error al obtener el historial de órdenes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMensajeria();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Historial de transporte particular</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <div className="text-red-500 bg-white text-center p-4">
        <p >{error}</p>
        <Link to="/login" className="text-white mt-4 inline-block rounded-md bg-blue-500 hover:bg-blue-600 px-4 py-2">
    Iniciar sesión
</Link>

        </div>
      ) : (
        <div>
          {mensajeriaList.length === 0 ? (
            <p>No tienes órdenes de transporte particular.</p>
          ) : (
            <ul className="space-y-4">
              {mensajeriaList.map((order) => (
                <li key={order._id} className="p-6 bg-white bg-opacity-80 border border-gray-300 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{order.tipoDeVehiculo}</h2>
                    <p className={`text-sm ${order.estado === 'cancelado' ? 'text-red-500' : 'text-green-500'}`}>
                      {order.estado}
                    </p>
                  </div>

                  <p className="text-gray-700">Fecha: {new Date(order.fechaHoraRecogida).toLocaleString()}</p>
                  <p className="text-gray-700">
  Precio: {order.precio !== null ? `$${order.precio}` : "Sin asignar"}
</p>


<Link 
    to={`/detalle-TransporteParticular/${order._id}`} 
    className="mt-4 inline-block text-blue-500 hover:underline"
  >
    Ver detalles
  </Link>
                 
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default HistorialTransporteParticular