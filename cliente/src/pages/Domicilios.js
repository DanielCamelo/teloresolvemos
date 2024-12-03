import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Domicilios = () => {
    const [formData, setFormData] = useState({
        categoriaProducto: '',
        producto: '',
        direccionRecogida: '',
        direccionEntrega: '',
        opcionPago: '',
        comentarios: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica para enviar el formulario al servidor
        toast.success("Pedido de domicilio registrado con éxito!");
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-cover bg-center">
            <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{ margin: '1%', opacity: '0.85' }}>
                <h2 className="text-center font-bold text-xl mb-6">Registrar Pedido de Domicilios</h2>

                <form onSubmit={handleSubmit}>
                    <div className='grid mb-4'>
                        <label className="text-gray-600">Categoría de Productos:</label>
                        <select
                            name="categoriaProducto"
                            value={formData.categoriaProducto}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                        >
                            <option value="">Seleccione una categoría</option>
                            <option value="alimentos">Alimentos</option>
                            <option value="farmacia">Farmacia</option>
                            <option value="supermercado">Supermercado</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Producto:</label>
                        <input
                            type="text"
                            name="producto"
                            value={formData.producto}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Escribe para buscar el producto"
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
                            <label className="text-gray-600">Dirección de Entrega:</label>
                            <input
                                type="text"
                                name="direccionEntrega"
                                value={formData.direccionEntrega}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray

                                100 p-3 rounded-lg outline-none"
                                placeholder="Avenida 456"
                            />
                        </div>
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Opción de Pago:</label>
                        <select
                            name="opcionPago"
                            value={formData.opcionPago}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="en_linea">En Línea</option>
                            <option value="contra_entrega">Contra Entrega</option>
                        </select>
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Comentarios Adicionales:</label>
                        <textarea
                            name="comentarios"
                            value={formData.comentarios}
                            onChange={handleChange}
                            rows="3"
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                            placeholder="Instrucciones de entrega, etc."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Registrar
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Domicilios;
