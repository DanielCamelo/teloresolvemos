import React, { useState } from 'react';
import ROLE from '../common/role';
import STATUS from '../common/status';
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    phone,
    role = [],  // Se asegura que role sea un array por defecto
    status,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRole] = useState(Array.isArray(role) ? role : []);
    const [userStatus, setUserStatus] = useState(status);

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        setUserRole(prevRoles => 
            prevRoles.includes(selectedRole) 
                ? prevRoles.filter(r => r !== selectedRole) // Remueve si ya existe
                : [...prevRoles, selectedRole] // Agrega si no existe
        );
    };

    const handleStatusChange = (e) => {
        setUserStatus(e.target.value);
    };

    const updateUserRole = async () => {
        try {
            const response = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    role: userRole,  // Ahora es un array
                    status: userStatus
                })
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                callFunc();
            } else {
                toast.error(responseData.message || 'Error al actualizar el usuario');
            }
        } catch (error) {
            console.error("Error actualizando usuario:", error);
            toast.error("Error en la actualización.");
        }
    };

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50'>
            <div className='bg-white shadow-md p-4 w-full max-w-sm rounded-lg'>
                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose />
                </button>

                <h1 className='pb-4 text-lg font-medium'>Cambiar rol y estado del usuario</h1>
                <p><strong>Nombre:</strong> {name}</p>
                <p><strong>Teléfono:</strong> {phone}</p>

                <div className='my-4'>
                    <p className='mb-2'>Rol:</p>
                    <div className='border px-4 py-1 w-full'>
                        {Object.values(ROLE).map(el => (
                            <label key={el} className="block cursor-pointer">
                                <input
                                    type="checkbox"
                                    value={el}
                                    checked={userRole.includes(el)}
                                    onChange={handleRoleChange}
                                    className="mr-2"
                                />
                                {el}
                            </label>
                        ))}
                    </div>
                    <div className='mt-2'>
                        <p className='text-sm'>Roles asignados: {userRole.join(", ") || "Ninguno"}</p>
                    </div>
                </div>

                <div className='my-4'>
                    <p className='mb-2'>Estado:</p>
                    <select className='border px-4 py-1 w-full' value={userStatus} onChange={handleStatusChange}>
                        {Object.values(STATUS).map(el => (
                            <option key={el} value={el}>{el}</option>
                        ))}
                    </select>
                </div>

                <button className='w-full py-2 mt-4 bg-red-900 text-white rounded-lg hover:bg-red-800' onClick={updateUserRole}>
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
};

export default ChangeUserRole;



