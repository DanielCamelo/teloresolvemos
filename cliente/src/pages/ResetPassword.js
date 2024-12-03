import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IoEyeSharp, IoEyeOff } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromUrl = queryParams.get('email');
    if (emailFromUrl) {
      setFormData((prevData) => ({ ...prevData, email: emailFromUrl }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(SummaryApi.resetPassword.url, {
        method: SummaryApi.resetPassword.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Contraseña restablecida exitosamente');
        navigate('/login');
      } else {
        toast.error(data.message || 'Error al restablecer la contraseña');
      }
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      toast.error('Error al restablecer la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reset-password" className="flex items-center justify-center min-h-screen mx-auto">
      <div className="bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg" style={{ margin: '1%', opacity: '0.9' }}>
        <h2 className="text-3xl text-center font-bold  mb-6">Cambiar contraseña</h2>
        
        {/* Mensaje de aviso */}
        <p className="text-center text-gray-600 mb-4">
          Esta será su nueva contraseña. Asegúrese de recordarla.
        </p>
        
        <form className='' onSubmit={handleSubmit}>
          <div className='grid mb-4'>
            <label className="text-gray-600">Correo electrónico:</label>
            <div className='bg-slate-100 p-2 rounded-lg'>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly
                className='w-full h-full outline-none bg-transparent'
              />
            </div>
          </div>

          <div className='grid mb-4'>
            <label className="text-gray-600">Código de Verificación:</label>
            <div className='bg-slate-100 p-2 rounded-lg'>
              <input
                type="text"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                required
                className='w-full h-full outline-none bg-transparent'
              />
            </div>
          </div>

          <div className='grid mb-4'>
            <label className="text-gray-600">Nueva Contraseña:</label>
            <div className='bg-slate-100 p-2 flex rounded-lg'>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className='w-full h-full outline-none bg-transparent'
              />
              <div className='cursor-pointer text-green-600' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeSharp /> : <IoEyeOff />}
              </div>
            </div>
          </div>

          <div className='grid mb-4'>
            <label className="text-gray-600">Confirmar Nueva Contraseña:</label>
            <div className='bg-slate-100 p-2 flex rounded-lg'>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                required
                className='w-full h-full outline-none bg-transparent'
              />
              <div className='cursor-pointer  text-gray-500' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeSharp /> : <IoEyeOff />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className='bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all mx-auto block mt-6'
            disabled={loading}
          >
            {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
          </button>
        </form>

        {/* Botón para regresar al login */}
        <button
          onClick={() => navigate('/login')}
          className='text-green-600 hover:underline mt-4'
        >
          Regresar al Login
        </button>
      </div>
    </section>
  );
};

export default ResetPassword;
