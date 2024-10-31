import React, { useState } from 'react';

function FormularioPQRS() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    tipoSolicitud: '',
    descripcion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //logica para manejar el guardado de los datos y posteriormente comunicación por whatsapp
    alert('Formulario enviado');
    setFormData({ nombre: '', correo: '', tipoSolicitud: '', descripcion: '' });
  };

  return (
    <div className="p-10 bg-white bg-opacity-90 shadow-2xl rounded-lg max-w-2xl w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Formulario de PQRS</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          className="w-full px-4 py-2 border rounded"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          className="w-full px-4 py-2 border rounded"
          value={formData.correo}
          onChange={handleChange}
          required
        />
        <select
          name="tipoSolicitud"
          className="w-full px-4 py-2 border rounded"
          value={formData.tipoSolicitud}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione tipo de solicitud</option>
          <option value="peticion">Petición</option>
          <option value="queja">Queja</option>
          <option value="reclamo">Reclamo</option>
          <option value="sugerencia">Sugerencia</option>
        </select>
        <textarea
          name="descripcion"
          placeholder="Descripción"
          className="w-full px-4 py-2 border rounded"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="px-6 py-2 w-full text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200 text-lg"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default FormularioPQRS;