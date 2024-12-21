import React, { useState } from 'react';

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

    const handleWhatsAppRedirect = () => {
        const message = `Hola, me gustaría solicitar una compra intermunicipal.\n\nLista de productos: ${formData.productos}\nUbicación de compra: ${formData.ubicacionCompra}\nDirección de entrega: ${formData.direccionEntrega}\nPresupuesto máximo: ${formData.presupuestoMaximo || 'No especificado'}\nFecha y hora deseada de entrega: ${formData.fechaHoraEntrega}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/573025887156?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-cover bg-center">
            <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{ margin: '1%', opacity: '0.85' }}>
                <h2 className="text-center font-bold text-xl mb-6">Solicitud de Compras Intermunicipales</h2>

                <form onSubmit={(e) => e.preventDefault()}>
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
                        type="button"
                        onClick={handleWhatsAppRedirect}
                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Contactar por WhatsApp
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ComprasIntermunicipales;

