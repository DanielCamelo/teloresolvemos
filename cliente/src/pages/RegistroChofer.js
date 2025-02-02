import React, { useState } from 'react';
import { IoEyeSharp, IoEyeOff } from "react-icons/io5";

const RegistrarChofer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: '',
    age: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hola, me gustaría registrarme como chofer. Mis datos son:%0A
      - Nombre: ${data.name}%0A
      - Edad: ${data.age}%0A
      - Teléfono: ${data.phone}%0A
      - Correo: ${data.email}`;
    
    const whatsappUrl = `https://wa.me/3178925603?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id='register-repartidor' className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{ margin: '1%', opacity: '0.85' }}>
        <h2 className="text-center font-bold text-xl mb-6">Registrarse como Transportador</h2>
        <form onSubmit={handleSubmit}>
          <div className='grid mb-4'>
            <label className="text-gray-600">Nombre:</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='text'
                placeholder='Ingresa tu nombre'
                name='name'
                value={data.name}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>
          <div className='grid mb-4'>
            <label className="text-gray-600">Edad:</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='number'
                placeholder='Ingresa tu edad'
                name='age'
                value={data.age}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>
          <div className='grid mb-4'>
            <label className="text-gray-600">Teléfono:</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='phone'
                placeholder='Ingresa tu número de teléfono'
                name='phone'
                value={data.phone}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>
          <div className='grid mb-4'>
            <label className="text-gray-600">Correo:</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='email'
                placeholder='Ingresa tu correo electrónico'
                name='email'
                value={data.email}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>
          <button className='bg-green-500 text-white py-2 w-full rounded-full hover:bg-green-600 transition-all mt-4'>Enviar a WhatsApp</button>
        </form>
      </div>
    </section>
  );
};

export default RegistrarChofer;