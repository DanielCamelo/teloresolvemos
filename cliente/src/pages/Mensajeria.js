import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';

const Mensajeria = ({ onClose }) => { // Recibe onClose como prop
  const [formData, setFormData] = useState({
    nombreCliente: '',
    nombreRepartidor: '', // Puedes eliminar esto si no lo necesitas
    tipoDePaquete: '',
    pesoEstimado: '',
    dimensiones: {
      largo: '',
      ancho: '',
      alto: '',
    },
    direccionRecogida: '',
    direccionEntrega: '',
    fechaHoraRecogida: '',
  });
  
  const [loading, setLoading] = useState(false); // Define setLoading
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.dimensiones) {
      setFormData((prev) => ({
        ...prev,
        dimensiones: {
          ...prev.dimensiones,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.addMensaje.url, {
        method: SummaryApi.addMensaje.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asegúrate de que el token esté en el localStorage
        },
        body: JSON.stringify(formData),
      });
  
      const dataApi = await response.json();
  
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/"); // Redirige a la página principal o a donde desees
        onClose(); // Cierra el modal
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al registrar la mensajería');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section id='mensajeria' className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{ marginTop: '-10%', opacity: '0.85' }}>
        <h2 className="text-center font-bold text-xl mb-6">Registrar Mensajería</h2>

        <form onSubmit={handleSubmit}>
          <div className='grid mb-4'>
            <label className="text-gray-600">Tipo de Paquete:</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='text'
                name='tipoDePaquete'
                placeholder='Tipo de Paquete'
                value={formData.tipoDePaquete}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>
          <div className='grid mb-4'>
            <label className="text-gray-600">Peso Estimado (kg):</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='number'
                name='pesoEstimado'
                placeholder='Peso Estimado'
                value={formData.pesoEstimado}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>
          <h3 className="text-gray-600 mb-2">Dimensiones (cm)</h3>
          <div className='grid mb-4'>
            <label className="text-gray-600">Largo:</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='number'
                name='largo'
                placeholder='Largo'
                value={formData.dimensiones.largo}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>
          <div className='grid mb-4'>
            <label className="text-gray-600">Ancho:</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='number'
                name='ancho'
                placeholder='Ancho'
                value={formData.dimensiones.ancho}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>
          <div className='grid mb-4'>
            <label className="text-gray-600">Alto:</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='number'
                name='alto'
                placeholder='Alto'
                value={formData.dimensiones.alto}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>
          <div className='grid mb-4'>
            <label className="text-gray-600">Dirección de Recogida:</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='text'
                name='direccionRecogida'
                placeholder='Dirección de Recogida'
                value={formData.direccionRecogida}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>
          <div className='grid mb-4'>
            <label className="text-gray-600">Dirección de Entrega:</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='text'
                name='direccionEntrega'
                placeholder='Dirección de Entrega'
                value={formData.direccionEntrega}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>
          <div className='grid mb-4'>
            <label className="text-gray-600">Fecha y Hora de Recogida:</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='datetime-local'
                name='fechaHoraRecogida'
                value={formData.fechaHoraRecogida}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>
          <button className='bg-red-500 text-white py-2 w-full rounded-full hover:bg-red-600 transition-all mt-4' disabled={loading}>
            {loading ? 'Cargando...' : 'Registrar Mensajería'}
          </button>
        </form>

        <p className='text-center text-gray-600 mt-5'>
          ¿Quieres ver los paquetes registrados? <a href="/ver-mensajeria" className='text-red-500 hover:underline'>Ver Mensajería</a>
        </p>
      </div>
    </section>
  );
};

export default Mensajeria;


