import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import Context from '../context';

const HistorialDomicilio = () => {
    const [domicilioList, setDomicilioList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { fetchUserDetails } = useContext(Context);  // Si necesitas detalles del usuario
    const navigate = useNavigate();
  
    // Función para obtener el historial de domimcilio
    const fetchDomicilio = async () => {
      try {
        // Realizamos el llamado a la API
        const response = await fetch(SummaryApi.getAllDomicilioByUser.url, {
          method: SummaryApi.getAllDomicilioByUser.method,
          credentials: 'include', // Si se usa cookie o token de autenticación
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        const data = await response.json();
  
        
        if (data.success) {
            setDomicilioList(data.data);
            console.log(data.data)
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
        fetchDomicilio();
    }, []);
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Historial de pedidos de domicilio</h1>
  
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
            {domicilioList.length === 0 ? (
              <p>No tienes pedidos de domicilio.</p>
            ) : (
              <ul className="space-y-4">
                {domicilioList.map((order) => (
                  <li key={order._id} className="p-6 bg-white bg-opacity-80 border border-gray-300 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">{order.categoriaProducto}</h2>
                      <p className={`text-sm ${order.estado === 'cancelado' ? 'text-red-500' : 'text-green-500'}`}>
                        {order.estado}
                      </p>
                    </div>
  
                    <p className="text-gray-700">Fecha: {new Date(order.createdAt).toLocaleString()}</p>
                    <p className="text-gray-700">Precio: ${order.precio}</p>
  
                    <a href={`/detalle-domicilio/${order._id}`} className="mt-4 inline-block text-blue-500 hover:underline">
                      Ver detalles
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  };

export default HistorialDomicilio;