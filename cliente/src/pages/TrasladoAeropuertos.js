import React, { useState } from 'react';
import { toast } from 'react-toastify';

const TrasladoAeropuertos = () => {
    const [formData, setFormData] = useState({
        numPasajeros: '',
        tipoVehiculo: '',
        cantidadEquipaje: '',
        direccionRecogida: '',
        terminalAeropuerto: '',
        horaSalidaVuelo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí deberías integrar la lógica para enviar esta información al servidor
        toast.success("Reserva de traslado al aeropuerto registrada con éxito!");
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-cover bg-center">
            <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{ margin: '1%', opacity: '0.85' }}>
                <h2 className="text-center font-bold text-xl mb-6">Reserva de Traslado a Aeropuertos</h2>

                <form onSubmit={handleSubmit}>
                    <div className='grid mb-4'>
                        <label className="text-gray-600">Número de Pasajeros:</label>
                        <input
                            type="number"
                            name="numPasajeros"
                            value={formData.numPasajeros}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                        />
                    </div>

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
                            <option value="van">Van</option>
                            <option value="moto">Moto</option>
                        </select>
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Cantidad de Equipaje:</label>
                        <input
                            type="number"
                            name="cantidadEquipaje"
                            value={formData.cantidadEquipaje}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                        />
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Dirección de Recogida:</label>
                        <input
                            type="text"
                            name="direccionRecogida"
                            value={formData.direccionRecogida}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Ingrese la dirección de recogida"
                        />
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Terminal de Aeropuerto:</label>
                        <input
                            type="text"
                            name="terminalAeropuerto"
                            value={formData.terminalAeropuerto}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Especifique la terminal"
                        />
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Hora de Salida del Vuelo:</label>
                        <input
                            type="time"
                            name="horaSalidaVuelo"
                            value={formData.horaSalidaVuelo}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Registrar Traslado
                    </button>
                </form>
            </div>
        </section>
    );
};

export default TrasladoAeropuertos;
