import React, { useEffect } from 'react';
import fondoMovil from './assets/fondoMovil.png';
import Header from './components/Header';
import Footer from './components/Footer';
import { Link, Outlet } from 'react-router-dom';
import Context from './context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from './common';
import { setUserDetails } from './store/userSlice';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaHeadset } from 'react-icons/fa';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  // Función para obtener los detalles del usuario desde la API
  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include',
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Llamada inicial para obtener los detalles del usuario
  useEffect(() => {
    fetchUserDetails();
  }, [dispatch]);

  return (
    <Context.Provider value={{ fetchUserDetails }}>
      {/* Configuración de notificaciones */}
      <ToastContainer className="rounded-full" position="top-right" />

      <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${fondoMovil})` }}>
        {/* Encabezado */}
        <Header />

        {/* Contenido principal */}
        <main className="flex flex-col justify-between min-h-full">
          <Outlet />
        </main>

        {/* Pie de página */}
        <Footer />

        {/* Icono de WhatsApp flotante */}
        <div className="floating-button-container fixed bottom-4 right-4">
          <a
            href="https://wa.me/573025887156 "
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-icon bg-accent rounded-full p-3 shadow-lg flex items-center justify-center"
          >
            <FaWhatsapp size={55} color="white" />
          </a>
        </div>

        {/* Icono de PQRS flotante */}
        <div className="floating-button-container fixed bottom-4 left-4">
        <Link to="/pqrs"
  className="pqrs-icon bg-secondary rounded-full p-3 shadow-lg flex items-center justify-center"
>
  <FaHeadset size={55} color="white" />
</Link>
        </div>

        {/* Redes sociales flotantes al lado derecho */}
        <div className="social-icons fixed top-1/3 right-0 flex flex-col items-center space-y-2">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/teloresolvemosfacil?mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            className="social-tag bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded-l-full hover:bg-blue-700"
            title="Síguenos en Facebook"
          >
            <FaFacebook size={20} className="mr-2" />
            <span>Facebook</span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/te_lo_resolvemos/profilecard/?igsh=MTV1OW9uc3AwZGZ3eg=="
            target="_blank"
            rel="noopener noreferrer"
            className="social-tag bg-pink-500 text-white text-sm font-semibold py-1 px-3 rounded-l-full hover:bg-pink-600"
            title="Síguenos en Instagram"
          >
            <FaInstagram size={20} className="mr-2" />
            <span>Instagram</span>
          </a>

          {/* TikTok */}
          <a
            href="https://vm.tiktok.com/ZMhXXJpq6/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-tag bg-black text-white text-sm font-semibold py-1 px-3 rounded-l-full hover:bg-gray-800"
            title="Síguenos en TikTok"
          >
            <FaTiktok size={20} className="mr-2" />
            <span>TikTok</span>
          </a>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;