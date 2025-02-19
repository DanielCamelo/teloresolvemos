import React, { useState } from 'react'
import ROLE from '../common/role';
import STATUS from '../common/status';
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    phone,
    role,
    status,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRole] = useState(role);
    const [userStatus, setUserStatus] = useState(status);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
        console.log('Rol seleccionado:', e.target.value);
    }

    const handleOnChangeSelectt = (e) => {
        setUserStatus(e.target.value);
        console.log('Estado seleccionado:', e.target.value);
    }

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole,       // Verifica que este valor sea el correcto
                status: userStatus    // Verifica que este valor también sea el correcto
            })
        });
    
        const responseData = await fetchResponse.json();
    
        if (responseData.success) {
            toast.success(responseData.message);
            onClose();
            callFunc(); // Llama a la función para actualizar la lista de usuarios o la vista
        } else {
            toast.error(responseData.message || 'Error al actualizar el usuario');
        }
    
        console.log("role updated", responseData);
    };
    

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose />
                </button>

                <h1 className='pb-4 text-lg font-medium'>Cambiar el rol y estado del usuario</h1>

                <p>Nombre: {name}</p>
                <p>Telefono: {phone}</p>

                <div className='flex items-center justify-between my-4'>
                    <p>Rol:</p>
                    <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='flex items-center justify-between my-4'>
                    <p>Estado:</p>
                    <select className='border px-4 py-1' value={userStatus} onChange={handleOnChangeSelectt}>
                        {
                            Object.values(STATUS).map(el => {
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-900 text-white hover:bg-red-800' onClick={updateUserRole}>
                    Cambiar
                </button>
            </div>
        </div>
    )
}

export default ChangeUserRole;

