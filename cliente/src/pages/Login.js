import React, { useContext, useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
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
    <section id='login' className="flex items-center justify-center min-h-screen mx-auto">
  <div className='bg-white p-2 py-5 w-full max-w-md mx-auto rounded-3xl border-2 border-green-600' style={{ marginTop: '-50%', opacity: '0.8' }}>
    <form className='pt-6' onSubmit={handleSubmit}>
      <div className='grid'>
        <label>Correo :</label>
        <div className='bg-slate-100 p-2'>
          <input
            type='email'
            placeholder='Escribe tu correo'
            name='email'
            value={data.email}
            onChange={handleChange}
            required
            className='w-full h-full outline-none bg-transparent'
          />
        </div>
      </div>

      <div>
        <label>Contraseña :</label>
        <div className='bg-slate-100 p-2 flex'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Escribe tu contraseña'
            value={data.password}
            name='password'
            onChange={handleChange}
            required
            className='w-full h-full outline-none bg-transparent'
          />
          <div className='cursor-pointer text-green-600'>
            <span>
              {showPassword ? (
                <IoEyeSharp onClick={() => setShowPassword(false)} />
              ) : (
                <IoEyeOff onClick={() => setShowPassword(true)} />
              )}
            </span>
          </div>
        </div>
        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-green-600 text-right'>
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <button className='bg-green-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
        Iniciar Sesion
      </button>
    </form>
    <p className='my-5'>
      ¿No tienes cuenta? <Link to={"/sign-up"} className='text-green-600 hover:text-green-700 hover:underline'>Registrate</Link>
    </p>
  </div>
</section>

  );
};

export default Login;
