import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import SummaryApi from "../common";
import tipoPaqueteCategoria from "../helpers/tipoPaqueteCategoria";
import pesoPaqueteCategoria from "../helpers/pesoPaqueteCategoria";
import { toast } from 'react-toastify';

const ComprasIntermunicipales = () => {
    const [formData, setFormData] = useState({
        productos: '',
        ubicacionCompra: '',
        direccionEntrega: '',
        presupuestoMaximo: '',
        fechaHoraEntrega: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
              
            // Formatear la fecha y hora de recogida de manera más legible
            const fechaHoraFormateada = new Date(formData.fechaHoraEntrega).toLocaleString('es-CO', {
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
    *Detalles de la Orden de compra intermunicipal:*
    
    ──────────────────────
    *Productos:* ${formData.productos}
    *Presupuesto Maximo:* ${formData.presupuestoMaximo}
    ──────────────────────
    *Direcciónes:*
    *ubicacion de Compras:* ${formData.ubicacionCompra}
    *Entrega:* ${formData.direccionEntrega}
    ──────────────────────
    *Fecha y Hora de Recogida:* ${fechaHoraFormateada}
            `;
    
            // URL para WhatsApp (ajustar el número y el mensaje)
            const telefono = "+573025887156"; // Número de teléfono del destinatario
            const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
            // Redirigir a WhatsApp para enviar el mensaje
            window.open(urlWhatsApp, '_blank');
    
            // Registrar la orden en la base de datos
            const response = await fetch(SummaryApi.addComprasIntermunicipales.url, {
                method: SummaryApi.addComprasIntermunicipales.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    ...formData, 
                }) 
            });
    
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
            } else if (data.error) {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Error al registrar la orden de compra intermunicipal.");
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-cover bg-center">
            <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{ margin: '1%', opacity: '0.85' }}>
                <h2 className="text-center font-bold text-xl mb-6">Solicitud de Compras Intermunicipales</h2>

                <form onSubmit={handleSubmit}>
                    <div className='grid mb-4'>
                        <label className="text-gray-600">Lista de Productos o Artículos:</label>
                        <textarea
                            name="productos"
                            value={formData.productos}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Detalle los productos o artículos requeridos"
                        />
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Ubicación de Compra:</label>
                        <input
                            type="text"
                            name="ubicacionCompra"
                            value={formData.ubicacionCompra}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Ciudad o municipio donde se realizarán las compras"
                        />
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Dirección de Entrega:</label>
                        <input
                            type="text"
                            name="direccionEntrega"
                            value={formData.direccionEntrega}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Ingrese la dirección de entrega"
                        />
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Presupuesto Máximo (Opcional):</label>
                        <input
                            type="number"
                            name="presupuestoMaximo"
                            value={formData.presupuestoMaximo}
                            onChange={handleChange}
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Ingrese el presupuesto máximo"
                        />
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Fecha y Hora Deseada de Entrega:</label>
                        <input
                            type="datetime-local"
                            name="fechaHoraEntrega"
                            value={formData.fechaHoraEntrega}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Contactar por WhatsApp
                    </button>
                </form>
                <Link to="/historial-ComprasIntermunicipales" className="text-blue-500 mt-4">
                                    Historial de órdenes de compras intermunicipales
                                </Link>
            </div>
        </section>
    );
};

export default ComprasIntermunicipales;