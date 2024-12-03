import React, { useEffect, useState } from 'react';
import SummaryApi from "../common"; // Asegúrate de que este sea el path correcto
import { toast } from 'react-toastify';
import { MdModeEdit, MdDelete } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole'; // Asegúrate de que este componente exista

const VerUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [openEditarRol, setOpenEditarRol] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
        email: "",
        name: "",
        role: [],
        status: "",
        _id: ""
    });

    // Función para obtener usuarios
    const fetchUsuarios = async () => {
        try {
            const response = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                setUsuarios(data.data);
                setUsuariosFiltrados(data.data); // Inicializar los usuarios filtrados
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            toast.error("Error al obtener la lista de usuarios.");
        }
    };

    // Función para eliminar un usuario
    const eliminarUsuario = async (idUsuario) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmar) {
            try {
                const response = await fetch(SummaryApi.deleteUser.url, {
                    method: SummaryApi.deleteUser.method,
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ _id: idUsuario })
                });
                const data = await response.json();
                if (data.success) {
                    toast.success("Usuario eliminado exitosamente.");
                    fetchUsuarios(); // Actualizar la lista
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                toast.error("Error al eliminar el usuario.");
            }
        }
    };

    // Función para manejar el cambio en el campo de búsqueda
    const handleBusquedaChange = (event) => {
        const term = event.target.value;
        setBusqueda(term);

        // Filtrar los usuarios por nombre o correo
        const usuariosFiltrados = usuarios.filter(
            (usuario) =>
                usuario.name.toLowerCase().includes(term.toLowerCase()) ||
                usuario.email.toLowerCase().includes(term.toLowerCase())
        );
        setUsuariosFiltrados(usuariosFiltrados);
    };

    // Llamar a la función fetchUsuarios al montar el componente
    useEffect(() => {
        fetchUsuarios();
    }, []);

    // Función para dividir roles en pares
    const dividirRolesEnPares = (roles) => {
        let pares = [];
        for (let i = 0; i < roles.length; i += 2) {
            pares.push(roles.slice(i, i + 2));
        }
        return pares;
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">Gestión de Usuarios</h1>

            {/* Campo de búsqueda */}
            <div className="mb-4">
                <input
                    type="text"
                    value={busqueda}
                    onChange={handleBusquedaChange}
                    placeholder="Buscar por nombre o correo..."
                    className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
                />
            </div>

            {/* Mostrar mensaje cuando no se encuentren resultados */}
            {usuariosFiltrados.length === 0 && busqueda && (
                <p className="text-center text-gray-500 mt-4">No se encontró ningún usuario con la búsqueda "{busqueda}".</p>
            )}

            {/* Contenedor de tarjetas en dispositivos pequeños */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {usuariosFiltrados.map((usuario) => (
                    <div
                        key={usuario._id}
                        className="border border-gray-300 rounded-lg p-4 hover:bg-gray-100 shadow-lg transition"
                    >
                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold text-gray-800">{usuario.name}</h2>
                            <div className="flex space-x-2">
                                <button
                                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                                    onClick={() => {
                                        setUsuarioSeleccionado(usuario);
                                        setOpenEditarRol(true);
                                    }}
                                >
                                    <MdModeEdit size={20} />
                                </button>
                                <button
                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                    onClick={() => eliminarUsuario(usuario._id)}
                                >
                                    <MdDelete size={20} />
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-600 mt-2">Correo: {usuario.email}</p>

                        {/* Mostrar roles en pares */}
                        <div className="text-gray-600">
                            {dividirRolesEnPares(usuario.role).map((par, index) => (
                                <div key={index} className="flex gap-2">
                                    {par.map((rol, idx) => (
                                        <span key={idx} className="badge bg-gray-200 px-2 py-1 rounded-md">{rol}</span>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <p className="text-gray-600">Estado: {usuario.status}</p>
                    </div>
                ))}
            </div>

            {/* Modal para cambiar el rol del usuario */}
            {openEditarRol && (
                <ChangeUserRole
                    onClose={() => setOpenEditarRol(false)}
                    name={usuarioSeleccionado.name}
                    email={usuarioSeleccionado.email}
                    role={usuarioSeleccionado.role}
                    userId={usuarioSeleccionado._id}
                    status={usuarioSeleccionado.status}
                    callFunc={fetchUsuarios} // Llamamos de nuevo a fetchUsuarios para obtener la lista actualizada
                />
            )}
        </div>
    );
};

export default VerUsuarios;




