import React, { useState } from 'react';
import { IoEyeSharp, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from "../common";
import { toast } from 'react-toastify';
import axios from 'axios';
import VerificationCodePopup from '../components/VerificationCodePopup';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    phone: '',
  });

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si todos los campos están llenos
    if (!data.name || !data.email || !data.password || !data.phone) {
      toast.error("Por favor, complete todos los campos requeridos");
      return;
    }

    // Validar el formato del correo electrónico
    if (!data.email.includes('@')) {
      toast.error("Por favor, introduce un correo electrónico válido.");
      return;
    }

    if (isCodeSent) {
      setIsPopupOpen(true); // Abre el popup para ingresar el código
    } else {
      try {
        // Validar si el correo es temporal o desechable
        const emailValidationResponse = await axios.get(`https://open.kickbox.com/v1/disposable/${data.email}`);
        const emailValidationResult = emailValidationResponse.data;

        if (emailValidationResult.disposable) {
          toast.error("El correo es temporal o desechable. Por favor usa un correo válido.");
          return;
        }

        // Enviar el código de verificación
        const codeResponse = await fetch(SummaryApi.sendVerificationCode.url, {
          method: SummaryApi.sendVerificationCode.method,
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email, name: data.name, phone: data.phone, password: data.password }),
        });

        const codeApi = await codeResponse.json();

        if (codeApi.success) {
          toast.success("Código de verificación enviado a tu correo.");
          setIsCodeSent(true);
        } else {
          toast.error(codeApi.message);
        }
      } catch (error) {
        console.error("Error enviando el código:", error);
        toast.error("Error al enviar el código de verificación");
      }
    }
  };

  const handleVerifyCode = async (verificationCode) => {
    // Lógica para verificar el código
    try {
      const response = await fetch(SummaryApi.verifyCode.url, {
        method: SummaryApi.verifyCode.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, verificationCode, name: data.name, phone: data.phone, password: data.password }),
      });

      const result = await response.json();
      if (response.ok) {
        // Registrar el nuevo usuario
        const newUserData = { name: data.name, email: data.email, password: data.password, phone: data.phone };

        const dataResponse = await fetch(SummaryApi.signUP.url, {
          method: SummaryApi.signUP.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUserData),
        });

        const dataApi = await dataResponse.json();
        if (dataApi.success) {
          toast.success(dataApi.message);
          navigate('/login');
        } else {
          toast.error(dataApi.message);
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error verificando el código:", error);
      toast.error("Error al verificar el código");
    } finally {
      setIsPopupOpen(false); // Cierra el popup
    }
  };

  return (
    <section id='sign-up' className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{ marginTop: '-10%', opacity: '0.9' }}>
        <h2 className="text-center font-bold text-xl mb-6">Regístrate en Te lo resolvemos</h2>
                {/* Botones de Iniciar Sesión y Registrarse en la misma fila */}
                <div className="flex mb-6 bg-gray-200 rounded-full mt-4">
          <button 
          className=" text-gray-500 bg-gray-200 py-2 px-4 rounded-full w-1/2"
            
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </button>
          <button 
          className="text-white bg-green-500 py-2 px-4 rounded-full w-1/2 border-2 border-white"            
            onClick={() => navigate("/sign-up")}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='grid mb-4'>
            <label className="text-gray-600">Nombre :</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='text'
                placeholder='Escribe tu nombre'
                name='name'
                value={data.name}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>

          <div className='grid mb-4'>
            <label className="text-gray-600">Correo :</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='email'
                placeholder='Escribe tu correo'
                name='email'
                value={data.email}
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
            </div>
          </div>

          <div className='grid mb-4'>
            <label className="text-gray-600">Teléfono :</label>
            <div className='bg-gray-100 p-3 rounded-lg'>
              <input
                type='tel'
                placeholder='Escribe tu teléfono'
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
                placeholder='Escribe tu contraseña'
                value={data.password}
                name='password'
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
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Confirma tu contraseña'
                value={data.confirmPassword}
                name='confirmPassword'
                onChange={handleChange}
                required
                className='w-full bg-transparent outline-none'
              />
              <div className='cursor-pointer ml-2 text-gray-500' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <IoEyeSharp /> : <IoEyeOff />}
              </div>
            </div>
          </div>

          <button type='submit' className='bg-green-500 text-white py-2 w-full rounded-full hover:bg-green-600 transition-all mt-4'>
            {isCodeSent ? 'Abrir Código' : 'Enviar Código'}
          </button>
        </form>

        {/* Componente de Popup para el código de verificación */}
        <VerificationCodePopup 
          isOpen={isPopupOpen} 
          onClose={() => setIsPopupOpen(false)} 
          onVerify={handleVerifyCode} 
        />

        <p className='text-center text-gray-600 mt-5'>
          ¿Ya tienes cuenta? <Link to='/login' className='text-green-500 hover:underline'>Iniciar sesión</Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
