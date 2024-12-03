import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import SummaryApi from "../common";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Revisa tu correo para restablecer la contraseña');
        navigate(`/reset-password?email=${email}`); // Redirige a la página de restablecer contraseña
      } else {
        toast.error(data.message || 'Error al enviar el correo');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Hubo un problema al enviar el correo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="forgot-password" className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className="bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg" style={{ margin: '1%', opacity: '0.9' }}>
        <h2 className="text-3xl text-center font-bold  mb-6">Restablecer contraseña</h2>
        <p className="text-center text-gray-600 mb-4">
          Se enviará un código de verificación a tu correo para restablecer la contraseña.
        </p>
        <form className="pt-6" onSubmit={handleSubmit}>
          <div className="grid mb-4">
            <label className="text-gray-600">Correo:</label>
            <div className="bg-slate-100 p-2 rounded-lg">
              <input
                type="email"
                placeholder="Escribe tu correo"
                value={email}
                onChange={handleChange}
                required
                className="w-full h-full outline-none bg-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 w-full rounded-full hover:bg-green-700 transition-all mt-4"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar correo'}
          </button>
        </form>
        <button
          onClick={() => navigate('/login')}
          className="text-center text-green-600 underline mt-4"
        >
          Volver al inicio de sesión
        </button>
      </div>
    </section>
  );
};

export default ForgotPassword;
