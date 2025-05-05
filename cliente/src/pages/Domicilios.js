import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import SummaryApi from "../common";
import { toast } from 'react-toastify';

const Domicilios = () => {
    const [formData, setFormData] = useState({
        categoriaProducto: '',
        descripcionProducto: '',
        direccionRecogida: '',
        direccionEntrega: '',
        opcionPago: '',
        comentario: '',
        barrioEntrega: '',
        barrioRecogida: ''
    });
    
    const [precio, setPrecio] = useState(null); // Nuevo estado para el precio}
        const [barrios, setBarrios] = useState([]);
        const [filtro, setFiltro] = useState('');


    
        

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };


        const fetchBarrios = async () => {
            try {
              const response = await fetch(SummaryApi.allBarrios.url, {
                method: SummaryApi.allBarrios.method,
                credentials: 'include',
              });
              const data = await response.json();
              console.log(data);
              setBarrios(data || []);
            } catch (err) {
              toast.error('Error al cargar barrios');
            }
          };
    
          const barriosFiltrados = barrios.filter((barrio) => {
            const query = filtro.toLowerCase();
            return (
              barrio.nombreBarrio.toLowerCase().includes(query) ||
              barrio.zona.toLowerCase().includes(query)
            );
          });
    
          const handleCalcularDistancia = () => {
            const { barrioRecogida, barrioEntrega } = formData;
        
            const barrioOrigen = barrios.find(b => b.nombreBarrio === barrioRecogida);
            const barrioDestino = barrios.find(b => b.nombreBarrio === barrioEntrega);
        
            if (!barrioOrigen || !barrioDestino) {
                toast.error("No se pudo calcular la distancia entre las direcciones.");
                toast.info("Por favor, contactanos por WhatsApp.");
                return;
            }
            let precioCalculado
    
            if(barrioDestino.zona === "fuera" || barrioOrigen.zona === "fuera"){
            
                precioCalculado= barrioDestino.precioCentro;
            }
            else if (barrioDestino.zona === "centro"){
    
                precioCalculado= barrioOrigen.precioCentro;
                
            }
            else if (barrioDestino.zona === "norte"){
    
                precioCalculado= barrioOrigen.precioNorte;
                
            }
            else if (barrioDestino.zona === "sur"){
    
                precioCalculado= barrioOrigen.precioSur;
                
            }
            else if (barrioDestino.zona === "oriente"){
    
                precioCalculado= barrioOrigen.precioOriente;
                
            }
            else if (barrioDestino.zona === "occidente"){
                
                precioCalculado= barrioOrigen.precioOccidente;
                
            }
    
            //logica segun la hora
            const fechaHoraRecogida = new Date();
            const horaRecogida = fechaHoraRecogida.getHours();
    
            if (horaRecogida >= 19 || horaRecogida < 6) {
                toast.info("Se aplicará una tarifa nocturna.");
                precioCalculado += 500; // Aumenta el precio en 500 por tarifa nocturna
    
            }
    
            setPrecio(precioCalculado); // Actualiza el precio calculado
        
        };
        


        const handleSubmit = async (e) => {
            e.preventDefault();
                
            try {
                const { barrioRecogida, barrioEntrega } = formData;
    
        const barrioOrigen = barrios.find(b => b.nombreBarrio === barrioRecogida);
        const barrioDestino = barrios.find(b => b.nombreBarrio === barrioEntrega);
        
                if (!barrioOrigen || !barrioDestino) {
                    const fechaRegistro = new Date();
                const fechaRegistroFormateada = fechaRegistro.toLocaleString('es-CO', {
                    weekday: 'long', // Día de la semana
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true, // Formato 12 horas (AM/PM)
                });

                const mensaje =`
    *Detalles de la Orden de Domicilio:*
    
    ──────────────────────
    *Direcciónes:*
    *Recogida:* ${formData.direccionRecogida} ,${formData.barrioRecogida}
    *Entrega:* ${formData.direccionEntrega} , ${formData.barrioEntrega}
    ──────────────────────
    *Categoria del producto:* ${formData.categoriaProducto}
    *Descripcion de productos:* ${formData.descripcionProducto}
    ──────────────────────
    *Fecha y Hora de Domicilio:* ${fechaRegistroFormateada}
    ──────────────────────
    *Precio sin calcular*
    ──────────────────────
    *Comentarios:* ${formData.comentario}
    ──────────────────────
    Orden de Domicilio sin calcular la precio
            `;

     // URL para WhatsApp (ajustar el número y el mensaje)
     const telefono = "+573025887156"; // Número de teléfono del destinatario
     const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

     // Redirigir a WhatsApp para enviar el mensaje
     window.open(urlWhatsApp, '_blank');
                }else{
                    const fechaRegistro = new Date();
                const fechaRegistroFormateada = fechaRegistro.toLocaleString('es-CO', {
                    weekday: 'long', // Día de la semana
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true, // Formato 12 horas (AM/PM)
                });

                const mensaje =`
    *Detalles de la Orden de Domicilio:*
    
    ──────────────────────
    *Direcciónes:*
    *Recogida:* ${formData.direccionRecogida}, ${formData.barrioRecogida}
    *Entrega:* ${formData.direccionEntrega}, ${formData.barrioEntrega}
    ──────────────────────
    *Categoria del producto:* ${formData.categoriaProducto}
    *Descripcion de productos:* ${formData.descripcionProducto}
    ──────────────────────
    *Fecha y Hora de Domicilio:* ${fechaRegistroFormateada}
    ──────────────────────
    *Precio sugerido:* ${precio != null ? `$${precio.toLocaleString()}` : "No disponible"}
    ──────────────────────
    *Comentarios:* ${formData.comentario}
            `;

     // URL para WhatsApp (ajustar el número y el mensaje)
     const telefono = "+573025887156"; // Número de teléfono del destinatario
     const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

     // Redirigir a WhatsApp para enviar el mensaje
     window.open(urlWhatsApp, '_blank');
                }
                
        
                const response = await fetch(SummaryApi.addDomicilio.url, {
                    method: SummaryApi.addDomicilio.method,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        ...formData, 
                        direccionRecogida: formData.direccionRecogida + ", " + formData.barrioRecogida,
                        direccionEntrega: formData.direccionEntrega + ", " + formData.barrioEntrega,
                        precio: precio // Incluye el precio calculado
                    }) 
                });
        
                const data = await response.json();
                if (data.success) {
                    toast.success(data.message);
                } else if (data.error) {
                    toast.error(data.message);
                }
            } catch (err) {
                toast.error("Error al registrar la orden de mensajería");
            }
        };

    useEffect(() => {
        fetchBarrios();
    }
, []);


    return (
        <section id='registrar-domicilio' className="flex items-center justify-center min-h-screen bg-cover bg-center">
            <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{ margin: '1%', opacity: '0.85' }}>
                <h2 className="text-center font-bold text-xl mb-6">Registrar Pedido de Domicilios</h2>

                <form onSubmit={handleSubmit}>
                    <div className='grid mb-4'>
                        <label className="text-gray-600">Categoría de Productos:</label>
                        <select
                            name="categoriaProducto"
                            value={formData.categoriaProducto}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                        >
                            <option value="">Seleccione una categoría</option>
                            <option value="alimentos">Alimentos</option>
                            <option value="farmacia">Farmacia</option>
                            <option value="supermercado">Supermercado</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Producto:</label>
                        <input
                            type="text"
                            name="descripcionProducto"
                            value={formData.descripcionProducto}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Escribe tus productos aquí"
                        />
                    </div>

                    <datalist id="barrios">
    {barriosFiltrados.map((barrio, index) => (
        <option key={index} value={barrio.nombreBarrio} />
    ))}
</datalist>



                    <div className='grid grid-cols-2 gap-4'>
                    <div>
                            <label className="text-gray-600">Dirección de Recogida:</label>
                            <input
                                type="text"
                                name="direccionRecogida"
                                value={formData.direccionRecogida}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                                placeholder="Calle 123"
                            />
                        </div>
                        <div>
                            <label htmlFor="barrioRecogida" className="text-gray-600">Barrio de Recogida:</label>
                            <input
                                list="barrios"
                                name="barrioRecogida"
                                value={formData.barrioRecogida}
                                onChange={handleChange}
                                className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                                placeholder="Escribe el barrio "
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                    <div>
                            <label className="text-gray-600">Dirección de Entrega:</label>
                            <input
                                type="text"
                                name="direccionEntrega"
                                value={formData.direccionEntrega}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                                placeholder="Cra 123"
                            />
                        </div>
                        <div>
                            <label htmlFor="barrioEntrega" className="text-gray-600">Barrio de Entrega:</label>
                            <input
                                list="barrios"
                                name="barrioEntrega"
                                value={formData.barrioEntrega}
                                onChange={handleChange}
                                className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                                placeholder="Escribe el barrio "
                            />
                        </div>
                    </div>


                    <div className='grid mb-4'>
                        <label className="text-gray-600">Comentarios Adicionales:</label>
                        <textarea
                            name="comentario"
                            value={formData.comentario}
                            onChange={handleChange}
                            rows="3"
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Instrucciones de entrega, etc."
                        ></textarea>
                    </div>

                    <div className="mb-4 text-center">
                                            <button
                                                type="button"
                                                onClick={handleCalcularDistancia}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                                            >
                                                Calcular Distancia
                                            </button>
                                        </div>
                    
                                        {precio && (
                                            <div className="mb-4 text-center">
                                                <p className="text-lg font-semibold">Precio sugerido: ${precio.toLocaleString()}</p>
                                                
                                            </div>
                                        )}

<div className="mb-4 text-center">
                                               
<button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Contactar por WhatsApp
                    </button>
                                            </div>
                                    </form>
                    
                                    <Link to="/historial-domicilios" className="text-blue-500 mt-4">
                                        Historial de pedidos de domicilios
                                    </Link>
                                    
                                </div>
        </section>
    );
};

export default Domicilios;
