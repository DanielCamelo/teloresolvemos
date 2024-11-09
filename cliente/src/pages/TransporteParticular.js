import React, { useState } from 'react';
import { toast } from 'react-toastify';

const TransporteParticular = () => {
    const [formData, setFormData] = useState({
        tipoVehiculo: '',
        numPasajeros: '',
        direccionRecogida: '',
        direccionDestino: '',
        opcionViaje: '',
        fechaHoraRecogida: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí deberías integrar la lógica para enviar esta información al servidor
        toast.success("Reserva de transporte registrada con éxito!");
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-cover bg-center">
            <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{ marginTop: '-10%', opacity: '0.85' }}>
                <h2 className="text-center font-bold text-xl mb-6">Reserva de Transporte Particular</h2>

                <form onSubmit={handleSubmit}>
                    <div className='grid mb-4'>
                        <label className="text-gray-600">Tipo de Vehículo:</label>
                        <select
                            name="tipoVehiculo"
                            value={formData.tipoVehiculo}
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
                        <input
                            type="number"
                            name="numPasajeros"
                            value={formData.numPasajeros}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Ejemplo: 3"
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
                            <label className="text-gray-600">Dirección de Destino:</label>
                            <input
                                type="text"
                                name="direccionDestino"
                                value={formData.direccionDestino}
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
                            name="opcionViaje"
                            value={formData.opcionViaje}
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

export default TransporteParticular;
