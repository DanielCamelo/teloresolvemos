import React, { useState } from 'react';
import { IoEyeSharp, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from "../common";
import { toast } from 'react-toastify';
import axios from 'axios';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    phone: '',
    verificationCode: '',
  });

  const [isCodeSent, setIsCodeSent] = useState(false);
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
    if (!data.name || !data.email || !data.password || !data.phone || (isCodeSent && !data.verificationCode)) {
      toast.error("Por favor, complete todos los campos requeridos");
      return;
    }

    // Validar el formato del correo electrónico
    if (!data.email.includes('@')) {
      toast.error("Por favor, introduce un correo electrónico válido.");
      return;
    }

    if (isCodeSent) {
      // Verificar el código de verificación
      try {
        const response = await fetch(SummaryApi.verifyCode.url, {
          method: SummaryApi.verifyCode.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email, verificationCode: data.verificationCode, name: data.name, phone: data.phone, password: data.password }),
        });

        const result = await response.json();

        if (response.ok) {
          const { password, name, phone } = data;
          const newUserData = { name, email: data.email, password, phone };

          // Registrar el nuevo usuario
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
      }
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

  return (
    <section id='sign-up' className="flex items-center justify-center min-h-screen mx-auto">
      <div className='bg-white p-2 py-5 w-full max-w-md mx-auto rounded-3xl border-2 border-green-600' style={{ marginTop: '-50%', opacity: '0.8' }}>
        <form className='' onSubmit={handleSubmit}>
          <div className='grid'>
            <label>Nombre :</label>
            <div className='bg-slate-100 p-2'>
              <input
                type='text'
                placeholder='Escribe tu nombre'
                name='name'
                value={data.name}
                onChange={handleChange}
                required
                className='w-full h-full outline-none bg-transparent'
              />
            </div>
          </div>

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

          <div className='grid'>
            <label>Teléfono :</label>
            <div className='bg-slate-100 p-2'>
              <input
                type='tel'
                placeholder='Escribe tu teléfono'
                name='phone'
                value={data.phone}
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
          </div>

          <div>
            <label>Confirmar Contraseña :</label>
            <div className='bg-slate-100 p-2 flex'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Confirma tu contraseña'
                value={data.confirmPassword}
                name='confirmPassword'
                onChange={handleChange}
                required
                className='w-full h-full outline-none bg-transparent'
              />
              <div className='cursor-pointer text-green-600'>
                <span>
                  {showConfirmPassword ? (
                    <IoEyeSharp onClick={() => setShowConfirmPassword(false)} />
                  ) : (
                    <IoEyeOff onClick={() => setShowConfirmPassword(true)} />
                  )}
                </span>
              </div>
            </div>
          </div>

          {isCodeSent && (
            <div>
              <label>Código de Verificación :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='text'
                  placeholder='Introduce el código'
                  name='verificationCode'
                  value={data.verificationCode}
                  onChange={handleChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>
          )}

          <div className='flex justify-between mt-4'>
            <p>¿Ya tienes cuenta? <Link to='/login' className='text-green-500'>Iniciar sesión</Link></p>
            <button type='submit' className='bg-green-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto'>
              {isCodeSent ? 'Verificar Código' : 'Enviar Código'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
