import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import SummaryApi from "../common";
import tipoPaqueteCategoria from "../helpers/tipoPaqueteCategoria";
import pesoPaqueteCategoria from "../helpers/pesoPaqueteCategoria";
import { toast } from 'react-toastify';

const RegistrarMensajeria = () => {
    const [formData, setFormData] = useState({
        tipoDePaquete: '',
        pesoEstimado: '',
        direccionRecogida: '',
        direccionEntrega: '',
        fechaHoraRecogida: ''
    });

    const [sugerenciasRecogida, setSugerenciasRecogida] = useState([]);
    const [sugerenciasEntrega, setSugerenciasEntrega] = useState([]);
    const [distancia, setDistancia] = useState(null); // Nuevo estado para la distancia
    const [precio, setPrecio] = useState(null); // Nuevo estado para el precio}
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

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
        const fechaHoraRecogida = new Date(formData.fechaHoraRecogida);
        const horaRecogida = fechaHoraRecogida.getHours();
        let tarifaBase = 1000; // Tarifa base por kilómetro
        let tarifaNocturna = 0;
    
        // Tarifas nocturnas de 9:00 p.m. a 6:00 a.m.
        if (horaRecogida >= 21 || horaRecogida < 6) {
            toast.info("Se aplicará una tarifa nocturna.");
            tarifaNocturna = 500;
        }
    
        // Calcular el precio base
        let precioCalculado = (distanciaCalculada * tarifaBase) + tarifaNocturna;
    
        // Ajustar según los rangos
if (precioCalculado <= 2000) {
    precioCalculado = 2000; // Tarifa mínima
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
        
        // Validar que la fecha y hora de recogida no estén en el pasado
        const fechaHoraRecogida = new Date(formData.fechaHoraRecogida);
        const ahora = new Date();
    
        if (fechaHoraRecogida < ahora) {
            toast.error("La fecha y hora de recogida no pueden estar en el pasado.");
            return;
        }
    
        try {
            const origen = await validarDireccion(formData.direccionRecogida);
            const destino = await validarDireccion(formData.direccionEntrega);
    
            if (!origen || !destino) {
                toast.error("Una o ambas direcciones no son válidas.");
                return;
            }
    
            // Formatear la fecha y hora de recogida de manera más legible
            const fechaHoraFormateada = new Date(formData.fechaHoraRecogida).toLocaleString('es-CO', {
                weekday: 'long', // Día de la semana (opcional)
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true, // Usar formato de 12 horas (AM/PM)
            });
    
            // Crear el mensaje para WhatsApp con un formato más claro
            const mensaje = `
    *Detalles de la Orden de Mensajería:*
    
    ──────────────────────
    *Tipo de Paquete:* ${formData.tipoDePaquete}
    *Peso Estimado:* ${formData.pesoEstimado} kg
    ──────────────────────
    *Direcciónes:*
    *Recogida:* ${formData.direccionRecogida}
    *Entrega:* ${formData.direccionEntrega}
    ──────────────────────
    *Fecha y Hora de Recogida:* ${fechaHoraFormateada}
    ──────────────────────
    *Distancia Estimada:* ${distancia} km
    ──────────────────────
    *Precio sugerido:* $${precio.toLocaleString()}
            `;
    
            // URL para WhatsApp (ajustar el número y el mensaje)
            const telefono = "+573178925603"; // Número de teléfono del destinatario
            const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
            // Redirigir a WhatsApp para enviar el mensaje
            window.open(urlWhatsApp, '_blank');
    
            // Registrar la orden en la base de datos
            const response = await fetch(SummaryApi.addMensaje.url, {
                method: SummaryApi.addMensaje.method,
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
        <section id='registrar-mensajeria' className="flex items-center justify-center min-h-screen bg-cover bg-center">
            <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{ margin: '1%', opacity: '0.85' }}>
                <h2 className="text-center font-bold text-xl mb-6">Registrar Orden de Mensajería</h2>

                <form onSubmit={handleSubmit}>
                    <div className='grid mb-4'>
                        <label className="text-gray-600">Tipo de Paquete:</label>
                        <div className='bg-gray-100 p-3 rounded-lg'>
                            <select
                                name="tipoDePaquete"
                                value={formData.tipoDePaquete}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent outline-none"
                            >
                                <option value="">Seleccione una categoría</option>
                                {tipoPaqueteCategoria.map((categoria) => (
                                    <option key={categoria.id} value={categoria.value}>
                                        {categoria.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Peso Estimado (kg):</label>
                        <div className='bg-gray-100 p-3 rounded-lg'>
                            <select
                                name="pesoEstimado"
                                value={formData.pesoEstimado}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent outline-none"
                            >
                                <option value="">Seleccione un peso</option>
                                {pesoPaqueteCategoria.map((peso) => (
                                    <option key={peso.id} value={peso.value}>
                                        {peso.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Dirección de Recogida:</label>
                        <div className='bg-gray-100 p-3 rounded-lg'>
                            <input
                                type="text"
                                name="direccionRecogida"
                                value={formData.direccionRecogida}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent outline-none"
                                placeholder="Calle 123"
                            />
                            {sugerenciasRecogida.length > 0 && (
                                <ul className="absolute z-10 bg-white border border-gray-300">
                                    {sugerenciasRecogida.map((sugerencia) => (
                                        <li
                                            key={sugerencia.place_id}
                                            onClick={() => seleccionarSugerencia(sugerencia.display_name, "direccionRecogida")}
                                            className="p-2 hover:bg-gray-200 cursor-pointer"
                                        >
                                            {sugerencia.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Dirección de Entrega:</label>
                        <div className='bg-gray-100 p-3 rounded-lg'>
                            <input
                                type="text"
                                name="direccionEntrega"
                                value={formData.direccionEntrega}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent outline-none"
                                placeholder="Avenida 456"
                            />
                            {sugerenciasEntrega.length > 0 && (
                                <ul className="absolute z-10 bg-white border border-gray-300">
                                    {sugerenciasEntrega.map((sugerencia) => (
                                        <li
                                            key={sugerencia.place_id}
                                            onClick={() => seleccionarSugerencia(sugerencia.display_name, "direccionEntrega")}
                                            className="p-2 hover:bg-gray-200 cursor-pointer"
                                        >
                                            {sugerencia.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Fecha y Hora de Recogida:</label>
                        <input
                            type="datetime-local"
                            name="fechaHoraRecogida"
                            value={formData.fechaHoraRecogida}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                        />
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

                <Link to="/historial-mensajeria" className="text-blue-500 mt-4">
                    Historial de órdenes de mensajería
                </Link>
                
            </div>
        </section>
    );
};

export default RegistrarMensajeria;

