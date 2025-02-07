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
        comentario: ''
    });

    const [sugerenciasRecogida, setSugerenciasRecogida] = useState([]);
        const [sugerenciasEntrega, setSugerenciasEntrega] = useState([]);
        const [distancia, setDistancia] = useState(null); // Nuevo estado para la distancia
        const [precio, setPrecio] = useState(null); // Nuevo estado para el precio

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
    
            if (name === "direccionRecogida") {
                obtenerSugerencias(value, setSugerenciasRecogida);
            } else if (name === "direccionEntrega") {
                obtenerSugerencias(value, setSugerenciasEntrega);
            }
        };


        const obtenerSugerencias = async (direccion, setSugerencias) => {
            if (!direccion) {
                setSugerencias([]);
                return;
            }
    
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion + ", Tuluá, Valle del Cauca, Colombia")}&bounded=1&viewbox=-76.2080,-4.0725,-76.1740,-4.0500`;
            try {
                const response = await axios.get(url);
                setSugerencias(response.data);
            } catch (error) {
                console.error("Error al obtener sugerencias:", error);
                setSugerencias([]);
            }
        };

        const seleccionarSugerencia = (direccion, setSugerencias) => {
            setFormData({ ...formData, [setSugerencias]: direccion });
            setSugerencias([]);
        };

        const validarDireccion = async (direccion) => {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion + ", Tuluá, Valle del Cauca, Colombia")}`;
            try {
                const response = await axios.get(url);
                return response.data.length > 0 ? { lat: response.data[0].lat, lng: response.data[0].lon } : null;
            } catch (error) {
                console.error("Error al validar la dirección:", error);
                return null;
            }
        };

        const calcularDistancia = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/distance', {
                    params: {
                        origins: formData.direccionRecogida + ", Tuluá, Valle del Cauca, Colombia",
                        destinations: formData.direccionEntrega +  ", Tuluá, Valle del Cauca, Colombia",
                    },
                    withCredentials: true, // Si es necesario para cookies
                });
        
                console.log('Respuesta de la API:', response.data);
        
                if (
                    response.data.rows &&
                    response.data.rows.length > 0 &&
                    response.data.rows[0].elements &&
                    response.data.rows[0].elements.length > 0
                ) {
                    const distancia = response.data.rows[0].elements[0].distance.value; // Distancia en metros
                    const duracion = response.data.rows[0].elements[0].duration.text; // Duración como texto
                    console.log(`Distancia: ${distancia} metros`);
                    console.log(`Duración estimada: ${duracion}`);
                    return distancia;
                } else {
                    console.warn('No se encontraron datos de distancia.');
                    return null;
                }
                
            } catch (error) {
                console.error('Error al calcular la distancia:', error.response?.data || error.message);
                return null;
            }
        };

        const handleCalcularDistancia = async () => {
            const origen = await validarDireccion(formData.direccionRecogida);
            const destino = await validarDireccion(formData.direccionEntrega);
        
            if (!origen || !destino) {
                toast.error("Una o ambas direcciones no son válidas.");
                return;
            }
        
            const distanciaEnMetros = await calcularDistancia(origen, destino);
            if (!distanciaEnMetros) {
                toast.error("No se pudo calcular la distancia entre las direcciones.");
                return;
            }
        
            const distanciaCalculada = (distanciaEnMetros / 1000).toFixed(2); // Convertir a kilómetros
            setDistancia(distanciaCalculada);
        
            // Lógica de precios según la hora
            const fechaHoraActual = new Date();  // Fecha y hora actual
            const horaActual = fechaHoraActual.getHours();
            let tarifaBase = 1000; // Tarifa base por kilómetro
            let tarifaNocturna = 0;
        
            // Tarifas nocturnas de 9:00 p.m. a 6:00 a.m.
            if (horaActual >= 21 || horaActual < 6) {
                toast.info("Se aplicará una tarifa nocturna.");
                tarifaNocturna = 500;
            }
        
            // Calcular el precio base
            let precioCalculado = (distanciaCalculada * tarifaBase) + tarifaNocturna;
        
            // Ajustar según los rangos
            if (precioCalculado <= 3500) {
                precioCalculado = 3500; // Tarifa mínima
            } else {
                // Incrementos posteriores
                const division = precioCalculado / 500;
                const decimal = division - Math.floor(division);
            
                if (decimal < 0.5) {
                    precioCalculado = Math.floor(division) * 500; // Usar piso si el decimal es menor a 0.5
                } else {
                    precioCalculado = Math.ceil(division) * 500; // Usar techo si el decimal es mayor o igual a 0.5
                }
            }
        
            setPrecio(precioCalculado); // Formatear el precio final con dos decimales
        };
        

        const handleSubmit = async (e) => {
            e.preventDefault();
                
            try {
                const origen = await validarDireccion(formData.direccionRecogida);
                const destino = await validarDireccion(formData.direccionEntrega);
        
                if (!origen || !destino) {
                    toast.error("Una o ambas direcciones no son válidas.");
                    return;
                }
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
    *Categoria del producto:* ${formData.categoriaProducto}
    *Descripcion de productos:* ${formData.descripcionProducto}
    ──────────────────────
    *Direcciónes:*
    *Recogida:* ${formData.direccionRecogida}
    *Entrega:* ${formData.direccionEntrega}
    ──────────────────────
    *Fecha y Hora de Domicilio:* ${fechaRegistroFormateada}
    ──────────────────────
    *Distancia Estimada:* ${distancia} km
    ──────────────────────
    *Metodo de pago:* ${formData.opcionPago}
    *Precio sugerido:* $${precio.toLocaleString()}
    ──────────────────────
    *Comentarios:* ${formData.comentario}
            `;

     // URL para WhatsApp (ajustar el número y el mensaje)
     const telefono = "+573025887156"; // Número de teléfono del destinatario
     const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

     // Redirigir a WhatsApp para enviar el mensaje
     window.open(urlWhatsApp, '_blank');
        
                const response = await fetch(SummaryApi.addDomicilio.url, {
                    method: SummaryApi.addDomicilio.method,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        ...formData, 
                        distancia: distancia,
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
                            <label className="text-gray-600">Dirección de Entrega:</label>
                            <input
                                type="text"
                                name="direccionEntrega"
                                value={formData.direccionEntrega}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                                placeholder="Avenida 456"
                            />
                        </div>
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Opción de Pago:</label>
                        <select
                            name="opcionPago"
                            value={formData.opcionPago}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="en_linea">En Línea</option>
                            <option value="contra_entrega">Contra Entrega</option>
                        </select>
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
                    
                                        {distancia && precio && (
                                            <div className="mb-4 text-center">
                                                <p className="text-lg font-semibold">Precio sugerido: ${precio.toLocaleString()}</p>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                                                >
                                                    Registrar Orden
                                                </button>
                                            </div>
                                        )}
                                    </form>
                    
                                    <Link to="/historial-domicilios" className="text-blue-500 mt-4">
                                        Historial de pedidos de domicilios
                                    </Link>
                                    
                                </div>
        </section>
    );
};

export default Domicilios;
