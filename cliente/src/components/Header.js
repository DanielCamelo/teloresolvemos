import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    FaBars, FaTimes, FaEnvelope, FaCar, FaPlane, FaHospital, 
    FaHome, FaShippingFast, FaMotorcycle, FaTruck, FaClock, 
    FaUser,
    FaUserShield,
    FaCogs
} from 'react-icons/fa';
import logo from '../assets/Logo PNG.png'; // Importa el logo

import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';


const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [joinOpen, setJoinOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false); // Estado para el menú "Nosotros"
    const [activeDropdown, setActiveDropdown] = useState(null); // Control de dropdown en pantallas pequeñas


    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url,{
            method : SummaryApi.logout_user.method,
            credentials : 'include'
        })


        const data = await fetchData.json()

        if(data.success){
            toast.success(data.message)
            dispatch(setUserDetails(null))
        }

        if(data.error){
            toast.error(data.message)
        }

    }



    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleDropdown = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    const closeMenu = () => {
        setMenuOpen(false);
        setActiveDropdown(null);
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
                <div className="lg:hidden w-full flex justify-end items-center py-4 px-4">
                    {!menuOpen && (
                         <button 
                            onClick={toggleMenu} 
                             className="text-white p-3 rounded-full hover:bg-gray-800 transition"
                        >
                             <FaBars size={32} />
                        </button>
                    )}
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
                                            to="Nosotros" 
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
                                        <FaCar />
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

{/* Botón Perfiles con menú desplegable */}
{user && (
    <div 
        className="relative group"
        onMouseEnter={() => setMenuDisplay(true)}
        onMouseLeave={() => setMenuDisplay(false)}
    >
        <button 
            className={`relative text-white text-lg hover:text-gray-400 transition 
                ${menuDisplay ? 'border-b-2 border-purple-500' : ''}`}
        >
            Perfiles
        </button>
        {menuDisplay && (
            <div className="dropdown-profile absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 w-48 z-20">
                <ul className="flex flex-col gap-2">
                    {user?.role?.includes('cliente') && (
                        <li className="flex items-center gap-2">
                            <FaUser />
                            <Link 
                                to="/perfil-cliente" 
                                className="text-gray-700 hover:text-gray-500 transition">
                                Cliente
                            </Link>
                        </li>
                    )}
                    {user?.role?.includes('administrador') && (
                        <li className="flex items-center gap-2">
                            <FaUserShield />
                            <Link 
                                to="/perfil-administrador" 
                                className="text-gray-700 hover:text-gray-500 transition">
                                Administrador
                            </Link>
                        </li>
                    )}
                    {user?.role?.includes('conductor') && (
                        <li className="flex items-center gap-2">
                            <FaCar />
                            <Link 
                                to="/perfil-chofer" 
                                className="text-gray-700 hover:text-gray-500 transition">
                                Transportador
                            </Link>
                        </li>
                    )}
                    {user?.role?.includes('domiciliario') && (
                        <li className="flex items-center gap-2">
                            <FaMotorcycle />
                            <Link 
                                to="/perfil-domiciliario" 
                                className="text-gray-700 hover:text-gray-500 transition">
                                Domiciliario
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        )}
    </div>
)}


                    

{/* Botón inicio de sesion */}
                    <div>
    {
        user?._id ? (
            <button 
                onClick={handleLogout} 
                className="bg-secondary text-white px-4 py-2 rounded-full hover:bg-secondary-light transition">
                Cerrar
            </button>
        ) : (
            <Link 
                to="/login" 
                className="bg-secondary text-white px-4 py-2 rounded-full hover:bg-secondary-light transition">
                Iniciar sesión
            </Link>
        )
    }
</div>

                </nav>

{/* Menú para pantallas pequeñas */}
{menuOpen && (
     <div className="absolute top-0 right-0 max-w-[75%] h-full bg-gray-900 bg-opacity-90 text-white z-50 flex flex-col shadow-lg">
        <button 
            onClick={toggleMenu} 
            className="text-white p-3 rounded-full hover:bg-gray-800 transition self-end m-4"
        >
            <FaTimes size={32} />
        </button>
        <nav className="flex flex-col items-start gap-6 px-8 mt-10">
            {/* Opciones para pantallas pequeñas */}
            {/* Botón inicio de sesión */}
            <div>
                {
                    user?._id ? (
                        <button 
                            onClick={handleLogout} 
                            className="bg-secondary text-white px-4 py-2 rounded-full hover:bg-secondary-light transition">
                            Cerrar
                        </button>
                    ) : (
                        <Link 
                            to="/login" 
                            className="bg-secondary text-white px-4 py-2 rounded-full hover:bg-secondary-light transition">
                            Iniciar sesión
                        </Link>
                    )
                }
            </div>

            {/* Menú Perfiles */}
            {user && (
                <div>
                    <button
                        onClick={() => toggleDropdown('perfiles')}
                        className="text-lg font-bold hover:text-gray-400 transition"
                    >
                        Perfiles
                    </button>
                    {activeDropdown === 'perfiles' && (
                        <div className="ml-4 mt-2">
                            {user?.role?.includes('cliente') && (
                                <Link 
                                    to="/perfil-cliente" 
                                    onClick={closeMenu} 
                                    className="text-base hover:text-gray-400 block"
                                >
                                    <FaUser className="inline-block mr-2" /> Cliente
                                </Link>
                            )}
                            {user?.role?.includes('administrador') && (
                                <Link 
                                    to="/perfil-administrador" 
                                    onClick={closeMenu} 
                                    className="text-base hover:text-gray-400 block"
                                >
                                    <FaCogs className="inline-block mr-2" /> Administrador
                                </Link>
                            )}
                            {user?.role?.includes('conductor') && (
                                <Link 
                                    to="/perfil-chofer" 
                                    onClick={closeMenu} 
                                    className="text-base hover:text-gray-400 block"
                                >
                                    <FaCar className="inline-block mr-2" /> Transportador
                                </Link>
                            )}
                            {user?.role?.includes('domiciliario') && (
                                <Link 
                                    to="/perfil-domiciliario" 
                                    onClick={closeMenu} 
                                    className="text-base hover:text-gray-400 block"
                                >
                                    <FaMotorcycle className="inline-block mr-2" /> Domiciliario
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Menú Nosotros */}
            <div>
                <button
                    onClick={() => toggleDropdown('nosotros')}
                    className="text-lg font-bold hover:text-gray-400 transition"
                >
                    Nosotros
                </button>
                {activeDropdown === 'nosotros' && (
                    <div className="ml-4 mt-2">
                        <Link 
                            to="/quienes-somos" 
                            onClick={closeMenu} 
                            className="text-base hover:text-gray-400 block"
                        >
                            <FaClock className="inline-block mr-2" /> ¿Quiénes somos?
                        </Link>
                    </div>
                )}
            </div>

            {/* Menú Únete */}
            <div>
                <button
                    onClick={() => toggleDropdown('unete')}
                    className="text-lg font-bold hover:text-gray-400 transition"
                >
                    Únete
                </button>
                {activeDropdown === 'unete' && (
                    <div className="ml-4 mt-2">
                        <Link 
                            to="/unete-domiciliario" 
                            onClick={closeMenu} 
                            className="text-base hover:text-gray-400 block"
                        >
                            <FaMotorcycle className="inline-block mr-2" /> Domiciliario
                        </Link>
                        <Link 
                            to="/unete-transportador" 
                            onClick={closeMenu} 
                            className="text-base hover:text-gray-400 block"
                        >
                            <FaTruck className="inline-block mr-2" /> Transportador
                        </Link>
                    </div>
                )}
            </div>

            {/* Menú Servicios */}
            <div>
                <button
                    onClick={() => toggleDropdown('servicios')}
                    className="text-lg font-bold hover:text-gray-400 transition"
                >
                    Servicios
                </button>
                {activeDropdown === 'servicios' && (
                    <div className="ml-4 mt-2">
                        <Link 
                            to="/mensajeria" 
                            onClick={closeMenu} 
                            className="text-base hover:text-gray-400 block"
                        >
                            <FaEnvelope className="inline-block mr-2" /> Mensajería
                        </Link>
                        <Link 
                            to="/domicilios" 
                            onClick={closeMenu} 
                            className="text-base hover:text-gray-400 block"
                        >
                            <FaShippingFast className="inline-block mr-2" /> Domicilios
                        </Link>
                        <Link 
                            to="/transporte-particular" 
                            onClick={closeMenu} 
                            className="text-base hover:text-gray-400 block"
                        >
                            <FaCar className="inline-block mr-2" /> Transporte Particular
                        </Link>
                        <Link 
                            to="/transporte-salud" 
                            onClick={closeMenu} 
                            className="text-base hover:text-gray-400 block"
                        >
                            <FaHospital className="inline-block mr-2" /> Transporte Salud
                        </Link>
                        <Link 
                            to="/traslado-aeropuertos" 
                            onClick={closeMenu} 
                            className="text-base hover:text-gray-400 block"
                        >
                            <FaPlane className="inline-block mr-2" /> Traslado Aeropuertos
                        </Link>
                        <Link 
                            to="/diligencias" 
                            onClick={closeMenu} 
                            className="text-base hover:text-gray-400 block"
                        >
                            <FaHome className="inline-block mr-2" /> Diligencias
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    </div>
)}


            </div>
        </header>
    );
};

export default Header;
