import React, { useState } from 'react';
import { IoEyeSharp, IoEyeOff } from "react-icons/io5";

const VerificationCodePopup = ({ isOpen, onClose, onVerify }) => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    if (verificationCode) {
      onVerify(verificationCode);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-5 w-full max-w-sm rounded-lg shadow-lg">
          <h2 className="text-center font-bold text-xl mb-4">Código de Verificación</h2>
          
          {/* Mensaje recordatorio del código de verificación */}
          <p className="text-center text-gray-600 mb-4">
            Recuerda revisar tu correo para el código de verificación.
          </p>

          <form onSubmit={handleVerify}>
            <div className='grid mb-4'>
              <label className="text-gray-600">Introduce el código:</label>
              <div className='bg-gray-100 p-3 rounded-lg'>
                <input
                  type='text'
                  placeholder='Código de verificación'
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  className='w-full bg-transparent outline-none'
                />
              </div>
            </div>
            <button type='submit' className='bg-red-500 text-white py-2 w-full rounded-full hover:bg-red-600 transition-all'>
              Verificar
            </button>
          </form>
          <button className="text-gray-500 mt-4" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    )
  );
};

export default VerificationCodePopup;
