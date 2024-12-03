import React, { useState } from 'react';
import { toast } from 'react-toastify';

const TransporteSalud = () => {
    const [formData, setFormData] = useState({
        tipoServicio: 'transporte particular', // Tipo fijo ya que siempre es transporte particular
        direccionRecogida: '',
        direccionDestino: '',
        descripcionAdicional: '',
        fechaHoraRecogida: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Lógica para enviar datos al servidor
        toast.success("Reserva de transporte de salud registrada con éxito!");
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-cover bg-center">
            <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{ margin: '1%', opacity: '0.85' }}>
                <h2 className="text-center font-bold text-xl mb-6">Reserva de Transporte para Salud</h2>

                <form onSubmit={handleSubmit}>
                    <div className='grid mb-4'>
                        <label className="text-gray-600">Dirección de Recogida:</label>
                        <input
                            type="text"
                            name="direccionRecogida"
                            value={formData.direccionRecogida}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Ingrese dirección de recogida"
                        />
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Dirección de Destino (hospital, clínica):</label>
                        <input
                            type="text"
                            name="direccionDestino"
                            value={formData.direccionDestino}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Ingrese dirección de destino"
                        />
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Descripción Adicional:</label>
                        <textarea
                            name="descripcionAdicional"
                            value={formData.descripcionAdicional}
                            onChange={handleChange}
                            rows="3"
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Detalles adicionales"
                        ></textarea>
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

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Registrar Reserva
                    </button>
                </form>
            </div>
        </section>
    );
};

export default TransporteSalud;
