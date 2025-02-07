import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import SummaryApi from "../common";
import { toast } from 'react-toastify';


const TransporteSalud = () => {
    const [formData, setFormData] = useState({
        tipoDeVehiculo: '',
        NumeroPasajeros: '',
        direccionRecogida: '',
        direccionEntrega: '',
        opcionDeViaje: '',
        fechaHoraRecogida: '',
        precio: null
    });

        const [distancia, setDistancia] = useState(null); // Nuevo estado para la distancia
        const [precio, setPrecio] = useState(null); // Nuevo estado para el precio

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
    
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
                
            try {

                const fechaRegistro = new Date(formData.fechaHoraRecogida);
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
                    *Detalles de la Orden de Transporte de Salud*
                    
                    ──────────────────────
                    *Tipo de vehiculo:* ${formData.tipoDeVehiculo}
                    *Numeros de pasajeros:* ${formData.NumeroPasajeros}
                    ──────────────────────
                    *Direcciónes:*
                    *Recogida:* ${formData.direccionRecogida}
                    *Entrega:* ${formData.direccionEntrega}
                    ──────────────────────
                    *Fecha y Hora de recogida:* ${fechaRegistroFormateada}
                    ──────────────────────
                    *Opcion de Viaje:* ${formData.opcionDeViaje}
                            `;
                
                     // URL para WhatsApp (ajustar el número y el mensaje)
                     const telefono = "+573025887156"; // Número de teléfono del destinatario
                     const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
                
                     // Redirigir a WhatsApp para enviar el mensaje
                     window.open(urlWhatsApp, '_blank');
        
                const response = await fetch(SummaryApi.addTransporteSalud.url, {
                    method: SummaryApi.addTransporteSalud.method,
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
                toast.error("Error al registrar la orden de transporte de salud");
            }
        };


    return (
        <section className="flex items-center justify-center min-h-screen bg-cover bg-center">
            <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{ margin: '1%', opacity: '0.85' }}>
                <h2 className="text-center font-bold text-xl mb-6">Reserva de Transporte de Salud</h2>

                <form onSubmit={handleSubmit}>
                    <div className='grid mb-4'>
                        <label className="text-gray-600">Tipo de Vehículo:</label>
                        <select
                            name="tipoDeVehiculo"
                            value={formData.tipoDeVehiculo}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                        >
                            <option value="">Seleccione un tipo de vehículo</option>
                            <option value="carro">Carro</option>
                            <option value="moto">Moto</option>
                            <option value="van">Van</option>
                        </select>
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Número de Pasajeros:</label>
                        <select
                            name="NumeroPasajeros"
                            value={formData.NumeroPasajeros}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                        >
                            <option value="">Seleccione el número de pasajeros</option>
                            {[...Array(6).keys()].map(i => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
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
                            <label className="text-gray-600">Dirección de clinica:</label>
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
                        <label className="text-gray-600">Opción de Viaje:</label>
                        <select
                            name="opcionDeViaje"
                            value={formData.opcionDeViaje}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                        >
                            <option value="">Seleccione una opción de viaje</option>
                            <option value="solo_ida">Solo Ida</option>
                            <option value="ida_y_vuelta">Ida y Vuelta</option>
                        </select>
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
                                   type="submit"
                                 className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                                     >
                                      Registrar Orden
                                     </button>
                                     </div>
                                     </form>
                                        
                                     <Link to="/historial-TransporteSalud" className="text-blue-500 mt-4">
                                    Historial de pedidos de transporte salud
                                     </Link>
  </div>
                            </section>
    );
};

export default TransporteSalud;
