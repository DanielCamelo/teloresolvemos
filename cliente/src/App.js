import React, { useEffect, useState } from 'react';
import fondoMovil from './assets/fondoMovil.jpg';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import { Outlet } from 'react-router-dom';
import Context from './context/index.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from './common';
import { setUserDetails } from './store/userSlice.js';
import { FaWhatsapp, FaHeadset, FaBell } from 'react-icons/fa';
import Notificaciones from './components/Notificaciones.js';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  // Estado para mostrar/ocultar las notificaciones
  const [showNotifications, setShowNotifications] = useState(false);
  // Lista de notificaciones
  const [notifications, setNotifications] = useState([
    "Nueva actualización disponible",
    "Mensaje de soporte recibido",
    "Oferta especial en servicios",
  ]);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }

    console.log(dataResponse);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer className="rounded-full" position="top-right" />

        <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${fondoMovil})` }}>

          <Header />

          {/* Mostrar el botón de notificaciones solo si el usuario está registrado */}
          {user && (
            <div className="fixed top-4 left-4">
              <button
                className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition flex items-center justify-center"
                onClick={handleNotificationClick}
              >
                <FaBell size={45} />
              </button>

              {/* Mostrar las notificaciones si showNotifications es true */}
              {showNotifications && (
                <div className="absolute mt-2">
                  <Notificaciones notifications={notifications} />
                </div>
              )}
            </div>
          )}

          <main className="flex flex-col justify-between min-h-full">
            <Outlet />
          </main>
          <Footer />

          {/* Icono de WhatsApp flotante */}
          <div className="floating-button-container fixed bottom-12 right-4">
            <a
              href="https://wa.me/573167809782"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-icon bg-accent rounded-full p-3 shadow-lg flex items-center justify-center"
            >
              <FaWhatsapp size={55} color="white" />
            </a>
          </div>

          {/* Icono de PQRS flotante */}
          <div className="floating-button-container fixed bottom-12 left-4">
            <a
              href="/pqrs"
              className="pqrs-icon bg-secondary rounded-full p-3 shadow-lg flex items-center justify-center"
            >
              <FaHeadset size={55} color="white" />
            </a>
          </div>
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
