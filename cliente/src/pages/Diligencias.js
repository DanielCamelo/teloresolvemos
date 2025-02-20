import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import SummaryApi from "../common";
import { toast } from 'react-toastify';

const Diligencias = () => {
    const [formData, setFormData] = useState({
        descripcionDiligencia: '',
        direccionInvolucrados: '',
        documentosNecesarios: '',
        fechaHoraRecogida: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
              
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
    *Detalles de la Orden de diligencia:*
    
    ──────────────────────
    *Direcciónes:*
    *Direcciones involucradas:* ${formData.direccionInvolucrados}
    ──────────────────────
    *Descripcion diligencia:* ${formData.descripcionDiligencia}
    *Documentos Necesarios:* ${formData.documentosNecesarios}
    ──────────────────────
    *Fecha y Hora de Recogida:* ${fechaHoraFormateada}
            `;
    
            // URL para WhatsApp (ajustar el número y el mensaje)
            const telefono = "+573025887156"; // Número de teléfono del destinatario
            const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
            // Redirigir a WhatsApp para enviar el mensaje
            window.open(urlWhatsApp, '_blank');
    
            // Registrar la orden en la base de datos
            const response = await fetch(SummaryApi.addDiligencias.url, {
                method: SummaryApi.addDiligencias.method,
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
            toast.error("Error al registrar la orden de diligencia.");
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-cover bg-center">
            <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{margin: '1%', opacity: '0.85' }}>
                <h2 className="text-center font-bold text-xl mb-6">Solicitud de Diligencias</h2>

                <form onSubmit={handleSubmit}>
                    <div className='grid mb-4'>
                        <label className="text-gray-600">Descripción de la Diligencia:</label>
                        <select
                            name="descripcionDiligencia"
                            value={formData.descripcionDiligencia}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="pago_servicios">Pago de servicios</option>
                            <option value="compras_especificas">Compras específicas</option>
                            <option value="tramites_administrativos">Trámites administrativos</option>
                            <option value="tramites_bancarios">Trámites bancarios</option>
                            <option value="otros">Otros</option>
                        </select>
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Direcciones Involucradas:</label>
                        <input
                            type="text"
                            name="direccionInvolucrados"
                            value={formData.direccionInvolucrados}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Ejemplo: Calle 123, Avenida 456"
                        />
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Documentación Necesaria:</label>
                        <input
                            type="text"
                            name="documentosNecesarios"
                            value={formData.documentosNecesarios}
                            onChange={handleChange}
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Especificar documentación si es necesaria"
                        />
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Fecha y Hora para Realizar la Diligencia:</label>
                        <input
                            type="datetime-local"
                            name="fechaHoraRecogida"
                            value={formData.fechaHoraRecogida}
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

                <Link to="/historial-diligencias" className="text-blue-500 mt-4">
                                                        Historial de pedidos de diligencias
                                                    </Link>

            </div>
        </section>
    );
};

export default Diligencias;
