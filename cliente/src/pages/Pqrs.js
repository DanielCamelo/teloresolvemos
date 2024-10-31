import React, { useState } from 'react';
import FormularioPQRS from '../components/FormularioPQRS';

function Pqrs() {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div 
      className="flex items-center justify-center h-screen p-6 bg-cover bg-center bg-fixed" 
    >
      {!showForm ? (
        <div className="p-10 bg-white bg-opacity-90 shadow-2xl rounded-lg max-w-2xl w-full text-center">
          <h1 className="text-3xl font-bold mb-6">
            Peticiones, Quejas, Reclamos y Sugerencias (PQRS)
          </h1>
          <p className="mb-6 text-lg">Si tienes alguna solicitud o comentario, no dudes en hacérnoslo saber.</p>
          <button
            className="px-8 py-3 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200 text-lg"
            onClick={handleShowForm}
          >
            Crear una PQRS
          </button>
        </div>
      ) : (
        <FormularioPQRS />
      )}
    </div>
  );
}

export default Pqrs;