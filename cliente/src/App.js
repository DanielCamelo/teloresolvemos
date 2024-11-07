import React, { useEffect } from 'react';
import fondoMovil from './assets/fondoMovil.png';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import { Outlet } from 'react-router-dom';
import Context from './context/index.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from './common';
import { setUserDetails } from './store/userSlice.js';
import { FaWhatsapp, FaHeadset } from 'react-icons/fa';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

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

  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer className="rounded-full" position="top-right" />

        <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${fondoMovil})` }}>
          <Header />

          <main className="flex flex-col justify-between min-h-full">
            <Outlet />
          </main>
          <Footer />

          {/* Icono de WhatsApp flotante */}
          <div className="floating-button-container fixed bottom-4 right-4">
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
          <div className="floating-button-container fixed bottom-4 left-4">
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
