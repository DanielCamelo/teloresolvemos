import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { FaBell, FaArrowLeft, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú
    const [workMenuOpen, setWorkMenuOpen] = useState(false); // Estado para controlar el submenú

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include'
        });

        const data = await fetchData.json();

        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
            setMenuOpen(false); // Cierra el menú al cerrar sesión
        }

        if (data.error) {
            toast.error(data.message);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Cambia la visibilidad del menú
    };

    const toggleWorkMenu = () => {
        setWorkMenuOpen(!workMenuOpen); // Cambia la visibilidad del submenú
    };

    return (
        <header className='h-16 shadow-md bg-green'> 
            <div className='h-full container mx-auto flex items-center justify-between px-4'>
                <button 
                    onClick={handleGoBack} 
                    className='bg-slate-50 text-green p-2 rounded-full hover:bg-slate-200'>
                    <FaArrowLeft size={20} />
                </button>

                <div className='flex items-center gap-7'>
                    {user?._id && (
                        <>
                            <button 
                                onClick={toggleMenu} 
                                className='bg-slate-50 text-green p-2 rounded-full hover:bg-slate-200'>
                                {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                            </button>

                            {menuOpen && (
                                <div className='absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4'>
                                    <div className='flex flex-col'>
                                        
                                        <button 
                                            onClick={handleLogout} 
                                            className='mt-2 bg-slate-50 text-green px-3 py-1 rounded-full hover:bg-slate-200'>
                                            Cerrar sesión
                                        </button>
                                        
                                        {/* Menú "Trabaja con nosotros" */}
                                        <div className='mt-4'>
                                            <button 
                                                onClick={toggleWorkMenu} 
                                                className='font-bold text-left w-full hover:bg-slate-200'>
                                                Trabaja con nosotros
                                            </button>
                                            {workMenuOpen && (
                                                <div className='pl-4'>
                                                    <Link 
                                                        to="/registrate-repartidor" 
                                                        className='mt-2 bg-slate-50 text-green px-3 py-1 rounded-full hover:bg-slate-200 block'>
                                                        Regístrate como repartidor
                                                    </Link>
                                                    <Link 
                                                        to="/registrate-chofer" 
                                                        className='mt-2 bg-slate-50 text-green px-3 py-1 rounded-full hover:bg-slate-200 block'>
                                                        Regístrate como chofer
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {!user?._id && (
                        <Link 
                            to={"/login"} 
                            className='bg-slate-50 text-green px-3 py-1 rounded-full hover:bg-slate-200'>
                            Iniciar sesión
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
