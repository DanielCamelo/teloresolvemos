import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaEnvelope, FaCar, FaPlane, FaHospital, FaHome, FaShippingFast, FaMotorcycle, FaTruck, FaClock } from 'react-icons/fa';
import logo from '../assets/Logo PNG.png'; // Importa el logo

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [joinOpen, setJoinOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false); // Estado para el menú "Nosotros"

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
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
                    {/* Botón Nosotros con menú desplegable */}
                    <div 
                        className="relative group"
                        onMouseEnter={() => setAboutOpen(true)}
                        onMouseLeave={() => setAboutOpen(false)}
                    >
                        <button 
                            className={`relative text-white text-lg hover:text-gray-400 transition 
                                ${aboutOpen ? 'border-b-2 border-green-500' : ''}`}
                        >
                            Nosotros
                        </button>
                        {aboutOpen && (
                            <div className="dropdown-about absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 w-48 z-20">
                                <ul className="flex flex-col gap-2">
                                    <li className="flex items-center gap-2">
                                        <FaClock />
                                        <Link 
                                            to="/quienes-somos" 
                                            className="text-gray-700 hover:text-gray-500 transition">
                                            ¿Quiénes somos?
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Botón Únete con menú desplegable */}
                    <div 
                        className="relative group"
                        onMouseEnter={() => setJoinOpen(true)}
                        onMouseLeave={() => setJoinOpen(false)}
                    >
                        <button 
                            className={`relative text-white text-lg hover:text-gray-400 transition 
                                ${joinOpen ? 'border-b-2 border-blue-500' : ''}`}
                        >
                            Únete
                        </button>
                        {joinOpen && (
                            <div className="dropdown-join absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 w-48 z-20">
                                <ul className="flex flex-col gap-2">
                                    <li className="flex items-center gap-2">
                                        <FaMotorcycle />
                                        <Link 
                                            to="/unete-domiciliario" 
                                            className="text-gray-700 hover:text-gray-500 transition">
                                            Domiciliario
                                        </Link>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaTruck />
                                        <Link 
                                            to="/unete-transportador" 
                                            className="text-gray-700 hover:text-gray-500 transition">
                                            Transportador
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Botón Servicios con menú desplegable */}
                    <div 
                        className="relative group"
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                    >
                        <button 
                            className={`relative text-white text-lg hover:text-gray-400 transition 
                                ${servicesOpen ? 'border-b-2 border-red-500' : ''}`}
                        >
                            Servicios
                        </button>
                        {servicesOpen && (
                            <div className="dropdown-services absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 w-48 z-20">
                                <ul className="flex flex-col gap-2">
                                    <li className="flex items-center gap-2">
                                        <FaEnvelope />
                                        <Link 
                                            to="/mensajeria" 
                                            className="text-gray-700 hover:text-gray-500 transition">
                                            Mensajería
                                        </Link>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaShippingFast />
                                        <Link 
                                            to="/domicilios" 
                                            className="text-gray-700 hover:text-gray-500 transition">
                                            Domicilios
                                        </Link>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaCar />
                                        <Link 
                                            to="/transporte-particular" 
                                            className="text-gray-700 hover:text-gray-500 transition">
                                            Transporte Particular
                                        </Link>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaHospital />
                                        <Link 
                                            to="/transporte-salud" 
                                            className="text-gray-700 hover:text-gray-500 transition">
                                            Transporte Salud
                                        </Link>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaPlane />
                                        <Link 
                                            to="/traslado-aeropuertos" 
                                            className="text-gray-700 hover:text-gray-500 transition">
                                            Traslado Aeropuertos
                                        </Link>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaHome />
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
            </div>
        </header>
    );
};

export default Header;
