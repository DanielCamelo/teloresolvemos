import React, { useContext, useState } from 'react';
import { IoEyeSharp, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from "../common";
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section id='login' className="flex items-center justify-center min-h-screen bg-cover bg-center" >
      <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{ marginTop: '-10%', opacity: '0.85' }}>
        <h2 className="text-center font-bold text-xl mb-6">Bienvenido a te lo resolvemos</h2>
        
        {/* Botones de Iniciar Sesión y Registrarse en la misma fila */}
        <div className="flex mb-6 bg-gray-200 rounded-full">
          <button 
          className="text-white bg-green-500 py-2 px-4 rounded-full w-1/2 border-2 border-white"
            
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </button>
          <button 
          className="text-gray-500 bg-gray-200 py-2 px-4 rounded-full w-1/2"            
            onClick={() => navigate("/sign-up")}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='grid mb-4'>
            <label className="text-gray-600">Correo :</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='email'
                placeholder='Enter your email'
                name='email'
                value={data.email}
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
                placeholder='Enter your password'
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
            <Link to={'/forgot-password'} className='text-right text-gray-500 hover:underline block mt-2'>¿Has olvidado tu contraseña?</Link>
          </div>
          <button className='bg-green-500 text-white py-2 w-full rounded-full hover:bg-green-600 transition-all mt-4'>Iniciar Sesión</button>
        </form>
        
        <p className='text-center text-gray-600 mt-5'>
        ¿No tienes una cuenta? <Link to={"/sign-up"} className='text-green-500 hover:underline'>Registrate</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
