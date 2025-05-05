import React, { useState, useEffect } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const OrdenesCanceladas = () => {
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
  const [clientes, setClientes] = useState([]);
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
      const ordenesPendientes = ordenesConOrdenacion.filter(orden => orden.estado === 'cancelado');

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
      const ordenesPendientes = ordenesConOrdenacion.filter(orden => orden.estado === 'cancelado');

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
      const ordenesPendientes = ordenesConOrdenacion.filter(orden => orden.estado === 'cancelado');

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
      const ordenesPendientes = ordenesConOrdenacion.filter(orden => orden.estado === 'cancelado');

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
      const ordenesPendientes = ordenesConOrdenacion.filter(orden => orden.estado === 'cancelado');

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
      const ordenesPendientes = ordenesConOrdenacion.filter(orden => orden.estado === 'cancelado');

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
      
    }
  };

  // Obtener detalles completos de los clientes (nombre y teléfono)
  const fetchClientes = async () => {
    try {
        const response = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include',
        });

        const data = await response.json();

        if (data.success) {
            // Filtrar solo los usuarios cuyo rol incluya "cliente"
            const clientes = data.data.filter(user => user.role.includes("cliente"));

            setClientes(clientes); 
            
            
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        
        toast.error("Error al obtener la lista de clientes.");
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
      
    }
  };

  //mensaje que muestra al asignar un domiciliario de tipo mensajeria
  const mensajeMensajeria = (orderId) => {
    const ordenMesajeria = filteredOrdersMensajeria.find(o => o._id === orderId);
  
         // Obtener los datos del repartidor asignado
      const repartidor = domiciliarios.find(d => d._id === repartidorId);
      if (!repartidor) throw new Error('No se encontró el domiciliario asignado');
  // Obtener la fecha de recogida
      const fechaMensajeria = new Date(ordenMesajeria.fechaHoraRecogida);
  // Formatear la fecha de recogida
      const fechaFormateada = fechaMensajeria.toLocaleString('es-CO', {
        weekday: 'long', // Día de la semana
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Formato 12 horas (AM/PM)
      });
  
      // Construir el mensaje
      const mensaje = `
      *Hola ${repartidor.name}! tienes una nueva orden de mensajería asignada:*
  
      ────────────────────── 
      *Cliente:* ${clientes.find(c => c._id === ordenMesajeria.nombreCliente)?.name}
      *Telefono:* ${clientes.find(c => c._id === ordenMesajeria.nombreCliente)?.phone}
      ────────────────────── 
      *Direcciones:*
      *Recogida:* ${ordenMesajeria.direccionRecogida}
      *Entrega:* ${ordenMesajeria.direccionEntrega}
      ──────────────────────
      *Tipo de Paquete:* ${ordenMesajeria.tipoDePaquete}
      *Peso Estimado:* ${ordenMesajeria.pesoEstimado} Kg
      ──────────────────────
      *Fecha y Hora de Recogida:* ${fechaFormateada}
      *Precio:* ${ordenMesajeria.precio !== null ? `$${ordenMesajeria.precio}` : "Precio no asignado"}
      ──────────────────────
      *Por favor, confirma la orden y procede con la entrega.*
      `;
  
  
      // Generar el enlace de WhatsApp
      const whatsappUrl = `https://wa.me/${repartidor.phone}?text=${encodeURIComponent(mensaje)}`;
  
      
      // Abrir WhatsApp Web en una nueva pestaña
      window.open(whatsappUrl, '_blank');
    };
  
    //mensaje que muestra al asignar un domiciliario de tipo domicilio
  const mensajeDomicilio = (orderId) => {
    const ordenDomicilio = filteredOrdersDomicilio.find(o => o._id === orderId);
  
         // Obtener los datos del repartidor asignado
      const repartidor = domiciliarios.find(d => d._id === repartidorId);
      if (!repartidor) throw new Error('No se encontró el domiciliario asignado');
  // Obtener la fecha de recogida
      const fechaDomicilio = new Date(ordenDomicilio.createdAt);
  // Formatear la fecha de recogida
      const fechaFormateada = fechaDomicilio.toLocaleString('es-CO', {
        weekday: 'long', // Día de la semana
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Formato 12 horas (AM/PM)
      });
  
      // Construir el mensaje
      const mensaje = `
      *Hola ${repartidor.name}! tienes una nueva orden de domicilio asignada:*
  
      ────────────────────── 
      *Cliente:* ${clientes.find(c => c._id === ordenDomicilio.nombreCliente)?.name}
      *Telefono:* ${clientes.find(c => c._id === ordenDomicilio.nombreCliente)?.phone}
      ────────────────────── 
      *Direcciones:*
      *Recogida:* ${ordenDomicilio.direccionRecogida}
      *Entrega:* ${ordenDomicilio.direccionEntrega}
      ──────────────────────
      *Categoria del producto:* ${ordenDomicilio.categoriaProducto}
      *Descipcion del producto:* ${ordenDomicilio.descripcionProducto} 
      *Comentario:* ${ordenDomicilio.comentario}
      ──────────────────────
      *Fecha y Hora de Recogida:* ${fechaFormateada}
      *Precio:* ${ordenDomicilio.precio !== null ? `$${ordenDomicilio.precio}` : "Precio no asignado"}
      ──────────────────────
      *Por favor, confirma la orden y procede con la entrega.*
      `;
  
  
      // Generar el enlace de WhatsApp
      const whatsappUrl = `https://wa.me/${repartidor.phone}?text=${encodeURIComponent(mensaje)}`;
  
      
      // Abrir WhatsApp Web en una nueva pestaña
      window.open(whatsappUrl, '_blank');
    };
  
    //mensaje que muestra al asignar un conductor de tipo transporte particular
  const mensajeTransporteParticular = (orderId) => {
    const ordenTransporteParticular = filteredOrdersTransporteParticular.find(o => o._id === orderId);
  
         // Obtener los datos del conductor asignado
      const conductor = conductores.find(d => d._id === choferId);
      if (!conductor) throw new Error('No se encontró el conductor asignado');
  // Obtener la fecha de recogida
      const fechaTransporteParticular = new Date(ordenTransporteParticular.fechaHoraRecogida);
  // Formatear la fecha de recogida
      const fechaFormateada = fechaTransporteParticular.toLocaleString('es-CO', {
        weekday: 'long', // Día de la semana
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Formato 12 horas (AM/PM)
      });
  
      // Construir el mensaje
      const mensaje = `
      *Hola ${conductor.name}! tienes una nueva orden de transporte particular asignada:*
  
      ────────────────────── 
      *Cliente:* ${clientes.find(c => c._id === ordenTransporteParticular.nombreCliente)?.name}
      *Telefono:* ${clientes.find(c => c._id === ordenTransporteParticular.nombreCliente)?.phone}
      ────────────────────── 
      *Direcciones:*
      *Recogida:* ${ordenTransporteParticular.direccionRecogida}
      *Entrega:* ${ordenTransporteParticular.direccionEntrega}
      ──────────────────────
      *Tipo de vehiculo:* ${ordenTransporteParticular.tipoDeVehiculo}
      *Numero de pasajeros:* ${ordenTransporteParticular.NumeroPasajeros} 
      *Opcion de viaje:* ${ordenTransporteParticular.opcionDeViaje}
      ──────────────────────
      *Fecha y Hora de Recogida:* ${fechaFormateada}
      *Precio:* ${ordenTransporteParticular.precio !== null ? `$${ordenTransporteParticular.precio}` : "Precio no asignado"}
      ──────────────────────
      *Por favor, confirma la orden y procede con la orden.*
      `;
  
  
      // Generar el enlace de WhatsApp
      const whatsappUrl = `https://wa.me/${conductor.phone}?text=${encodeURIComponent(mensaje)}`;
  
      
      // Abrir WhatsApp Web en una nueva pestaña
      window.open(whatsappUrl, '_blank');
    };
  
    //mensaje que muestra al asignar un conductor de tipo transporte salud
    const mensajeTransporteSalud = (orderId) => {
      const ordenTransporteSalud = filteredOrdersTransporteSalud.find(o => o._id === orderId);
    
           // Obtener los datos del conductor asignado
        const conductor = conductores.find(d => d._id === choferId);
        if (!conductor) throw new Error('No se encontró el conductor asignado');
    // Obtener la fecha de recogida
        const fechaTransporteSalud = new Date(ordenTransporteSalud.fechaHoraRecogida);
    // Formatear la fecha de recogida
        const fechaFormateada = fechaTransporteSalud.toLocaleString('es-CO', {
          weekday: 'long', // Día de la semana
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true, // Formato 12 horas (AM/PM)
        });
    
        // Construir el mensaje
        const mensaje = `
        *Hola ${conductor.name}! tienes una nueva orden de transporte salud asignada:*
    
        ────────────────────── 
        *Cliente:* ${clientes.find(c => c._id === ordenTransporteSalud.nombreCliente)?.name}
      *Telefono:* ${clientes.find(c => c._id === ordenTransporteSalud.nombreCliente)?.phone}
        ────────────────────── 
        *Direcciones:*
        *Recogida:* ${ordenTransporteSalud.direccionRecogida}
        *Entrega:* ${ordenTransporteSalud.direccionEntrega}
        ──────────────────────
        *Tipo de vehiculo:* ${ordenTransporteSalud.tipoDeVehiculo}
        *Numero de pasajeros:* ${ordenTransporteSalud.NumeroPasajeros} 
        *Opcion de viaje:* ${ordenTransporteSalud.opcionDeViaje}
        ──────────────────────
        *Fecha y Hora de Recogida:* ${fechaFormateada}
        *Precio:* ${ordenTransporteSalud.precio !== null ? `$${ordenTransporteSalud.precio}` : "Precio no asignado"}
        ──────────────────────
        *Por favor, confirma la orden y procede con la orden.*
        `;
    
    
        // Generar el enlace de WhatsApp
        const whatsappUrl = `https://wa.me/${conductor.phone}?text=${encodeURIComponent(mensaje)}`;
    
        
        // Abrir WhatsApp Web en una nueva pestaña
        window.open(whatsappUrl, '_blank');
      };
  
    //mensaje que muestra al asignar un domiciliario de tipo compra intermunicipal
  const mensajeCompraIntermunicipal = (orderId) => {
    const ordenComprasIntermunicipales = filteredOrdersComprasIntermunicipales.find(o => o._id === orderId);
  
         // Obtener los datos del repartidor asignado
      const repartidor = domiciliarios.find(d => d._id === repartidorId);
      if (!repartidor) throw new Error('No se encontró el domiciliario asignado');
  // Obtener la fecha de recogida
      const fechaComprasIntermunicipales= new Date(ordenComprasIntermunicipales.fechaHoraEntrega);
  // Formatear la fecha de recogida
      const fechaFormateada = fechaComprasIntermunicipales.toLocaleString('es-CO', {
        weekday: 'long', // Día de la semana
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Formato 12 horas (AM/PM)
      });
  
      // Construir el mensaje
      const mensaje = `
      *Hola ${repartidor.name}! tienes una nueva orden de compra intermunicipal asignada:*
  
      ────────────────────── 
      *Cliente:* ${clientes.find(c => c._id === ordenComprasIntermunicipales.nombreCliente)?.name}
      *Telefono:* ${clientes.find(c => c._id === ordenComprasIntermunicipales.nombreCliente)?.phone}
      ────────────────────── 
      *Direcciones:*
      *Ubicacion de compra:* ${ordenComprasIntermunicipales.ubicacionCompra}
      *Entrega:* ${ordenComprasIntermunicipales.direccionEntrega}
      ──────────────────────
      *Productos:* ${ordenComprasIntermunicipales.productos}
      *Presupuesto maximo:* ${ordenComprasIntermunicipales.presupuestoMaximo}
      ──────────────────────
      *Fecha y Hora de Entrega:* ${fechaFormateada}
      ──────────────────────
      *Por favor, confirma la orden y procede con la entrega.*
      `;
  
  
      // Generar el enlace de WhatsApp
      const whatsappUrl = `https://wa.me/${repartidor.phone}?text=${encodeURIComponent(mensaje)}`;
  
      
      // Abrir WhatsApp Web en una nueva pestaña
      window.open(whatsappUrl, '_blank');
    };
  
    //mensaje que muestra al asignar un domiciliario de tipo diligencias
  const mensajeDiligencias = (orderId) => {
    const ordenDiligencias = filteredOrdersDiligencias.find(o => o._id === orderId);
  
         // Obtener los datos del repartidor asignado
      const repartidor = domiciliarios.find(d => d._id === repartidorId);
      if (!repartidor) throw new Error('No se encontró el domiciliario asignado');
  // Obtener la fecha de recogida
      const fechaDiligencias= new Date(ordenDiligencias.fechaHoraRecogida);
  // Formatear la fecha de recogida
      const fechaFormateada = fechaDiligencias.toLocaleString('es-CO', {
        weekday: 'long', // Día de la semana
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Formato 12 horas (AM/PM)
      });
  
      // Construir el mensaje
      const mensaje = `
      *Hola ${repartidor.name}! tienes una nueva orden de diligencia asignada:*
  
      ────────────────────── 
      *Cliente:* ${clientes.find(c => c._id === ordenDiligencias.nombreCliente)?.name}
      *Telefono:* ${clientes.find(c => c._id === ordenDiligencias.nombreCliente)?.phone}
      ────────────────────── 
      *Direcciones:*
      *Direcciones involucradas :* ${ordenDiligencias.direccionInvolucrados}
      ──────────────────────
      *Descripcion:* ${ordenDiligencias.descripcionDiligencia}
      *Documentos necesarios:* ${ordenDiligencias.documentosNecesarios} Kg
      ──────────────────────
      *Fecha y Hora de Recogida:* ${fechaFormateada}
      *Precio:* ${ordenDiligencias.precio !== null ? `$${ordenDiligencias.precio}` : "Precio no asignado"}
      ──────────────────────
      *Por favor, confirma la orden y procede con la entrega.*
      `;
  
  
      // Generar el enlace de WhatsApp
      const whatsappUrl = `https://wa.me/${repartidor.phone}?text=${encodeURIComponent(mensaje)}`;
  
      
      // Abrir WhatsApp Web en una nueva pestaña
      window.open(whatsappUrl, '_blank');
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

      // Mostrar mensaje al asignar un domiciliario si la orden es de mensajeria
      if (filteredOrdersMensajeria.find(o => o._id === orderId)) {
        mensajeMensajeria(orderId);
      }

      // Mostrar mensaje al asignar un domiciliario si la orden es de domicilio
      if (filteredOrdersDomicilio.find(o => o._id === orderId)) {
        mensajeDomicilio(orderId);
      }

      // Mostrar mensaje al asignar un domiciliario si la orden es de compra intermunicipal
      if (filteredOrdersComprasIntermunicipales.find(o => o._id === orderId)) {
        mensajeCompraIntermunicipal(orderId);
      }

      // Mostrar mensaje al asignar un domiciliario si la orden es de diligencias
      if (filteredOrdersDiligencias.find(o => o._id === orderId)) {
        mensajeDiligencias(orderId);
        
      }

      toast.success(`Domiciliario asignado con éxito para la orden ${orderId}`);
      await fetchOrdenesMensajeria(); // Actualizar la lista de órdenes
      await fetchOrdenesDomicilio(); // Actualizar la lista de órdenes
      await fetchOrdenesComprasIntermunicipales(); // Actualizar la lista de órdenes
      await fetchOrdenesDiligencias(); // Actualizar la lista de órdenes
    } catch (err) {
      toast.error('Error al asignar domiciliario');
      
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


      //Mostrar mensaje al asignar un conductor si la orden es de transporte particular
      if (filteredOrdersTransporteParticular.find(o => o._id === orderId)) {
        mensajeTransporteParticular(orderId);
      }

      //Mostrar mensaje al asignar un conductor si la orden es de transporte salud
      if (filteredOrdersTransporteSalud.find(o => o._id === orderId)) {
        mensajeTransporteSalud(orderId);
      }

      toast.success(`Conductor asignado con éxito para la orden ${orderId}`);

      await fetchOrdenesTransporteParticular(); // Actualizar la lista de órdenes
      await fetchOrdenesTransporteSalud(); // Actualizar la lista de órdenes

    } catch (err) {
      toast.error('Error al asignar Conductor');
      
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
      
    }
  };

  // Cambiar precio de la orden
  const handleCambiarPrecio = async (orderId) => {
    const precio = nuevoPrecio[orderId];
    
    
  
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
      
    }
  };
  

  // Filtrar las órdenes según el término de búsqueda
  const filteredOrdersMensajeria = ordenesMensajeria.filter((orden) => {
    // Buscar el cliente en la lista de clientes por su _id
    const cliente = clientes.find(c => c._id === orden.nombreCliente);

    return (
        cliente &&
        (cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         cliente.phone.toString().includes(searchTerm))
    );
});


  const filteredOrdersDomicilio = ordenesDomicilio.filter((orden) => {
    const cliente = clientes.find(c => c._id === orden.nombreCliente);
    return (
      cliente &&
      (cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.phone.toString().includes(searchTerm))
    );
  });

  const filteredOrdersTransporteParticular = ordenesTransporteParticular.filter((orden) => {
    const cliente = clientes.find(c => c._id === orden.nombreCliente);
    return (
      cliente &&
      (cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.phone.toString().includes(searchTerm))
    );
  });

  const filteredOrdersTransporteSalud = ordenesTransporteSalud.filter((orden) => {
    const cliente = clientes.find(c => c._id === orden.nombreCliente);
    return (
      cliente &&
      (cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.phone.toString().includes(searchTerm))
    );
  });

  const filteredOrdersComprasIntermunicipales = ordenesComprasIntermunicipales.filter((orden) => {
    const cliente = clientes.find(c => c._id === orden.nombreCliente);
    return (
      cliente &&
      (cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.phone.toString().includes(searchTerm))
    );
  });

  const filteredOrdersDiligencias= ordenesDiligencias.filter((orden) => {
    const cliente = clientes.find(c => c._id === orden.nombreCliente);
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
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Gestión de Órdenes Canceladas </h1>

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
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Órdenes Canceladas de mensajeria</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrdersMensajeria.length > 0 ? (
            filteredOrdersMensajeria.map((orden) => (
              <div key={orden._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">Cliente: {clientes.find(c => c._id === orden.nombreCliente)?.name}</h3>
                  <p className="text-gray-600">Teléfono: {clientes.find(c => c._id === orden.nombreCliente)?.phone}</p>
                  <p className="text-gray-600">Estado: <span className={`font-semibold text-red-600`}>{orden.estado}</span></p>
                  <p className="text-gray-600">Tipo de Paquete: {orden.tipoDePaquete}</p>
                  <p className="text-gray-600">Recogida: {orden.direccionRecogida}</p>
                  <p className="text-gray-600">Entrega: {orden.direccionEntrega}</p>
                  <p className="text-gray-600">Precio: ${orden.precio}</p>

                  
                  <p className="text-gray-600">
  Repartidor: {domiciliarios.find(d => d._id === orden.nombreRepartidor)?.name || "No asignado"}
</p>

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
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Órdenes Canceladas de Domicilio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrdersDomicilio.length > 0 ? (
            filteredOrdersDomicilio.map((orden) => (
              <div key={orden._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">Cliente: {clientes.find(c => c._id === orden.nombreCliente)?.name}</h3>
                <p className="text-gray-600">Teléfono: {clientes.find(c => c._id === orden.nombreCliente)?.phone}</p>
                  <p className="text-gray-600">Estado: <span className={`font-semibold text-red-600`}>{orden.estado}</span></p>
                  <p className="text-gray-600">Recogida: {orden.direccionRecogida}</p>
                  <p className="text-gray-600">Entrega: {orden.direccionEntrega}</p>
                  <p className="text-gray-600">Precio: ${orden.precio}</p>
                  <p className="text-gray-600">
  Repartidor: {domiciliarios.find(d => d._id === orden.nombreRepartidor)?.name || "No asignado"}
</p>

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
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Órdenes Canceladas de Transporte particular</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrdersTransporteParticular.length > 0 ? (
            filteredOrdersTransporteParticular.map((orden) => (
              <div key={orden._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">Cliente: {clientes.find(c => c._id === orden.nombreCliente)?.name}</h3>
                <p className="text-gray-600">Teléfono: {clientes.find(c => c._id === orden.nombreCliente)?.phone}</p>
                  <p className="text-gray-600">Estado: <span className={`font-semibold text-red-600`}>{orden.estado}</span></p>
                  <p className="text-gray-600">Tipo de vehiculo: {orden.tipoDeVehiculo}</p>
                  <p className="text-gray-600">Numero de pasajeros: {orden.NumeroPasajeros}</p>
                  <p className="text-gray-600">Recogida: {orden.direccionRecogida}</p>
                  <p className="text-gray-600">Entrega: {orden.direccionEntrega}</p>
                  <p className="text-gray-600">Precio: {orden.precio !== null ? `$${orden.precio}` : "Sin asignar"}</p>              
                  <p className="text-gray-600">
                  Conductor: {domiciliarios.find(d => d._id === orden.nombreChofer)?.name || "No asignado"}
</p>

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
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Órdenes Canceladas de Transporte salud</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrdersTransporteSalud.length > 0 ? (
            filteredOrdersTransporteSalud.map((orden) => (
              <div key={orden._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">Cliente: {clientes.find(c => c._id === orden.nombreCliente)?.name}</h3>
                <p className="text-gray-600">Teléfono: {clientes.find(c => c._id === orden.nombreCliente)?.phone}</p>
                  <p className="text-gray-600">Estado: <span className={`font-semibold text-red-600`}>{orden.estado}</span></p>
                  <p className="text-gray-600">Tipo de vehiculo: {orden.tipoDeVehiculo}</p>
                  <p className="text-gray-600">Numero de pasajeros: {orden.NumeroPasajeros}</p>
                  <p className="text-gray-600">Recogida: {orden.direccionRecogida}</p>
                  <p className="text-gray-600">Entrega: {orden.direccionEntrega}</p>
                  <p className="text-gray-600">Precio: {orden.precio !== null ? `$${orden.precio}` : "Sin asignar"}</p>              
                  <p className="text-gray-600">
                  Conductor: {domiciliarios.find(d => d._id === orden.nombreChofer)?.name || "No asignado"}
</p>

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
                  
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No hay órdenes pendientes.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Órdenes Canceladas de compras intermunicipales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrdersComprasIntermunicipales.length > 0 ? (
            filteredOrdersComprasIntermunicipales.map((orden) => (
              <div key={orden._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">Cliente: {clientes.find(c => c._id === orden.nombreCliente)?.name}</h3>
                <p className="text-gray-600">Teléfono: {clientes.find(c => c._id === orden.nombreCliente)?.phone}</p>
                  <p className="text-gray-600">Estado: <span className={`font-semibold text-red-600`}>{orden.estado}</span></p>
                  <p className="text-gray-600">productos: {orden.productos}</p>
                  <p className="text-gray-600">Ubicacion de Compra: {orden.ubicacionCompra}</p>
                  <p className="text-gray-600">Entrega: {orden.direccionEntrega}</p>
                  <p className="text-gray-600">Presupuesto Maximo: {orden.presupuestoMaximo}</p>
                  <p className="text-gray-600">Precio: ${orden.precio}</p>
                  <p className="text-gray-600">
  Repartidor: {domiciliarios.find(d => d._id === orden.nombreRepartidor)?.name || "No asignado"}
</p>

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
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Órdenes Canceladas de Diligencias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrdersDiligencias.length > 0 ? (
            filteredOrdersDiligencias.map((orden) => (
              <div key={orden._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">Cliente: {clientes.find(c => c._id === orden.nombreCliente)?.name}</h3>
                <p className="text-gray-600">Teléfono: {clientes.find(c => c._id === orden.nombreCliente)?.phone}</p>
                  <p className="text-gray-600">Estado: <span className={`font-semibold text-red-600`}>{orden.estado}</span></p>
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
                  <p className="text-gray-600">
  Repartidor: {domiciliarios.find(d => d._id === orden.nombreRepartidor)?.name || "No asignado"}
</p>

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
export default OrdenesCanceladas;

