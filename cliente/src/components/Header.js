import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { FaBell } from 'react-icons/fa';

// Componente Notificaciones integrado
const Notificaciones = ({ notifications }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-64">
      <h3 className="font-bold text-lg mb-2">Notificaciones</h3>
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index} className="text-gray-700 text-sm border-b border-gray-200 pb-2">
              {notification}
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-sm">No hay notificaciones</li>
        )}
      </ul>
    </div>
  );
};

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    "Nueva actualización disponible",
    "Mensaje de soporte recibido",
    "Oferta especial en servicios",
  ];

  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: 'include',
      });

      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error al cerrar sesión. Por favor, inténtelo de nuevo.");
      console.error("Logout Error:", error);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <header className="h-16 shadow-md bg-green">
      <div className="h-full container mx-auto flex items-center px-4 justify-between rounded-full">
        <div className="flex items-center gap-7">
          {user?._id ? (
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-slate-50 text-green px-3 py-1 rounded-full hover:bg-slate-200"
              >
                Cerrar
              </button>
              <p className="text-white">Bienvenido, {user?.name}</p>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-slate-50 text-green px-3 py-1 rounded-full hover:bg-slate-200"
            >
              Iniciar sesión
            </Link>
          )}
        </div>

        {/* Botón y lista de Notificaciones (solo visible para usuarios autenticados) */}
        {user?._id && (
          <div className="relative flex">
            <button
              onClick={handleNotificationClick}
              className="text-white p-4 rounded-full hover:bg-blue-500 transition flex items-center justify-center mt-4"
            >
              <FaBell size={34} />
            </button>
            {showNotifications && (
              <div className="absolute right-2 mt-20">
                <Notificaciones notifications={notifications} />
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
