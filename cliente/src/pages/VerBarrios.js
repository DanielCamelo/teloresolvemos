import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import { MdModeEdit, MdDelete } from "react-icons/md";

const zonas = ['norte', 'sur', 'centro', 'occidente', 'oriente', 'fuera'];

const VerBarrios = () => {
  const [barrios, setBarrios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [form, setForm] = useState({
    _id: '',
    nombreBarrio: '',
    zona: '',
    precioSur: '',
    precioNorte: '',
    precioCentro: '',
    precioOccidente: '',
    precioOriente: '',
  });
  const [editando, setEditando] = useState(false);
  const [filtro, setFiltro] = useState('');

  const fetchBarrios = async () => {
    try {
      const response = await fetch(SummaryApi.allBarrios.url, {
        method: SummaryApi.allBarrios.method,
        credentials: 'include',
      });
      const data = await response.json();
      setBarrios(data || []);
    } catch (err) {
      toast.error('Error al cargar barrios');
    }
  };


  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api = editando ? SummaryApi.updateBarrios : SummaryApi.uploadBarrios;

    try {
      const response = await fetch(api.url, {
        method: api.method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setForm({
          _id: '',
          nombreBarrio: '',
          zona: '',
          precioSur: '',
          precioNorte: '',
          precioCentro: '',
          precioOccidente: '',
          precioOriente: '',
        });
        setEditando(false);
        fetchBarrios();
        setMostrarFormulario(false);
      } else {
        fetchBarrios();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error('Error al guardar barrio');
    }
  };

  const handleDelete = async (_id) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este barrio?');
    if (!confirmar) return;

    try {
      const response = await fetch(SummaryApi.deleteBarrios.url, {
        method: SummaryApi.deleteBarrios.method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Barrio eliminado exitosamente');
        fetchBarrios();
      } else {
        fetchBarrios();
        toast.success(data.message);
      }
    } catch (err) {
      toast.error('Error al eliminar el barrio');
    }
  };

  const handleEdit = (barrio) => {
    setForm({ ...barrio });
    setEditando(true);
    setMostrarFormulario(true);
  };

  const barriosFiltrados = barrios.filter((barrio) => {
    const query = filtro.toLowerCase();
    return (
      barrio.nombreBarrio.toLowerCase().includes(query) ||
      barrio.zona.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    fetchBarrios();

  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-center w-full md:w-auto">{editando ? 'Editar Barrio' : 'Registrar Barrio'}</h2>
          {!mostrarFormulario && (
            <button
              onClick={() => {
                setForm({
                  _id: '',
                  nombreBarrio: '',
                  zona: '',
                  precioSur: '',
                  precioNorte: '',
                  precioCentro: '',
                  precioOccidente: '',
                  precioOriente: '',
                });
                setEditando(false);
                setMostrarFormulario(true);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full md:w-auto"
            >
              + Registrar Barrio
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 mb-4 bg-white rounded border px-2 py-1">
          <FaSearch className="text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre o zona"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full outline-none py-1"
          />
        </div>

        {mostrarFormulario && (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-100 p-4 rounded-lg mb-6">
            <input name="nombreBarrio" placeholder="Nombre del Barrio" value={form.nombreBarrio} onChange={handleChange} required className="p-2 border rounded" />
            <select name="zona" value={form.zona} onChange={handleChange} required className="p-2 border rounded">
              <option value="">Seleccionar Zona</option>
              {zonas.map((zona) => (
                <option key={zona} value={zona}>
                  {zona.charAt(0).toUpperCase() + zona.slice(1)}
                </option>
              ))}
            </select>

            {['precioSur', 'precioNorte', 'precioCentro', 'precioOccidente', 'precioOriente'].map((campo) => (
              <input
                key={campo}
                name={campo}
                placeholder={campo}
                value={form[campo]}
                onChange={handleChange}
                required
                className="p-2 border rounded"
                type="number"
              />
            ))}

            <div className="col-span-1 sm:col-span-2 md:col-span-3 flex gap-4">
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                {editando ? 'Actualizar Barrio' : 'Registrar Barrio'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMostrarFormulario(false);
                  setEditando(false);
                }}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <h2 className="text-xl font-semibold mb-2">Lista de Barrios</h2>
        <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm border border-black">
  <thead className="bg-green-600 text-white">
    <tr>
      <th className="p-2 border border-black text-center">Barrio</th>
      <th className="p-2 border border-black text-center">Zona</th>
      <th className="p-2 border border-black text-center">Sur</th>
      <th className="p-2 border border-black text-center">Norte</th>
      <th className="p-2 border border-black text-center">Centro</th>
      <th className="p-2 border border-black text-center">Occidente</th>
      <th className="p-2 border border-black text-center">Oriente</th>
      <th className="p-2 border border-black text-center">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {barriosFiltrados.length > 0 ? (
      barriosFiltrados.map((barrio) => (
        <tr key={barrio._id} className="border border-black">
          <td className="p-2 border border-black text-center">{barrio.nombreBarrio}</td>
          <td className="p-2 border border-black capitalize text-center">{barrio.zona}</td>
          <td className="p-2 border border-black text-center">{barrio.precioSur}</td>
          <td className="p-2 border border-black text-center">{barrio.precioNorte}</td>
          <td className="p-2 border border-black text-center">{barrio.precioCentro}</td>
          <td className="p-2 border border-black text-center">{barrio.precioOccidente}</td>
          <td className="p-2 border border-black text-center">{barrio.precioOriente}</td>
          <td className="p-2 border border-black text-center space-x-2">
            <button
              onClick={() => handleEdit(barrio)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition duration-200"
              title="Editar"
            >
              <MdModeEdit size={18} />
            </button>
            <button
              onClick={() => handleDelete(barrio._id)}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition duration-200"
              title="Eliminar"
            >
              <MdDelete size={18} />
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="8" className="text-center py-4 text-gray-500 border border-black">
          No hay barrios registrados.
        </td>
      </tr>
    )}
  </tbody>
</table>

        </div>
      </div>
    </div>
  );
};

export default VerBarrios;


