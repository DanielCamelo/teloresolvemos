import React, { useState, useEffect } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const OrdenesEntregadas = () => {
  const [ordenesMensajeria, setOrdenesMensajeria] = useState([]);
  const [ordenesDomicilio, setOrdenesDomicilio] = useState([]);
  const [ordenesTransporteParticular, setOrdenesTransporteParticular] = useState([]);
  const [ordenesTransporteSalud, setOrdenesTransporteSalud] = useState([]);
  const [ordenesComprasIntermunicipales, setOrdenesComprasIntermunicipales] = useState([]);
  const [ordenesDiligencias, setOrdenesDiligencias] = useState([]);
  const [domiciliarios, setDomiciliarios] = useState([]);
  const [repartidorId, setRepartidorId] = useState('');
  const [conductores, setConductor] = useState([]);
  const [choferId, setChoferId] = useState('');
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState(0);  // Iniciar con 0 en lugar de una cadena vacía
  const [clientes, setClientes] = useState({});
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda

  // Obtener todas las órdenes de mensajería
  const fetchOrdenesMensajeria = async () => {
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

      setOrdenesMensajeria(ordenesPendientes);

      // Obtener IDs de los clientes solo si hay órdenes pendientes
      if (ordenesPendientes.length > 0) {
        const clienteIds = ordenesPendientes.map(orden => orden.nombreCliente);
        fetchClientes(clienteIds);
      }
    } catch (err) {
      toast.error('Error al obtener las órdenes de mensajería');
      console.error(err.message);
    }
  };

  // Obtener todas las órdenes de domicilio
  const fetchOrdenesDomicilio = async () => {
    try {
      const response = await fetch(SummaryApi.allOrdenesDomicilio.url, {
        method: SummaryApi.allOrdenesDomicilio.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Error al obtener las órdenes de domicilio');

      const data = await response.json();
      const ordenesConOrdenacion = data.data || [];

      // Filtrar órdenes con estado pendiente
      const ordenesPendientes = ordenesConOrdenacion.filter(orden => orden.estado === 'entregado');

      // Ordenar las órdenes por createdAt de más reciente a más antigua
      ordenesPendientes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setOrdenesDomicilio(ordenesPendientes);

      // Obtener IDs de los clientes solo si hay órdenes pendientes
      if (ordenesPendientes.length > 0) {
        const clienteIds = ordenesPendientes.map(orden => orden.nombreCliente);
        fetchClientes(clienteIds);
      }
    } catch (err) {
      toast.error('Error al obtener las órdenes de domicilio');
      console.error(err.message);
    }
  };

  // Obtener todas las órdenes de transporte particular
  const fetchOrdenesTransporteParticular = async () => {
    try {
      const response = await fetch(SummaryApi.allOrdenesTransporteParticular.url, {
        method: SummaryApi.allOrdenesTransporteParticular.method,
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

      setOrdenesTransporteParticular(ordenesPendientes);

      // Obtener IDs de los clientes solo si hay órdenes pendientes
      if (ordenesPendientes.length > 0) {
        const clienteIds = ordenesPendientes.map(orden => orden.nombreCliente);
        fetchClientes(clienteIds);
      }
    } catch (err) {
      toast.error('Error al obtener las órdenes de mensajería');
      console.error(err.message);
    }
  };

   // Obtener todas las órdenes de transporte Salud
   const fetchOrdenesTransporteSalud = async () => {
    try {
      const response = await fetch(SummaryApi.allOrdenesTransporteSalud.url, {
        method: SummaryApi.allOrdenesTransporteSalud.method,
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

      setOrdenesTransporteSalud(ordenesPendientes);

      // Obtener IDs de los clientes solo si hay órdenes pendientes
      if (ordenesPendientes.length > 0) {
        const clienteIds = ordenesPendientes.map(orden => orden.nombreCliente);
        fetchClientes(clienteIds);
      }
    } catch (err) {
      toast.error('Error al obtener las órdenes de mensajería');
      console.error(err.message);
    }
  };

  // Obtener todas las órdenes de compra intermunicipal
  const fetchOrdenesComprasIntermunicipales = async () => {
    try {
      const response = await fetch(SummaryApi.allOrdenesComprasIntermunicipales.url, {
        method: SummaryApi.allOrdenesComprasIntermunicipales.method,
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

      setOrdenesComprasIntermunicipales(ordenesPendientes);

      // Obtener IDs de los clientes solo si hay órdenes pendientes
      if (ordenesPendientes.length > 0) {
        const clienteIds = ordenesPendientes.map(orden => orden.nombreCliente);
        fetchClientes(clienteIds);
      }
    } catch (err) {
      toast.error('Error al obtener las órdenes de mensajería');
      console.error(err.message);
    }
  };

  // Obtener todas las órdenes de transporte Salud
  const fetchOrdenesDiligencias = async () => {
    try {
      const response = await fetch(SummaryApi.allOrdenesDiligencias.url, {
        method: SummaryApi.allOrdenesDiligencias.method,
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

      setOrdenesDiligencias(ordenesPendientes);

      // Obtener IDs de los clientes solo si hay órdenes pendientes
      if (ordenesPendientes.length > 0) {
        const clienteIds = ordenesPendientes.map(orden => orden.nombreCliente);
        fetchClientes(clienteIds);
      }
    } catch (err) {
      toast.error('Error al obtener las órdenes de mensajería');
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

  const fetchConductores = async () => {
    try {
      const response = await fetch(SummaryApi.getConductores.url, {
        method: SummaryApi.getConductores.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Error al obtener los Conductores');

      const data = await response.json();
      const conductoresFiltrados = data.data.filter(user => user.role.includes('conductor'));
      setConductor(conductoresFiltrados);
    } catch (err) {
      toast.error('Error al obtener los Conductores');
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
      await fetchOrdenesMensajeria(); // Actualizar la lista de órdenes
      await fetchOrdenesDomicilio(); // Actualizar la lista de órdenes
      await fetchOrdenesComprasIntermunicipales(); // Actualizar la lista de órdenes
      await fetchOrdenesDiligencias(); // Actualizar la lista de órdenes
    } catch (err) {
      toast.error('Error al asignar domiciliario');
      console.error(err.message);
    }
  };

  //Asignar conductor
  const handleAsignarConductor = async (orderId) => {
    try {
      const response = await fetch(SummaryApi.assignConductor.url, {
        method: SummaryApi.assignConductor.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ orderId, choferId }),
      });

      if (!response.ok) throw new Error('Error al asignar conductor');

      toast.success(`Conductor asignado con éxito para la orden ${orderId}`);

      await fetchOrdenesTransporteParticular(); // Actualizar la lista de órdenes
      await fetchOrdenesTransporteSalud(); // Actualizar la lista de órdenes

    } catch (err) {
      toast.error('Error al asignar Conductor');
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
      await fetchOrdenesMensajeria(); // Actualizar la lista de órdenes
      await fetchOrdenesDomicilio(); // Actualizar la lista de órdenes
      await fetchOrdenesTransporteParticular(); // Actualizar la lista de órdenes
      await fetchOrdenesTransporteSalud(); // Actualizar la lista de órdenes
      await fetchOrdenesComprasIntermunicipales(); // Actualizar la lista de órdenes
      await fetchOrdenesDiligencias(); // Actualizar la lista de órdenes
    } catch (err) {
      toast.error('Error al cambiar el estado');
      console.error(err.message);
    }
  };

  // Cambiar precio de la orden
  const handleCambiarPrecio = async (orderId) => {
    const precio = nuevoPrecio[orderId];
    
    console.log("Este es el precio antes de enviar:", precio);  // Verifica qué valor tiene el precio
  
    if (!precio || isNaN(precio) || parseFloat(precio) <= 0) {
      toast.error('Por favor ingresa un precio válido');
      return;
    }
  
    try {
      const response = await fetch(SummaryApi.cambiarPrecio.url, {
        method: SummaryApi.cambiarPrecio.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ orderId, nuevoPrecio: parseFloat(precio) }), // Asegúrate de enviar un número
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cambiar el precio');
      }
  
      toast.success(`Precio de la orden ${orderId} actualizado con éxito`);
      await fetchOrdenesMensajeria();
      await fetchOrdenesDomicilio();
      await fetchOrdenesTransporteParticular();
      await fetchOrdenesTransporteSalud();
      await fetchOrdenesComprasIntermunicipales();
      await fetchOrdenesDiligencias();
    } catch (err) {
      toast.error('Error al cambiar el precio');
      console.error(err.message);
    }
  };
  

  // Filtrar las órdenes según el término de búsqueda
  const filteredOrdersMensajeria = ordenesMensajeria.filter((orden) => {
    const cliente = clientes[orden.nombreCliente];
    return (
      cliente &&
      (cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.phone.toString().includes(searchTerm))
    );
  });

  const filteredOrdersDomicilio = ordenesDomicilio.filter((orden) => {
    const cliente = clientes[orden.nombreCliente];
    return (
      cliente &&
      (cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.phone.toString().includes(searchTerm))
    );
  });

  const filteredOrdersTransporteParticular = ordenesTransporteParticular.filter((orden) => {
    const cliente = clientes[orden.nombreCliente];
    return (
      cliente &&
      (cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.phone.toString().includes(searchTerm))
    );
  });

  const filteredOrdersTransporteSalud = ordenesTransporteSalud.filter((orden) => {
    const cliente = clientes[orden.nombreCliente];
    return (
      cliente &&
      (cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.phone.toString().includes(searchTerm))
    );
  });

  const filteredOrdersComprasIntermunicipales = ordenesComprasIntermunicipales.filter((orden) => {
    const cliente = clientes[orden.nombreCliente];
    return (
      cliente &&
      (cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.phone.toString().includes(searchTerm))
    );
  });

  const filteredOrdersDiligencias= ordenesDiligencias.filter((orden) => {
    const cliente = clientes[orden.nombreCliente];
    return (
      cliente &&
      (cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.phone.toString().includes(searchTerm))
    );
  });

  // Cargar las órdenes y domiciliarios al montar el componente
  useEffect(() => {
    fetchOrdenesMensajeria();
    fetchOrdenesDomicilio();
    fetchOrdenesTransporteParticular();
    fetchOrdenesTransporteSalud();
    fetchOrdenesComprasIntermunicipales();
    fetchOrdenesDiligencias();
    fetchDomiciliarios();
    fetchConductores();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Gestión de Órdenes Entregadas</h1>

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
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Órdenes Pendientes de mensajeria</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrdersMensajeria.length > 0 ? (
            filteredOrdersMensajeria.map((orden) => (
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

                  {/* Modificar precio */}
                  <div className="mt-4">
  {/* Campo para ingresar el nuevo precio */}
  <label htmlFor={`nuevoPrecio-${orden._id}`} className="block text-sm font-medium text-gray-700">
    Nuevo Precio
  </label>
  <input
  id={`nuevoPrecio-${orden._id}`}
  type="number"
  placeholder="Ingrese el nuevo precio"
  value={nuevoPrecio[orden._id] || ""}
  onChange={(e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === "") {  // Asegura que el valor sea numérico
      setNuevoPrecio((prev) => ({ ...prev, [orden._id]: value }));
    }
  }}
  className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:ring-yellow-500 focus:border-yellow-500"
/>



  {/* Botón para actualizar el precio */}
  <button
    onClick={() => handleCambiarPrecio(orden._id)}
    className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition duration-300 ease-in-out"
  >
    Actualizar Precio
  </button>
</div>

                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No hay órdenes pendientes.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Órdenes Pendientes de Domicilio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrdersDomicilio.length > 0 ? (
            filteredOrdersDomicilio.map((orden) => (
              <div key={orden._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">Cliente: {clientes[orden.nombreCliente]?.name}</h3>
                  <p className="text-gray-600">Teléfono: {clientes[orden.nombreCliente]?.phone}</p>
                  <p className="text-gray-600">Estado: <span className={`font-semibold text-green-600`}>{orden.estado}</span></p>
                  <p className="text-gray-600">Tipo de Pago: {orden.opcionPago}</p>
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

                  {/* Modificar precio */}
                  <div className="mt-4">
  {/* Campo para ingresar el nuevo precio */}
  <label htmlFor={`nuevoPrecio-${orden._id}`} className="block text-sm font-medium text-gray-700">
    Nuevo Precio
  </label>
  <input
  id={`nuevoPrecio-${orden._id}`}
  type="number"
  placeholder="Ingrese el nuevo precio"
  value={nuevoPrecio[orden._id] || ""}
  onChange={(e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === "") {  // Asegura que el valor sea numérico
      setNuevoPrecio((prev) => ({ ...prev, [orden._id]: value }));
    }
  }}
  className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:ring-yellow-500 focus:border-yellow-500"
/>



  {/* Botón para actualizar el precio */}
  <button
    onClick={() => handleCambiarPrecio(orden._id)}
    className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition duration-300 ease-in-out"
  >
    Actualizar Precio
  </button>
</div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No hay órdenes pendientes.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Órdenes Pendientes de Transporte particular</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrdersTransporteParticular.length > 0 ? (
            filteredOrdersTransporteParticular.map((orden) => (
              <div key={orden._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">Cliente: {clientes[orden.nombreCliente]?.name}</h3>
                  <p className="text-gray-600">Teléfono: {clientes[orden.nombreCliente]?.phone}</p>
                  <p className="text-gray-600">Estado: <span className={`font-semibold text-green-600`}>{orden.estado}</span></p>
                  <p className="text-gray-600">Tipo de vehiculo: {orden.tipoDeVehiculo}</p>
                  <p className="text-gray-600">Numero de pasajeros: {orden.NumeroPasajeros}</p>
                  <p className="text-gray-600">Recogida: {orden.direccionRecogida}</p>
                  <p className="text-gray-600">Entrega: {orden.direccionEntrega}</p>
                  <p className="text-gray-600">Precio: {orden.precio !== null ? `$${orden.precio}` : "Sin asignar"}</p>              
                  <p className="text-gray-600">Conductor: {clientes[orden.nombreChofer]?.name}</p>
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

                  {/* Asignar conductor */}
                  <select
                    value={choferId}
                    onChange={(e) => setChoferId(e.target.value)}
                    className="mb-2 w-full p-2 border border-gray-300 rounded-md mt-2"
                  >
                    <option value="">Seleccionar conductor</option>
                    {conductores.map((conductor) => (
                      <option key={conductor._id} value={conductor._id}>
                        {conductor.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleAsignarConductor(orden._id)}
                    className="block w-full bg-green-500 text-white p-2 rounded-md mt-2"
                  >
                    Asignar Conductor
                  </button>
                  {/* Modificar precio */}
                  <div className="mt-4">
  {/* Campo para ingresar el nuevo precio */}
  <label htmlFor={`nuevoPrecio-${orden._id}`} className="block text-sm font-medium text-gray-700">
    Nuevo Precio
  </label>
  <input
  id={`nuevoPrecio-${orden._id}`}
  type="number"
  placeholder="Ingrese el nuevo precio"
  value={nuevoPrecio[orden._id] || ""}
  onChange={(e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === "") {  // Asegura que el valor sea numérico
      setNuevoPrecio((prev) => ({ ...prev, [orden._id]: value }));
    }
  }}
  className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:ring-yellow-500 focus:border-yellow-500"
/>



  {/* Botón para actualizar el precio */}
  <button
    onClick={() => handleCambiarPrecio(orden._id)}
    className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition duration-300 ease-in-out"
  >
    Actualizar Precio
  </button>
</div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No hay órdenes pendientes.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Órdenes Pendientes de salud</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrdersTransporteSalud.length > 0 ? (
            filteredOrdersTransporteSalud.map((orden) => (
              <div key={orden._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">Cliente: {clientes[orden.nombreCliente]?.name}</h3>
                  <p className="text-gray-600">Teléfono: {clientes[orden.nombreCliente]?.phone}</p>
                  <p className="text-gray-600">Estado: <span className={`font-semibold text-green-600`}>{orden.estado}</span></p>
                  <p className="text-gray-600">Tipo de vehiculo: {orden.tipoDeVehiculo}</p>
                  <p className="text-gray-600">Numero de pasajeros: {orden.NumeroPasajeros}</p>
                  <p className="text-gray-600">Recogida: {orden.direccionRecogida}</p>
                  <p className="text-gray-600">Entrega: {orden.direccionEntrega}</p>
                  <p className="text-gray-600">Precio: {orden.precio !== null ? `$${orden.precio}` : "Sin asignar"}</p>              
                  <p className="text-gray-600">Conductor: {clientes[orden.nombreChofer]?.name}</p>
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

                  {/* Asignar conductor */}
                  <select
                    value={choferId}
                    onChange={(e) => setChoferId(e.target.value)}
                    className="mb-2 w-full p-2 border border-gray-300 rounded-md mt-2"
                  >
                    <option value="">Seleccionar conductor</option>
                    {conductores.map((conductor) => (
                      <option key={conductor._id} value={conductor._id}>
                        {conductor.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleAsignarConductor(orden._id)}
                    className="block w-full bg-green-500 text-white p-2 rounded-md mt-2"
                  >
                    Asignar Conductor
                  </button>
                  {/* Modificar precio */}
                  <div className="mt-4">
  {/* Campo para ingresar el nuevo precio */}
  <label htmlFor={`nuevoPrecio-${orden._id}`} className="block text-sm font-medium text-gray-700">
    Nuevo Precio
  </label>
  <input
  id={`nuevoPrecio-${orden._id}`}
  type="number"
  placeholder="Ingrese el nuevo precio"
  value={nuevoPrecio[orden._id] || ""}
  onChange={(e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === "") {  // Asegura que el valor sea numérico
      setNuevoPrecio((prev) => ({ ...prev, [orden._id]: value }));
    }
  }}
  className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:ring-yellow-500 focus:border-yellow-500"
/>



  {/* Botón para actualizar el precio */}
  <button
    onClick={() => handleCambiarPrecio(orden._id)}
    className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition duration-300 ease-in-out"
  >
    Actualizar Precio
  </button>
</div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No hay órdenes pendientes.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Órdenes Pendientes de compras intermunicipales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrdersComprasIntermunicipales.length > 0 ? (
            filteredOrdersComprasIntermunicipales.map((orden) => (
              <div key={orden._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">Cliente: {clientes[orden.nombreCliente]?.name}</h3>
                  <p className="text-gray-600">Teléfono: {clientes[orden.nombreCliente]?.phone}</p>
                  <p className="text-gray-600">Estado: <span className={`font-semibold text-green-600`}>{orden.estado}</span></p>
                  <p className="text-gray-600">productos: {orden.productos}</p>
                  <p className="text-gray-600">Ubicacion de Compra: {orden.ubicacionCompra}</p>
                  <p className="text-gray-600">Entrega: {orden.direccionEntrega}</p>
                  <p className="text-gray-600">Presupuesto Maximo: {orden.presupuestoMaximo}</p>
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

                  {/* Modificar precio */}
                  <div className="mt-4">
  {/* Campo para ingresar el nuevo precio */}
  <label htmlFor={`nuevoPrecio-${orden._id}`} className="block text-sm font-medium text-gray-700">
    Nuevo Precio
  </label>
  <input
  id={`nuevoPrecio-${orden._id}`}
  type="number"
  placeholder="Ingrese el nuevo precio"
  value={nuevoPrecio[orden._id] || ""}
  onChange={(e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === "") {  // Asegura que el valor sea numérico
      setNuevoPrecio((prev) => ({ ...prev, [orden._id]: value }));
    }
  }}
  className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:ring-yellow-500 focus:border-yellow-500"
/>



  {/* Botón para actualizar el precio */}
  <button
    onClick={() => handleCambiarPrecio(orden._id)}
    className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition duration-300 ease-in-out"
  >
    Actualizar Precio
  </button>
</div>

                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No hay órdenes pendientes.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Órdenes Pendientes de Diligencias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrdersDiligencias.length > 0 ? (
            filteredOrdersDiligencias.map((orden) => (
              <div key={orden._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">Cliente: {clientes[orden.nombreCliente]?.name}</h3>
                  <p className="text-gray-600">Teléfono: {clientes[orden.nombreCliente]?.phone}</p>
                  <p className="text-gray-600">Estado: <span className={`font-semibold text-green-600`}>{orden.estado}</span></p>
                  <p className="text-gray-600">Descripcion: {orden.descripcionDiligencia}</p>
                  <p className="text-gray-600">Direccion Involucrados: {orden.direccionInvolucrados}</p>
                  <p className="text-gray-600">Documentos Necesarios: {orden.documentosNecesarios}</p>
                  <p className="text-gray-600">
  Fecha y Hora de Recogida: {new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Usa false para formato 24 horas
  }).format(new Date(orden.fechaHoraRecogida))}
</p>

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

                  {/* Modificar precio */}
                  <div className="mt-4">
  {/* Campo para ingresar el nuevo precio */}
  <label htmlFor={`nuevoPrecio-${orden._id}`} className="block text-sm font-medium text-gray-700">
    Nuevo Precio
  </label>
  <input
  id={`nuevoPrecio-${orden._id}`}
  type="number"
  placeholder="Ingrese el nuevo precio"
  value={nuevoPrecio[orden._id] || ""}
  onChange={(e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === "") {  // Asegura que el valor sea numérico
      setNuevoPrecio((prev) => ({ ...prev, [orden._id]: value }));
    }
  }}
  className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:ring-yellow-500 focus:border-yellow-500"
/>



  {/* Botón para actualizar el precio */}
  <button
    onClick={() => handleCambiarPrecio(orden._id)}
    className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition duration-300 ease-in-out"
  >
    Actualizar Precio
  </button>
</div>

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