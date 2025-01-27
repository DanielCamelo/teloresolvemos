import React, { useState } from 'react';
import { IoEyeSharp, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from "../common";
const RegistrarRepartidor = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar que las contraseñas coincidan
    if (data.password !== data.confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }
    const dataResponse = await fetch(SummaryApi.registrarRepartidor.url, {
      method: SummaryApi.registrarRepartidor.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: data.phone,
        password: data.password,
        role: 'repartidor', // Definir el rol como "repartidor"
      })
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/"); 
      window.location.reload();// Redirigir a la página de login después de registrar
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
      navigate("/login");
    }
  };
  return (
    <section id='register-repartidor' className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{margin: '1%', opacity: '0.85' }}>
        <h2 className="text-center font-bold text-xl mb-6">Registrarse como Domiciliario</h2>
        <form onSubmit={handleSubmit}>
          <div className='grid mb-4'>
            <label className="text-gray-600">Telefono:</label>
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
          <div className="mb-4">
            <label className="text-gray-600">Contraseña :</label>
            <div className='bg-gray-100 p-3 rounded-lg flex items-center'>
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Ingresa tu contraseña'
                name='password'
                value={data.password}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
              <div className='cursor-pointer ml-2 text-gray-500' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeSharp /> : <IoEyeOff />}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-gray-600">Confirmar Contraseña :</label>
            <div className='bg-gray-100 p-3 rounded-lg flex items-center'>
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Confirma tu contraseña'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
              <div className='cursor-pointer ml-2 text-gray-500' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeSharp /> : <IoEyeOff />}
              </div>
            </div>
          </div>
          <button className='bg-green-500 text-white py-2 w-full rounded-full hover:bg-green-600 transition-all mt-4'>Registrarse</button>
        </form>
      </div>
    </section>
  );
};
export default RegistrarRepartidor;