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

    const calcularDistancia = async (origen, destino) => {
        const url = `https://router.project-osrm.org/route/v1/driving/${origen.lng},${origen.lat};${destino.lng},${destino.lat}?overview=false`;
        try {
            const response = await axios.get(url);
            if (response.data.routes.length > 0) {
                return response.data.routes[0].distance; // Devuelve la distancia en metros
            }
            return null;
        } catch (error) {
            console.error("Error al calcular la distancia:", error);
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
        setDistancia(distanciaCalculada); // Actualiza el estado de la distancia

        // Calcular el precio (1000 pesos por km)
        const precioCalculado = distanciaCalculada * 1000;
        setPrecio(precioCalculado); // Actualiza el estado del precio
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
                            <p className="text-lg font-semibold">Distancia: {distancia} km</p>
                            <p className="text-lg font-semibold">Precio: ${precio.toLocaleString()}</p>
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

