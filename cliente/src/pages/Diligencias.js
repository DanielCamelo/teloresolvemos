import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Diligencias = () => {
    const [formData, setFormData] = useState({
        descripcionDiligencia: '',
        direccionesInvolucradas: '',
        documentacionNecesaria: '',
        fechaHora: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí deberías integrar la lógica para enviar esta información al servidor
        toast.success("Solicitud de diligencia registrada con éxito!");
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
                            name="direccionesInvolucradas"
                            value={formData.direccionesInvolucradas}
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
                            name="documentacionNecesaria"
                            value={formData.documentacionNecesaria}
                            onChange={handleChange}
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Especificar documentación si es necesaria"
                        />
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Fecha y Hora para Realizar la Diligencia:</label>
                        <input
                            type="datetime-local"
                            name="fechaHora"
                            value={formData.fechaHora}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Enviar Solicitud
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Diligencias;
