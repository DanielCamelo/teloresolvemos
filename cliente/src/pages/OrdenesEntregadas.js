import React, { useState, useEffect } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const OrdenesEntregadas = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [domiciliarios, setDomiciliarios] = useState([]);
  const [repartidorId, setRepartidorId] = useState('');
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [clientes, setClientes] = useState({});
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda

  // Obtener todas las órdenes de mensajería
  const fetchOrdenes = async () => {
    try {
      const response = await fetch(SummaryApi.allOrdenesMensajeria.url, {
        method: SummaryApi.allOrdenesMensajeria.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Error al obtener las órdenes');

      const data = await response.json();
      const ordenesConOrdenacion = data.data || [];
      
      // Filtrar órdenes con estado pendiente
      const ordenesPendientes = ordenesConOrdenacion.filter(orden => orden.estado === 'entregado');
      
      // Ordenar las órdenes por fechaHoraRecogida de más reciente a más antigua
      ordenesPendientes.sort((a, b) => new Date(b.fechaHoraRecogida) - new Date(a.fechaHoraRecogida));
      
      setOrdenes(ordenesPendientes);

      // Obtener IDs de los clientes solo si hay órdenes pendientes
      if (ordenesPendientes.length > 0) {
        const clienteIds = ordenesPendientes.map(orden => orden.nombreCliente);
        fetchClientes(clienteIds);
      }
    } catch (err) {
      toast.error('Error al obtener las órdenes');
      console.error(err.message);
    }
  };

  // Obtener detalles completos de los clientes (nombre y teléfono)
  const fetchClientes = async (clienteIds) => {
    try {
      const response = await fetch(SummaryApi.getClientes.url, {
        method: SummaryApi.getClientes.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ clienteIds }), // Enviar los IDs de los clientes
      });

      if (!response.ok) throw new Error('Error al obtener los clientes');

      const data = await response.json();
      const clientesMap = data.data.reduce((acc, cliente) => {
        acc[cliente._id] = { name: cliente.name, phone: cliente.phone }; // Almacena nombre y teléfono
        return acc;
      }, {});

      setClientes(clientesMap);
    } catch (err) {
      toast.error('Error al obtener los clientes');
      console.error(err.message);
    }
  };

  // Obtener usuarios con el rol de domiciliario
  const fetchDomiciliarios = async () => {
    try {
      const response = await fetch(SummaryApi.getDomiciliarios.url, {
        method: SummaryApi.getDomiciliarios.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Error al obtener los domiciliarios');

      const data = await response.json();
      const domiciliariosFiltrados = data.data.filter(user => user.role.includes('domiciliario'));
      setDomiciliarios(domiciliariosFiltrados);
    } catch (err) {
      toast.error('Error al obtener los domiciliarios');
      console.error(err.message);
    }
  };

  // Asignar domiciliario
  const handleAsignarDomiciliario = async (orderId) => {
    try {
      const response = await fetch(SummaryApi.assignDomiciliario.url, {
        method: SummaryApi.assignDomiciliario.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ orderId, repartidorId }),
      });

      if (!response.ok) throw new Error('Error al asignar domiciliario');

      toast.success(`Domiciliario asignado con éxito para la orden ${orderId}`);
      await fetchOrdenes(); // Actualizar la lista de órdenes
    } catch (err) {
      toast.error('Error al asignar domiciliario');
      console.error(err.message);
    }
  };

  // Cambiar estado de la orden
  const handleCambiarEstado = async (orderId) => {
    try {
      const response = await fetch(SummaryApi.cambiarEstadoMensajeria.url, {
        method: SummaryApi.cambiarEstadoMensajeria.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ orderId, nuevoEstado }),
      });

      if (!response.ok) throw new Error('Error al cambiar el estado');

      
      toast.success(`Estado de la orden ${orderId} actualizado con éxito`);
      await fetchOrdenes(); // Actualizar la lista de órdenes
    } catch (err) {
      
      toast.error('Error al cambiar el estado');
      console.error(err.message);
    }
  };

  // Filtrar las órdenes según el término de búsqueda
  const filteredOrders = ordenes.filter((orden) => {
    const cliente = clientes[orden.nombreCliente];
    return (
      cliente &&
      (cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.phone.toString().includes(searchTerm))
    );
  });

  // Cargar las órdenes y domiciliarios al montar el componente
  useEffect(() => {
    fetchOrdenes();
    fetchDomiciliarios();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Gestión de Órdenes de Mensajería</h1>

      {/* Campo de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por cliente o teléfono"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Listado de órdenes */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Órdenes Pendientes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((orden) => (
              <div key={orden._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">Cliente: {clientes[orden.nombreCliente]?.name}</h3>
                  <p className="text-gray-600">Teléfono: {clientes[orden.nombreCliente]?.phone}</p>
                  <p className="text-gray-600">Estado: <span className={`font-semibold text-green-600`}>{orden.estado}</span></p>
                  <p className="text-gray-600">Tipo de Paquete: {orden.tipoDePaquete}</p>
                  <p className="text-gray-600">Recogida: {orden.direccionRecogida}</p>
                  <p className="text-gray-600">Entrega: {orden.direccionEntrega}</p>
                  <p className="text-gray-600">Precio: ${orden.precio}</p>
                  <p className="text-gray-600">Repartidor: {clientes[orden.nombreRepartidor]?.name}</p>
                </div>

                <div className="p-4 border-t">
                  {/* Cambiar estado */}
                  <select
                    value={nuevoEstado}
                    onChange={(e) => setNuevoEstado(e.target.value)}
                    className="mb-2 w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Cambiar Estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en proceso">En Proceso</option>
                    <option value="entregado">Entregado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>

                  <button
                    onClick={() => handleCambiarEstado(orden._id)}
                    className="block w-full bg-blue-500 text-white p-2 rounded-md mt-2"
                  >
                    Actualizar Estado
                  </button>

                  {/* Asignar domiciliario */}
                  <select
                    value={repartidorId}
                    onChange={(e) => setRepartidorId(e.target.value)}
                    className="mb-2 w-full p-2 border border-gray-300 rounded-md mt-2"
                  >
                    <option value="">Seleccionar Domiciliario</option>
                    {domiciliarios.map((domiciliario) => (
                      <option key={domiciliario._id} value={domiciliario._id}>
                        {domiciliario.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleAsignarDomiciliario(orden._id)}
                    className="block w-full bg-green-500 text-white p-2 rounded-md mt-2"
                  >
                    Asignar Domiciliario
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No hay órdenes pendientes.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrdenesEntregadas;