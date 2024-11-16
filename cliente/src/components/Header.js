import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaEnvelope, FaCar, FaPlane, FaHospital, FaHome, FaShippingFast } from 'react-icons/fa';
import logo from '../assets/Logo PNG.png'; // Importa el logo

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false); // Estado para el menú de servicios

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleServicesClick = () => {
        // Cambia el estado de "Servicios" al hacer clic
        setServicesOpen(!servicesOpen);
    };

    return (
        <header className="shadow-md bg-neutral-dark">
            <div className="container mx-auto flex items-center justify-between px-4 h-24">
                {/* Logo visible solo en pantallas grandes */}
                <div className="hidden lg:block">
                    <Link to="/">
                        <img 
                            src={logo} 
                            alt="Logo" 
                            className="h-40 w-auto"
                        />
                    </Link>
                </div>

                {/* Botón menú hamburguesa para pantallas pequeñas */}
                <div className="flex lg:hidden w-full justify-end">
                    <button 
                        onClick={toggleMenu} 
                        className="text-white p-2 rounded-full hover:bg-gray-800 transition">
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Menú para pantallas grandes */}
                <nav className="hidden lg:flex items-center gap-10">
                    <Link 
                        to="/nosotros" 
                        className="relative text-white text-lg hover:text-gray-400 transition hover:border-b-2 hover:border-primary">
                        Nosotros
                    </Link>
                    <Link 
                        to="/unete" 
                        className="relative text-white text-lg hover:text-gray-400 transition hover:border-b-2 hover:border-primary">
                        Únete
                    </Link>

                    {/* Enlace Servicios con menú desplegable */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setServicesOpen(true)} // Mostrar al pasar el ratón
                        onMouseLeave={() => {if (!servicesOpen) setServicesOpen(false)}} // Ocultar al sacar el ratón solo si el menú no está abierto
                    >
                        <button 
                            onClick={handleServicesClick} // Cambiar el estado al hacer clic
                            className={`relative text-white text-lg hover:text-gray-400 transition 
                                ${servicesOpen ? 'border-b-2 border-red-500' : ''}`} // Barra roja si el menú está abierto
                        >
                            Servicios
                        </button>
                        {/* Menú desplegable de servicios */}
                        {servicesOpen && (
                            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 w-48 z-20">
                                <ul className="flex flex-col gap-2">
                                    <li className="flex items-center gap-2">
                                        <FaEnvelope /> {/* Icono para Mensajería */}
                                        <Link 
                                            to="/mensajeria" 
                                            className="text-gray-700 hover:text-gray-500 transition">
                                            Mensajería
                                        </Link>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaShippingFast /> {/* Icono para Domicilios */}
                                        <Link 
                                            to="/domicilios" 
                                            className="text-gray-700 hover:text-gray-500 transition">
                                            Domicilios
                                        </Link>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaCar /> {/* Icono para Transporte Particular */}
                                        <Link 
                                            to="/transporte-particular" 
                                            className="text-gray-700 hover:text-gray-500 transition">
                                            Transporte Particular
                                        </Link>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaHospital /> {/* Icono para Transporte Salud */}
                                        <Link 
                                            to="/transporte-salud" 
                                            className="text-gray-700 hover:text-gray-500 transition">
                                            Transporte Salud
                                        </Link>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaPlane /> {/* Icono para Traslado Aeropuertos */}
                                        <Link 
                                            to="/traslado-aeropuertos" 
                                            className="text-gray-700 hover:text-gray-500 transition">
                                            Traslado Aeropuertos
                                        </Link>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaHome /> {/* Icono para Diligencias */}
                                        <Link 
                                            to="/diligencias" 
                                            className="text-gray-700 hover:text-gray-500 transition">
                                            Diligencias
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <Link 
                        to="/login" 
                        className="bg-secondary text-white px-4 py-2 rounded-full hover:bg-secondary-light transition">
                        Iniciar sesión
                    </Link>
                </nav>

                {/* Menú desplegable en pantallas pequeñas */}
                {menuOpen && (
                    <div className="absolute top-24 right-4 bg-white shadow-lg rounded-lg p-4 w-48">
                        <nav className="flex flex-col gap-4">
                            <Link 
                                to="/nosotros" 
                                className="text-gray-700 text-lg hover:text-gray-500 transition hover:border-b-2 hover:border-primary">
                                Nosotros
                            </Link>
                            <Link 
                                to="/unete" 
                                className="text-gray-700 text-lg hover:text-gray-500 transition hover:border-b-2 hover:border-primary">
                                Únete
                            </Link>
                            <Link 
                                to="/servicios" 
                                className="text-gray-700 text-lg hover:text-gray-500 transition hover:border-b-2 hover:border-primary">
                                Servicios
                            </Link>
                            <Link 
                                to="/login" 
                                className="bg-secondary text-white px-4 py-2 rounded-full hover:bg-secondary-light transition">
                                Iniciar sesión
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
